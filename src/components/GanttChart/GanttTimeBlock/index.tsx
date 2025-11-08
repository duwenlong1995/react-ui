import dayjs from 'dayjs'
import type { GanttMonthSegment } from '../types'
import '../index.css'

interface GanttTimeBlockProps {
  segment: GanttMonthSegment
  dayWidth: number
}

const GanttTimeBlock = ({ segment, dayWidth }: GanttTimeBlockProps) => {
  const { label, days, value, currentDate } = segment

  return (
    <div className="gantt-time-block" style={{ width: `${value}px` }}>
      <div className="gantt-time-block-top">{label}</div>
      <div className="gantt-time-block-bottom">
        {days.map((day) => {
          const dayLabel = dayjs(day).format('DD')
          const isToday = currentDate && dayLabel === currentDate
          return (
            <div key={day.toISOString()} className="day-item" style={{ width: `${dayWidth}px` }}>
              <span className={isToday ? 'font-semibold text-[var(--info-color)]' : ''}>
                {dayLabel}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GanttTimeBlock
