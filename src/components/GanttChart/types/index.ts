import type { CSSProperties, MouseEvent, ReactNode } from 'react'

export interface GanttColumn {
  title: string
  dataIndex: string
  key: string
  width?: number | string
  render?: (value: unknown, row: GanttRow, index: number) => ReactNode
}

export interface GanttTask {
  id: string
  projectName: string
  startTime: string | Date
  endTime: string | Date
  status?: string
  isValidate?: string | boolean
  equipmentId?: string
  style?: CSSProperties
  [key: string]: unknown
}

export interface GanttRow {
  id: string
  blockList: GanttTask[]
  [key: string]: unknown
}

export interface GanttStatusStyle {
  color?: string
  background?: string
  borderColor?: string
}

export interface GanttChartProps {
  /** 数据源 */
  data?: GanttRow[]
  /** 表格列配置 */
  columns?: GanttColumn[]
  /** 行数据中用于渲染任务列表的字段名 */
  listKey?: string
  /** 起始时间，默认取数据最小开始时间 */
  startDate?: string | Date
  /** 结束时间，默认取数据最大结束时间 */
  endDate?: string | Date
  /** 单天对应的像素宽度 */
  dayWidth?: number
  /** 甘特行高度 */
  rowHeight?: number
  /** 甘特块顶部偏移 */
  blockOffset?: number
  /** 当数据无法推导时间范围时的默认展示月份跨度 */
  fallbackRangeMonths?: number
  /** 是否启用拖拽（暂未实现拖拽行为，仅用于未来扩展） */
  enableDragging?: boolean
  /** 状态样式映射 */
  statusMap?: Record<string, GanttStatusStyle>
  /** 自定义类名 */
  className?: string
  /** 甘特图整体高度 */
  height?: number
  onBlockClick?: (task: GanttTask, row: GanttRow) => void
  onBlockContextMenu?: (task: GanttTask, row: GanttRow, event: MouseEvent<HTMLDivElement>) => void
}

export interface GanttMonthSegment {
  label: string
  value: number
  currentDate?: string
  days: Date[]
}
