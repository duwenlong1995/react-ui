import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
// import { column as defaultColumns, ganttData as defaultData } from './data'
import GanttRow from './GanttRow'
import GanttBlock from './GanttBlock'
import GanttTimeBlock from './GanttTimeBlock'
import { useChoiceTimeArr, useTimeBlockStyle } from './hooks/useDate'
import { useGanttDrag } from './hooks/useDragAndDrop'
import type {
  GanttChartProps,
  GanttRow as GanttRowType,
  GanttTask,
  GanttStatusStyle,
} from './types'
import './index.css'

const DEFAULT_STATUS_MAP: Record<string, GanttStatusStyle> = {
  default: {
    background: 'rgba(37, 99, 235, 0.15)',
    borderColor: 'rgba(37, 99, 235, 0.35)',
    color: 'var(--text-color)',
  },
  '0': {
    background: 'rgba(34, 197, 94, 0.18)',
    borderColor: 'rgba(34, 197, 94, 0.35)',
    color: 'var(--text-color)',
  },
  '1': {
    background: 'rgba(37, 99, 235, 0.18)',
    borderColor: 'rgba(37, 99, 235, 0.4)',
    color: 'var(--text-color)',
  },
  '2': {
    background: 'rgba(249, 115, 22, 0.2)',
    borderColor: 'rgba(249, 115, 22, 0.4)',
    color: 'var(--text-color)',
  },
  '3': {
    background: 'rgba(239, 68, 68, 0.18)',
    borderColor: 'rgba(239, 68, 68, 0.45)',
    color: 'var(--text-color)',
  },
}

const DEFAULT_DAY_WIDTH = 32
const DEFAULT_ROW_HEIGHT = 32
const DEFAULT_BLOCK_OFFSET = 4
const MIN_SIDE_COLUMN_WIDTH = 120
const MAX_SIDE_COLUMN_WIDTH = 600
const RESIZABLE_COLUMN_INDEX = 0

const parseWidth = (width?: number | string, fallback = 160) => {
  if (typeof width === 'number') return width
  if (typeof width === 'string') {
    const value = Number.parseFloat(width)
    return Number.isNaN(value) ? fallback : value
  }
  return fallback
}

const toTaskArray = (row: GanttRowType, key: string): GanttTask[] => {
  const value = row[key]
  if (Array.isArray(value)) {
    return value as GanttTask[]
  }
  return row.blockList ?? []
}

const isTaskVisible = (task: GanttTask) => {
  if (task.isValidate === undefined) return true
  if (typeof task.isValidate === 'boolean') return task.isValidate
  return task.isValidate === '1'
}

const resolveDate = (input: string | Date | undefined, fallback: Date) => {
  if (!input) return fallback
  const parsed = dayjs(input)
  return parsed.isValid() ? parsed.toDate() : fallback
}

const extractTimelineBounds = (
  rows: GanttRowType[],
  listKey: string,
  explicitStart?: string | Date,
  explicitEnd?: string | Date,
  fallbackRangeMonths = 1,
) => {
  const fallbackStart = dayjs().startOf('day')
  const normalizedMonths = Number.isFinite(fallbackRangeMonths) ? fallbackRangeMonths : 1
  const clampedMonths = Math.max(normalizedMonths || 0, 1)
  const fallbackEnd = fallbackStart.add(clampedMonths, 'month')

  const allTasks = rows.flatMap((row) => toTaskArray(row, listKey)).filter(isTaskVisible)

  const minStart = allTasks.reduce<dayjs.Dayjs | null>((acc, task) => {
    const start = dayjs(task.startTime)
    if (!start.isValid()) return acc
    if (!acc) return start
    return start.isBefore(acc) ? start : acc
  }, null)

  const maxEnd = allTasks.reduce<dayjs.Dayjs | null>((acc, task) => {
    const end = dayjs(task.endTime)
    if (!end.isValid()) return acc
    if (!acc) return end
    return end.isAfter(acc) ? end : acc
  }, null)

  const start = resolveDate(explicitStart, minStart ? minStart.toDate() : fallbackStart.toDate())
  const end = resolveDate(explicitEnd, maxEnd ? maxEnd.toDate() : fallbackEnd.toDate())

  if (dayjs(end).isBefore(start)) {
    return [start, dayjs(start).add(7, 'day').toDate()] as [Date, Date]
  }

  return [dayjs(start).startOf('day').toDate(), dayjs(end).startOf('day').toDate()] as [Date, Date]
}

