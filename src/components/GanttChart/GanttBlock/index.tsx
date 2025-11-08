import type { CSSProperties, ReactNode } from 'react'
import classNames from 'classnames'
import '../index.css'

interface GanttBlockProps {
  className?: string
  width?: number | string
  children?: ReactNode
  style?: CSSProperties
}

const GanttBlock = ({ className, width = 'auto', children, style }: GanttBlockProps) => {
  const resolvedWidth = typeof width === 'number' ? `${width}px` : width

  return (
    <div
      className={classNames('gantt-block', className)}
      style={{ ...style, width: resolvedWidth }}
    >
      {children}
    </div>
  )
}

export default GanttBlock
