import { useMemo } from 'react'
import dayjs from 'dayjs'
import type { CSSProperties } from 'react'
import type { GanttMonthSegment, GanttTask } from '../types'

/**
 * 时间或时间字符串格式化为YYYY-MM
 * @param date
 * @returns
 */
export const formatDate = (date: string | Date) => format(date, false)

// 使用 dayjs 格式化日期
const format = (date: string | Date | undefined, full = true) => {
  if (!date) return ''
  try {
    const myDate = dayjs(date)
    if (!myDate.isValid()) return ''
    return myDate.format(full ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM')
  } catch (error) {
    console.warn('format date error', error)
    return ''
  }
}

/**
 * 获取年月数组
 */
export const useChoiceTimeArr = (choiceTime: [Date, Date], dayWidth: number) =>
  useMemo<GanttMonthSegment[]>(() => {
    const [choiceStart, choiceEnd] = choiceTime
    const startDay = dayjs(choiceStart).startOf('day')
    const endDay = dayjs(choiceEnd).startOf('day')

    const months: GanttMonthSegment[] = []
    let cursor = startDay.startOf('month')

    while (cursor.isBefore(endDay) || cursor.isSame(endDay, 'month')) {
      const monthStart = cursor.startOf('month')
      const daysInMonth = cursor.daysInMonth()

      const days: Date[] = []
      for (let dayIndex = 0; dayIndex < daysInMonth; dayIndex += 1) {
        days.push(monthStart.add(dayIndex, 'day').toDate())
      }

      months.push({
        label: cursor.format('YYYY-MM'),
        value: days.length * dayWidth,
        currentDate: cursor.isSame(dayjs(), 'month') ? dayjs().format('DD') : undefined,
        days,
      })

      cursor = cursor.add(1, 'month')
    }

    return months
  }, [choiceTime, dayWidth])

// 计算字符串长度,中文算2个长度
const stringLength = (str: string) => {
  return Array.from(str).reduce(
    (total, char) => (char.charCodeAt(0) > 255 ? total + 2 : total + 1),
    0,
  )
}

export const useTimeBlockStyle = (
  choiceTime: [Date, Date],
  dayWidth: number,
  blockOffset: number,
  rowHeight: number,
  scrollLeft: number,
) =>
  useMemo(() => {
    const [start] = choiceTime
    const baseTime = dayjs(start).startOf('day')

    return (task: GanttTask): CSSProperties => {
      const startTime = dayjs(task.startTime).startOf('day')
      const endTime = dayjs(task.endTime).endOf('day')
      const left = Math.max(0, startTime.diff(baseTime, 'day')) * dayWidth
      const width = Math.max(dayWidth, endTime.diff(startTime, 'day') * dayWidth + dayWidth)

      const style: CSSProperties = {
        lineHeight: `${rowHeight}px`,
        height: `${rowHeight}px`,
        top: `${blockOffset}px`,
        left: `${left}px`,
        width: `${width}px`,
      }

      if (scrollLeft > left && scrollLeft < left + width) {
        const padding = scrollLeft - left + 12
        const textWidth = stringLength(task.projectName || '') * 6 + 12
        style.paddingLeft = `${Math.min(padding, Math.max(width - textWidth, 12))}px`
      }

      return style
    }
  }, [blockOffset, choiceTime, dayWidth, rowHeight, scrollLeft])
