import { CSSProperties, Key, ReactNode, TableHTMLAttributes } from 'react'
import { TableColumn, TableColumnAlign, TableColumnFixed } from './types/columns'

export interface TableProps<RecordType extends Record<string, unknown> = Record<string, unknown>>
  extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * 数据源
   */
  data?: RecordType[]
  /**
   * 列配置
   */
  columns: TableColumn<RecordType>[]
  /**
   * 自定义空状态内容。优先级：`emptyContent` > `children`
   */
  emptyContent?: ReactNode
  /**
   * 自定义行唯一 key
   */
  rowKey?: keyof RecordType | ((record: RecordType, index: number) => Key)
  /**
   * 是否展示外边框
   */
  bordered?: boolean
  /**
   * 斑马纹
   */
  striped?: boolean
  /**
   * 悬浮行高亮
   */
  hover?: boolean
  /**
   * 紧凑模式
   */
  condensed?: boolean
  /**
   * 响应式，超出时横向滚动
   */
  responsive?: boolean
  /**
   * 附加类名
   */
  className?: string
  /**
   * 数据加载中
   */
  loading?: boolean
  /**
   * 自定义空态或扩展渲染（兼容旧用法）
   */
  children?: ReactNode
}

const getStickyClass = (fixed?: TableColumnFixed, isHeader?: boolean) => {
  if (!fixed) return ''
  const position = fixed === 'left' ? 'left-0' : 'right-0'
  const zIndex = isHeader ? 'z-20' : 'z-10'
  const background = isHeader ? 'bg-[var(--table-header-bg)]' : 'bg-inherit'
  const divider =
    fixed === 'left'
      ? 'border-r border-[var(--table-border-color)]'
      : 'border-l border-[var(--table-border-color)]'
  return `sticky ${position} ${zIndex} ${background} ${divider}`
}

const getCellAlignmentClass = (align?: TableColumnAlign) => {
  if (!align) return ''
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}

const getValueByPath = <RecordType extends Record<string, unknown>>(
  record: RecordType,
  dataIndex?: TableColumn<RecordType>['dataIndex'],
): unknown => {
  if (dataIndex == null) return undefined
  const paths = Array.isArray(dataIndex) ? dataIndex : String(dataIndex).split('.')
  return paths.reduce<unknown>((current, path) => {
    if (current == null) return undefined
    if (typeof current !== 'object') return undefined
    const container = current as Record<string, unknown>
    return container[String(path)]
  }, record)
}

const resolveRowKey = <RecordType extends Record<string, unknown>>(
  record: RecordType,
  index: number,
  rowKey?: TableProps<RecordType>['rowKey'],
): Key => {
  if (typeof rowKey === 'function') {
    return rowKey(record, index)
  }
  if (rowKey) {
    const keyValue = record[rowKey]
    if (typeof keyValue === 'string' || typeof keyValue === 'number') {
      return keyValue
    }
  }
  const recordWithKey = record as Record<string, unknown>
  const internalKey = recordWithKey.key
  if (typeof internalKey === 'string' || typeof internalKey === 'number') {
    return internalKey
  }
  return index
}

const getColumnKey = <RecordType extends Record<string, unknown>>(
  column: TableColumn<RecordType>,
  fallback: Key,
): Key => {
  if (column.key != null) {
    return column.key
  }
  const { dataIndex } = column
  if (dataIndex == null) {
    return fallback
  }
  if (Array.isArray(dataIndex)) {
    return dataIndex.map(String).join('.')
  }
  return String(dataIndex)
}

