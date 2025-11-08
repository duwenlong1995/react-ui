import { useCallback, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import type { GanttRow, GanttTask } from '../types'

export interface DragContext {
  rows: GanttRow[]
  onChange?: (rows: GanttRow[]) => void
  dayWidth: number
  startDate: Date
  listKey: string
}

type DragMode = 'move' | 'resize-start' | 'resize-end'

interface DragState {
  mode: DragMode
  rowId: string
  taskId: string
  originX: number
  originStart: dayjs.Dayjs
  originEnd: dayjs.Dayjs
  startAsDate: boolean
  endAsDate: boolean
  lastStartKey: string
  lastEndKey: string
}

const extractTasks = (row: GanttRow, listKey: string): GanttTask[] => {
  const value = row[listKey]
  if (Array.isArray(value)) return value as GanttTask[]
  if (Array.isArray(row.blockList)) return row.blockList
  return []
}

const withUpdatedTasks = (row: GanttRow, listKey: string, tasks: GanttTask[]) => {
  const nextRow: GanttRow = { ...row }
  nextRow[listKey] = tasks
  if (listKey !== 'blockList') {
    nextRow.blockList = tasks
  }
  return nextRow
}

const formatKey = (value: dayjs.Dayjs, asDate: boolean) =>
  `${value.startOf('day').format('YYYY-MM-DD')}|${asDate ? 'date' : 'string'}`

const serializeValue = (value: dayjs.Dayjs, asDate: boolean) =>
  asDate ? value.startOf('day').toDate() : value.startOf('day').format('YYYY-MM-DD')

export const useGanttDrag = ({ rows, onChange, dayWidth, listKey }: DragContext) => {
  const rowsRef = useRef(rows)
  const dragStateRef = useRef<DragState | null>(null)
  const frameRef = useRef<number>()
  const originalUserSelect = useRef<string>('')
  const originalCursor = useRef<string>('')
  const teardownRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    rowsRef.current = rows
  }, [rows])

  const applyUpdate = useCallback(
    (rowId: string, taskId: string, start: string | Date, end: string | Date) => {
      if (!onChange) return

      const nextRows = rowsRef.current.map((row) => {
        if (row.id !== rowId) return row

        const tasks = extractTasks(row, listKey)
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, startTime: start, endTime: end } : task,
        )

        return withUpdatedTasks(row, listKey, updatedTasks)
      })

      onChange(nextRows)
    },
    [listKey, onChange],
  )

  const commitUpdate = useCallback(
    (mode: DragMode, deltaDays: number) => {
      const state = dragStateRef.current
      if (!state || !onChange) return

      let nextStart = state.originStart
      let nextEnd = state.originEnd

      if (mode === 'move') {
        nextStart = state.originStart.add(deltaDays, 'day')
        nextEnd = state.originEnd.add(deltaDays, 'day')
      } else if (mode === 'resize-start') {
        nextStart = state.originStart.add(deltaDays, 'day')
        if (nextStart.isAfter(nextEnd)) {
          nextStart = nextEnd
        }
      } else if (mode === 'resize-end') {
        nextEnd = state.originEnd.add(deltaDays, 'day')
        if (nextEnd.isBefore(nextStart)) {
          nextEnd = nextStart
        }
      }

      const startKey = formatKey(nextStart, state.startAsDate)
      const endKey = formatKey(nextEnd, state.endAsDate)

      if (startKey === state.lastStartKey && endKey === state.lastEndKey) {
        return
      }

      state.lastStartKey = startKey
      state.lastEndKey = endKey

      applyUpdate(
        state.rowId,
        state.taskId,
        serializeValue(nextStart, state.startAsDate),
        serializeValue(nextEnd, state.endAsDate),
      )
    },
    [applyUpdate, onChange],
  )

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, task: GanttTask, row: GanttRow) => {
      if (!onChange || event.button !== 0) return

      const start = dayjs(task.startTime).startOf('day')
      const end = dayjs(task.endTime).startOf('day')

      if (!start.isValid() || !end.isValid()) return

      teardownRef.current?.()

      const handle = (event.target as HTMLElement | null)?.closest('[data-gantt-handle]')
      const mode: DragMode = handle
        ? handle.getAttribute('data-gantt-handle') === 'start'
          ? 'resize-start'
          : 'resize-end'
        : 'move'

      dragStateRef.current = {
        mode,
        rowId: row.id,
        taskId: task.id,
        originX: event.clientX,
        originStart: start,
        originEnd: end,
        startAsDate: task.startTime instanceof Date,
        endAsDate: task.endTime instanceof Date,
        lastStartKey: formatKey(start, task.startTime instanceof Date),
        lastEndKey: formatKey(end, task.endTime instanceof Date),
      }

      originalUserSelect.current = document.body.style.userSelect
      originalCursor.current = document.body.style.cursor
      document.body.style.userSelect = 'none'
      document.body.style.cursor = mode === 'move' ? 'grabbing' : 'ew-resize'

      const moveListener = (moveEvent: MouseEvent) => {
        const state = dragStateRef.current
        if (!state || !onChange) return

        const deltaPx = moveEvent.clientX - state.originX
        const deltaDays = Math.round(deltaPx / dayWidth)

        if (frameRef.current) cancelAnimationFrame(frameRef.current)
        frameRef.current = requestAnimationFrame(() => {
          commitUpdate(state.mode, deltaDays)
        })

        moveEvent.preventDefault()
      }

      function cleanupListeners() {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current)
          frameRef.current = undefined
        }
        dragStateRef.current = null
        document.removeEventListener('mousemove', moveListener)
        document.removeEventListener('mouseup', upListener)
        document.body.style.userSelect = originalUserSelect.current
        document.body.style.cursor = originalCursor.current
        teardownRef.current = null
      }

      function upListener() {
        cleanupListeners()
      }

      document.addEventListener('mousemove', moveListener)
      document.addEventListener('mouseup', upListener)

      teardownRef.current = cleanupListeners

      event.preventDefault()
      event.stopPropagation()
    },
    [commitUpdate, dayWidth, onChange],
  )
  useEffect(
    () => () => {
      teardownRef.current?.()
    },
    [],
  )

  return { onMouseDown: handleMouseDown }
}
