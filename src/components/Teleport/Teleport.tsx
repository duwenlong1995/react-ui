import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { Icon } from '../Icon'

export type TeleportPosition = 'top' | 'middle' | 'bottom'

export type TeleportVariant = 'default' | 'info' | 'success' | 'warning' | 'danger'

export interface TeleportOptions {
  content: React.ReactNode
  duration?: number
  afterClose?: () => void
  position?: TeleportPosition
  variant?: TeleportVariant
  icon?: React.ReactNode
  iconName?: string
  closable?: boolean
  className?: string
  style?: React.CSSProperties
  key?: string | number
  ariaRole?: 'status' | 'alert'
}

interface ToastItem extends Required<Pick<TeleportOptions, 'position'>> {
  id: string | number
  content: React.ReactNode
  variant: TeleportVariant
  icon?: React.ReactNode
  iconName?: string
  className?: string
  style?: React.CSSProperties
  duration: number
  closable: boolean
  afterClose?: () => void
  ariaRole: 'status' | 'alert'
  timer?: number
}

interface ContainerRef {
  host: HTMLElement
  root: Root
  items: ToastItem[]
}

const containers = new Map<TeleportPosition, ContainerRef>()
let seed = 0

const positionWrapperClass: Record<TeleportPosition, string> = {
  top: 'top-6 sm:top-8',
  middle: 'top-1/2 -translate-y-1/2',
  bottom: 'bottom-8 sm:bottom-10',
}

const variantClassMap: Record<TeleportVariant, string> = {
  default:
    'bg-white/65 text-[var(--text-color)] border border-[var(--outline-color-border)]/60 shadow-[var(--shadow-sm)] backdrop-blur-md',
  info: 'bg-[var(--info-color)]/18 text-[var(--info-color)] border border-[var(--info-color)]/30 shadow-[var(--shadow-sm)] backdrop-blur-md',
  success:
    'bg-[var(--success-color)]/18 text-[var(--success-color)] border border-[var(--success-color)]/30 shadow-[var(--shadow-sm)] backdrop-blur-md',
  warning:
    'bg-[var(--warning-color)]/20 text-[var(--warning-color)] border border-[var(--warning-color)]/35 shadow-[var(--shadow-sm)] backdrop-blur-md',
  danger:
    'bg-[var(--danger-color)]/18 text-[var(--danger-color)] border border-[var(--danger-color)]/30 shadow-[var(--shadow-sm)] backdrop-blur-md',
}

const defaultIconMap: Partial<Record<TeleportVariant, string>> = {
  default: 'info',
  info: 'info',
  success: 'upload_success',
  warning: 'alert',
  danger: 'delete',
}

const iconColorMap: Partial<Record<TeleportVariant, string>> = {
  default: 'var(--text-color)',
  info: 'var(--info-color)',
  success: 'var(--success-color)',
  warning: 'var(--warning-color)',
  danger: 'var(--danger-color)',
}

const iconWrapperClassMap: Partial<Record<TeleportVariant, string>> = {
  default: 'bg-[var(--text-color)]/18',
  info: 'bg-[var(--info-color)]/18',
  success: 'bg-[var(--success-color)]/18',
  warning: 'bg-[var(--warning-color)]/20',
  danger: 'bg-[var(--danger-color)]/18',
}

const ensureContainer = (position: TeleportPosition): ContainerRef | null => {
  if (typeof document === 'undefined') return null
  let record = containers.get(position)
  if (!record) {
    const host = document.createElement('div')
    host.className = 'cui-teleport-host'
    document.body.appendChild(host)
    const root = createRoot(host)
    record = { host, root, items: [] }
    containers.set(position, record)
  }
  return record
}

const destroyContainer = (position: TeleportPosition) => {
  const record = containers.get(position)
  if (!record) return
  record.items.forEach((item) => {
    if (typeof item.timer === 'number') {
      window.clearTimeout(item.timer)
    }
    item.afterClose?.()
  })
  record.root.render(null)
  record.root.unmount()
  if (record.host.parentNode) {
    record.host.parentNode.removeChild(record.host)
  }
  containers.delete(position)
}

const renderContainer = (position: TeleportPosition) => {
  const record = containers.get(position)
  if (!record) return
  record.root.render(
    <ToastStack
      position={position}
      items={record.items}
      onClose={(id) => removeToast(position, id)}
    />,
  )
}

