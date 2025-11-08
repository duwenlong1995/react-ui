import { CSSProperties, Key, ReactNode } from 'react'

export type TableColumnAlign = 'left' | 'center' | 'right'
export type TableColumnFixed = 'left' | 'right'

export interface TableColumn<RecordType = Record<string, unknown>> {
  /**
   * 唯一标识符，未提供时将回退到索引
   */
  key?: Key
  /**
   * 表头标题
   */
  title: ReactNode
  /**
   * 字段对应的键，支持 `a.b.c` 深层访问
   */
  dataIndex?: keyof RecordType | string | Array<keyof RecordType | string>
  /**
   * 自定义渲染单元格
   */
  render?: (value: unknown, record: RecordType, index: number) => ReactNode
  /**
   * 单元格样式
   */
  cellStyle?: CSSProperties
  /**
   * 表头单元格样式
   */
  headerStyle?: CSSProperties
  /**
   * 列宽，可传数字或任意合法 CSS 宽度值
   */
  width?: number | string
  /**
   * 对齐方式
   */
  align?: TableColumnAlign
  /**
   * 固定列方向
   */
  fixed?: TableColumnFixed
  /**
   * 单元格自定义类名
   */
  className?: string
  /**
   * 行跨越
   */
  rowSpan?: number
  /**
   * 列跨越
   */
  colSpan?: number
}
