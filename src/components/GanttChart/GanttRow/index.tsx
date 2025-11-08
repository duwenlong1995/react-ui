import type { CSSProperties, ReactNode } from 'react'
import classNames from 'classnames'
import '../index.css'

interface GanttRowProps {
  id?: string
  className?: string
  children: ReactNode
  style?: CSSProperties
}

const GanttRow = ({ children, id, className, style }: GanttRowProps) => (
  <div className={classNames('gantt-row', className)} id={id} style={style}>
    {children}
  </div>
)

export default GanttRow