export const Table = <RecordType extends Record<string, unknown> = Record<string, unknown>>({
  children,
  data = [],
  columns,
  bordered = false,
  striped = false,
  hover = false,
  condensed = false,
  responsive = false,
  className = '',
  loading = false,
  emptyContent,
  rowKey,
  ...rest
}: TableProps<RecordType>) => {
  const headerPadding = condensed ? 'px-3 py-2' : 'px-4 py-3'
  const cellPadding = condensed ? 'px-3 py-2' : 'px-4 py-3'

  const baseTableClassNames = [
    'min-w-full table-auto text-left text-sm text-[var(--text-color)] bg-[var(--bg-color)]',
    condensed ? 'text-xs' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const tableClassNames = [baseTableClassNames, className].filter(Boolean).join(' ')

  const wrapperClassNames = [
    'w-full',
    responsive ? 'overflow-x-auto' : '',
    bordered
      ? 'overflow-hidden rounded-xl border border-[var(--table-border-color)] bg-[var(--bg-color)] shadow-sm'
      : '',
    !bordered ? 'bg-[var(--bg-color)]' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const rowClassNames = [
    'transition-colors',
    striped
      ? 'odd:bg-[var(--table-row-bg)] even:bg-[var(--table-row-alt-bg)]'
      : 'bg-[var(--table-row-bg)]',
    hover ? 'hover:bg-[var(--table-row-hover-bg)]' : '',
    condensed ? 'h-12' : 'h-16',
  ]
    .filter(Boolean)
    .join(' ')

  const bodyClassNames = ['bg-[var(--table-row-bg)]', 'divide-y divide-[var(--table-border-color)]']
    .filter(Boolean)
    .join(' ')

  const renderHeader = () => {
    if (!columns?.length) return null
    return (
      <thead className="bg-[var(--table-header-bg)]">
        <tr>
          {columns.map((column, index) => {
            const headerKey = getColumnKey(column, index)
            const stickyClass = getStickyClass(column.fixed, true)
            const alignClass = getCellAlignmentClass(column.align)
            const headerClassNames = [
              headerPadding,
              'text-[var(--table-header-text)] text-sm font-semibold uppercase tracking-wide border-b border-[var(--table-border-color)] whitespace-nowrap',
              stickyClass,
              alignClass,
              column.className,
            ]
              .filter(Boolean)
              .join(' ')

            const headerStyle: CSSProperties = {
              ...(column.width !== undefined
                ? {
                    width: typeof column.width === 'number' ? `${column.width}px` : column.width,
                  }
                : {}),
              ...(column.headerStyle ?? {}),
            }

            if (column.align) {
              headerStyle.textAlign = column.align
            }

            return (
              <th key={headerKey} className={headerClassNames} scope="col" style={headerStyle}>
                {column.title}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }

  const renderEmpty = () => {
    if (children) {
      return <tbody className={bodyClassNames}>{children}</tbody>
    }
    return (
      <tbody className={bodyClassNames}>
        <tr>
          <td
            className="px-4 py-10 text-center text-sm text-[var(--text-color-muted)]"
            colSpan={Math.max(columns.length, 1)}
          >
            {emptyContent ?? '暂无数据'}
          </td>
        </tr>
      </tbody>
    )
  }

  const renderBody = () => {
    if (!data || data.length === 0) return renderEmpty()
    return (
      <tbody className={bodyClassNames}>
        {data.map((record, rowIndex) => {
          const rowKeyValue = resolveRowKey(record, rowIndex, rowKey)
          return (
            <tr key={rowKeyValue} className={rowClassNames}>
              {columns.map((column, colIndex) => {
                const fallbackKey = `${rowKeyValue}-${colIndex}`
                const cellKey = getColumnKey(column, fallbackKey)
                const stickyClass = getStickyClass(column.fixed)
                const alignClass = getCellAlignmentClass(column.align)
                const cellClassNames = [
                  cellPadding,
                  'align-middle text-[var(--text-color)] whitespace-nowrap',
                  stickyClass,
                  alignClass,
                  column.className,
                ]
                  .filter(Boolean)
                  .join(' ')

                const cellStyle: CSSProperties = {
                  ...(column.width !== undefined
                    ? {
                        width:
                          typeof column.width === 'number' ? `${column.width}px` : column.width,
                      }
                    : {}),
                  ...(column.cellStyle ?? {}),
                }

                if (column.align) {
                  cellStyle.textAlign = column.align
                }

                const cellValue = getValueByPath(record, column.dataIndex)
                const content: ReactNode = column.render
                  ? column.render(cellValue, record, rowIndex)
                  : ((cellValue ?? '') as ReactNode)

                return (
                  <td
                    key={cellKey}
                    className={cellClassNames}
                    style={cellStyle}
                    rowSpan={column.rowSpan}
                    colSpan={column.colSpan}
                  >
                    {content}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    )
  }

  const tableElement = (
    <table className={tableClassNames} {...rest}>
      {renderHeader()}
      {renderBody()}
    </table>
  )

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center py-10">
        {/* <SpinLoading color="primary" /> */}
      </div>
    )
  }

  if (responsive || bordered) {
    return <div className={wrapperClassNames}>{tableElement}</div>
  }

  return tableElement
}