const removeToast = (position: TeleportPosition, id: string | number, triggerClose = true) => {
  const record = containers.get(position)
  if (!record) return
  const index = record.items.findIndex((item) => item.id === id)
  if (index === -1) return
  const [item] = record.items.splice(index, 1)
  if (typeof item.timer === 'number') {
    window.clearTimeout(item.timer)
  }
  renderContainer(position)
  if (triggerClose) {
    item.afterClose?.()
  }
  if (record.items.length === 0) {
    destroyContainer(position)
  }
}

const ToastStack: React.FC<{
  position: TeleportPosition
  items: ToastItem[]
  onClose: (id: string | number) => void
}> = ({ position, items, onClose }) => {
  if (items.length === 0) return null

  const wrapperClass = positionWrapperClass[position]

  return (
    <div
      className={`pointer-events-none fixed left-1/2 z-[9999] flex w-full max-w-[min(480px,calc(100vw-2rem))] -translate-x-1/2 transform px-4 ${wrapperClass}`}
    >
      <div className="flex w-full flex-col items-center gap-3">
        {items.map((item) => (
          <ToastItemView key={item.id} item={item} onClose={() => onClose(item.id)} />
        ))}
      </div>
    </div>
  )
}

const ToastItemView: React.FC<{
  item: ToastItem
  onClose: () => void
}> = ({ item, onClose }) => {
  const { variant, content, icon, iconName, className, style, closable, ariaRole } = item
  const mergedClassName = [
    'pointer-events-auto flex w-full items-start gap-3 rounded-[var(--radius-lg)] px-4 py-3 backdrop-blur-[2px]',
    variantClassMap[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const iconColor = iconColorMap[variant] ?? 'var(--text-color)'
  const iconWrapperClass = iconWrapperClassMap[variant] ?? 'bg-[var(--outline-color-hover)]'

  const resolvedIcon = icon ? (
    <span className="mt-0.5 flex shrink-0 items-center justify-center rounded-full bg-[var(--outline-color-hover)]">
      {icon}
    </span>
  ) : iconName || defaultIconMap[variant] ? (
    <span
      className={`mt-0.5 flex shrink-0 items-center justify-center rounded-full shadow-sm ${iconWrapperClass}`}
    >
      <Icon
        iconName={(iconName || defaultIconMap[variant]) ?? ''}
        size="sm"
        color={iconColor}
        className="flex-shrink-0"
      />
    </span>
  ) : null

  return (
    <div
      role={ariaRole}
      className={`${mergedClassName}  items-center animate-[fadeInUp_0.24s_var(--transition-fast)_both]`}
      style={style}
    >
      {resolvedIcon}
      <div className="flex-1 text-sm leading-relaxed">{content}</div>

      {closable ? (
        <button
          type="button"
          className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-color-muted)] transition-colors duration-[var(--transition-fast)] hover:bg-[var(--text-color)]/5 hover:text-[var(--text-color)]"
          aria-label="关闭提示"
          onClick={onClose}
        >
          <Icon iconName="close" size="sm" color="currentColor" />
        </button>
      ) : null}
    </div>
  )
}

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'

const TeleportImpl = {
  show(options: TeleportOptions) {
    if (!isBrowser()) return null

    const {
      content,
      duration = 2500,
      afterClose,
      position = 'top',
      variant = 'default',
      icon,
      iconName,
      closable,
      className,
      style,
      key,
      ariaRole = 'status',
    } = options

    const record = ensureContainer(position)
    if (!record) return null
    if (content === undefined || content === null) return null

    const id = key ?? `teleport-${++seed}`

    // 如果传入相同 key，则先移除旧的
    const existingIndex = record.items.findIndex((item) => item.id === id)
    if (existingIndex !== -1) {
      const [existing] = record.items.splice(existingIndex, 1)
      if (existing.timer) {
        clearTimeout(existing.timer)
      }
    }

    const autoClosable = closable ?? duration === 0

    const toast: ToastItem = {
      id,
      content,
      position,
      variant,
      icon,
      iconName,
      className,
      style,
      duration,
      closable: autoClosable,
      afterClose,
      ariaRole,
    }

    if (duration > 0) {
      toast.timer = window.setTimeout(() => {
        removeToast(position, id)
      }, duration)
    }

    record.items.push(toast)
    renderContainer(position)

    const close = () => removeToast(position, id)
    return { id, close }
  },

  hide(id: string | number) {
    if (!isBrowser()) return
    containers.forEach((_, position) => {
      removeToast(position, id, true)
    })
  },

  clear(position?: TeleportPosition) {
    if (!isBrowser()) return
    if (position) {
      destroyContainer(position)
      return
    }
    Array.from(containers.keys()).forEach((pos) => destroyContainer(pos))
  },
}

export const Teleport = TeleportImpl