export const GanttChart = ({
  data = [],
  columns = [],
  listKey = 'blockList',
  startDate,
  endDate,
  dayWidth = DEFAULT_DAY_WIDTH,
  rowHeight = DEFAULT_ROW_HEIGHT,
  blockOffset = DEFAULT_BLOCK_OFFSET,
  fallbackRangeMonths = 1,
  className,
  height,
  statusMap,
  onBlockClick,
  onBlockContextMenu,
  enableDragging = false,
}: GanttChartProps) => {
  const [rows, setRows] = useState<GanttRowType[]>(data)
  const [scrollState, setScrollState] = useState({ x: 0, y: 0 })

  const sideBodyRef = useRef<HTMLDivElement>(null)
  const gridBodyRef = useRef<HTMLDivElement>(null)
  const scrollFrame = useRef<number>()

  useEffect(() => {
    setRows(data)
  }, [data])

  const timelineRange = useMemo(
    () => extractTimelineBounds(rows, listKey, startDate, endDate, fallbackRangeMonths),
    [rows, listKey, startDate, endDate, fallbackRangeMonths],
  )
  const monthSegments = useChoiceTimeArr(timelineRange, dayWidth)
  const timelineDays = useMemo(
    () => monthSegments.flatMap((segment) => segment.days),
    [monthSegments],
  )
  const totalWidth = useMemo(
    () => monthSegments.reduce((total, segment) => total + segment.value, 0),
    [monthSegments],
  )

  const baseColumnWidths = useMemo(
    () => columns.map((column) => parseWidth(column.width)),
    [columns],
  )
  const [columnWidths, setColumnWidths] = useState<number[]>(baseColumnWidths)
  const sideWidth = useMemo(
    () => columnWidths.reduce((sum, width) => sum + width, 0),
    [columnWidths],
  )

  useEffect(() => {
    setColumnWidths(baseColumnWidths)
  }, [baseColumnWidths])

  const containerStyle = useMemo(() => {
    const style: CSSProperties = {}
    if (height !== undefined) {
      style.height = height
    }
    return style
  }, [height])

  const timeBlockStyle = useTimeBlockStyle(
    timelineRange,
    dayWidth,
    blockOffset,
    rowHeight,
    scrollState.x,
  )

  const rowSizeStyle = useMemo(
    () => ({
      minHeight: rowHeight + blockOffset * 2,
      height: rowHeight + blockOffset * 2,
    }),
    [blockOffset, rowHeight],
  )

  useEffect(() => {
    const body = gridBodyRef.current
    const side = sideBodyRef.current
    if (!body) return undefined

    const handleScroll = (event: Event) => {
      const target = event.target as HTMLDivElement
      if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current)
      scrollFrame.current = requestAnimationFrame(() => {
        setScrollState({ x: target.scrollLeft, y: target.scrollTop })
      })
    }

    body.addEventListener('scroll', handleScroll, { passive: true })

    const handleWheel = (event: WheelEvent) => {
      if (!body) return
      if (event.deltaY !== 0) {
        body.scrollTop += event.deltaY
        event.preventDefault()
      }
    }

    side?.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      body.removeEventListener('scroll', handleScroll)
      side?.removeEventListener('wheel', handleWheel)
      if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current)
    }
  }, [])

  const resizeStateRef = useRef<{ startX: number; initialColumns: number[] } | null>(null)

  const handleResizerMouseMove = useCallback((event: MouseEvent) => {
    const state = resizeStateRef.current
    if (!state) return
    if (!state.initialColumns.length) return
    const delta = event.clientX - state.startX
    const targetWidth = state.initialColumns[RESIZABLE_COLUMN_INDEX] + delta
    const clampedWidth = Math.min(
      Math.max(targetWidth, MIN_SIDE_COLUMN_WIDTH),
      MAX_SIDE_COLUMN_WIDTH,
    )

    setColumnWidths((prev) => {
      if (!prev.length) return prev
      const next = [...prev]
      next[RESIZABLE_COLUMN_INDEX] = clampedWidth
      return next
    })
  }, [])

  const handleResizerMouseUp = useCallback(() => {
    resizeStateRef.current = null
    window.removeEventListener('mousemove', handleResizerMouseMove)
    window.removeEventListener('mouseup', handleResizerMouseUp)
  }, [handleResizerMouseMove])

  const handleResizerMouseDown = useCallback(
    (event: ReactMouseEvent) => {
      if (!columnWidths.length) return
      event.preventDefault()
      resizeStateRef.current = {
        startX: event.clientX,
        initialColumns: [...columnWidths],
      }

      window.addEventListener('mousemove', handleResizerMouseMove)
      window.addEventListener('mouseup', handleResizerMouseUp)
    },
    [columnWidths, handleResizerMouseMove, handleResizerMouseUp],
  )

  useEffect(
    () => () => {
      window.removeEventListener('mousemove', handleResizerMouseMove)
      window.removeEventListener('mouseup', handleResizerMouseUp)
    },
    [handleResizerMouseMove, handleResizerMouseUp],
  )

  const mergedStatusMap = useMemo(() => ({ ...DEFAULT_STATUS_MAP, ...statusMap }), [statusMap])

  const { onMouseDown } = useGanttDrag({
    rows,
    dayWidth,
    startDate: timelineRange[0],
    listKey,
    onChange: enableDragging ? setRows : undefined,
  })

  const showResizer = columnWidths.length > 0

  const renderCell = useCallback(
    (row: GanttRowType, columnIndex: number) => {
      const column = columns[columnIndex]
      const width = columnWidths[columnIndex]
      const value = row[column.dataIndex]
      return (
        <GanttBlock key={column.key} width={width} className="cui-gantt__cell">
          {column.render ? column.render(value, row, columnIndex) : ((value as ReactNode) ?? '-')}
        </GanttBlock>
      )
    },
    [columnWidths, columns],
  )

  return (
    <div className={classNames('cui-gantt', className)} style={containerStyle}>
      <div className="cui-gantt__side" style={{ width: sideWidth }}>
        <div className="cui-gantt__side-header">
          <GanttRow className="h-[60px]">
            {columns.map((column, index) => (
              <GanttBlock
                key={column.key}
                width={columnWidths[index]}
                className="h-[60px] text-center"
              >
                {column.title}
              </GanttBlock>
            ))}
          </GanttRow>
        </div>
        <div
          className="cui-gantt__side-body"
          ref={sideBodyRef}
          style={{ transform: `translateY(-${scrollState.y}px)` }}
        >
          {rows.map((row) => (
            <GanttRow key={row.id} className="cui-gantt__side-row" style={rowSizeStyle}>
              {columns.map((_column, columnIndex) => renderCell(row, columnIndex))}
            </GanttRow>
          ))}
        </div>
      </div>
      {showResizer ? (
        <div
          className="cui-gantt__resizer"
          role="separator"
          aria-orientation="vertical"
          onMouseDown={handleResizerMouseDown}
        />
      ) : null}
      <div className="cui-gantt__grid">
        <div className="cui-gantt__grid-header">
          <GanttRow style={{ transform: `translateX(-${scrollState.x}px)`, width: totalWidth }}>
            {monthSegments.map((segment) => (
              <GanttTimeBlock key={segment.label} segment={segment} dayWidth={dayWidth} />
            ))}
          </GanttRow>
        </div>
        <div className="cui-gantt__grid-body" ref={gridBodyRef}>
          <div className="cui-gantt__grid-inner" style={{ width: totalWidth }}>
            {rows.map((row) => {
              const tasks = toTaskArray(row, listKey).filter(isTaskVisible)
              return (
                <GanttRow
                  key={`grid-${row.id}`}
                  className="cui-gantt__grid-row"
                  style={rowSizeStyle}
                >
                  {timelineDays.map((day) => (
                    <GanttBlock
                      key={`${row.id}-${day.toISOString()}`}
                      width={dayWidth}
                      className="cui-gantt__grid-cell"
                    />
                  ))}

                  {tasks.map((task) => {
                    const blockStyle = timeBlockStyle(task)
                    const statusStyle =
                      mergedStatusMap[task.status ?? ''] ?? mergedStatusMap.default ?? {}
                    const inlineStyle = {
                      ...statusStyle,
                      ...task.style,
                      ...blockStyle,
                      background: statusStyle.background ?? blockStyle.background,
                      borderColor:
                        statusStyle.borderColor ?? statusStyle.background ?? 'transparent',
                      color: statusStyle.color ?? 'var(--text-color)',
                    }

                    return (
                      <div
                        key={task.id}
                        className={classNames('cui-gantt__task', {
                          'cui-gantt__task--interactive': enableDragging,
                        })}
                        style={inlineStyle}
                        role="button"
                        tabIndex={0}
                        onClick={() => onBlockClick?.(task, row)}
                        onContextMenu={(event) => {
                          event.preventDefault()
                          onBlockContextMenu?.(task, row, event)
                        }}
                        onMouseDown={
                          enableDragging ? (event) => onMouseDown(event, task, row) : undefined
                        }
                      >
                        {enableDragging ? (
                          <>
                            <span
                              className="cui-gantt__task-handle cui-gantt__task-handle--start"
                              data-gantt-handle="start"
                            />
                            <span
                              className="cui-gantt__task-handle cui-gantt__task-handle--end"
                              data-gantt-handle="end"
                            />
                          </>
                        ) : null}
                        <span className="cui-gantt__task-name">{task.projectName}</span>
                      </div>
                    )
                  })}
                </GanttRow>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GanttChart
