import React, { ReactNode } from 'react'
import { Icon } from '../Icon'
import { ButtonTypes as ButtonTypesList } from '../../types/button'

type ButtonTypes = (typeof ButtonTypesList)[number]
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link'

export interface ButtonProps {
  children?: ReactNode
  disabled?: boolean
  type?: ButtonTypes
  size?: ButtonSize
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  icon?: string
  iconPosition?: 'left' | 'right'
  loading?: boolean
  block?: boolean
  variant?: ButtonVariant
}

export const Button = ({
  type = 'outline',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className = '',
  icon,
  iconPosition = 'left',
  loading = false,
  block = false,
  ...rest
}: ButtonProps) => {
  const typeClassMap: Record<ButtonTypes, string> = {
    primary:
      'bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] active:bg-[var(--primary-color-active)] focus-visible:ring-2 focus-visible:ring-[var(--info-color)] focus-visible:ring-offset-2 !text-white shadow-[var(--button-shadow)] hover:shadow-[var(--button-shadow-hover)] active:shadow-inner border border-transparent',
    submit:
      'bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] active:bg-[var(--primary-color-active)] focus-visible:ring-2 focus-visible:ring-[var(--info-color)] focus-visible:ring-offset-2 !text-white shadow-[var(--button-shadow)] hover:shadow-[var(--button-shadow-hover)] active:shadow-inner border border-transparent',
    outline:
      'bg-[var(--outline-color)] hover:text-[var(--primary-color)] hover:bg-[var(--outline-color-hover)] border border-[var(--outline-color-border)] hover:border-[var(--primary-color)] active:border-[var(--primary-color-active)] focus-visible:ring-2 focus-visible:ring-[var(--info-color)] focus-visible:ring-offset-2 shadow-[var(--button-shadow)] hover:shadow-[var(--button-shadow-hover)] active:shadow-inner text-[var(--text-color)]',
    link: 'bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--info-color)] focus-visible:ring-offset-2 underline-offset-4 hover:underline border border-transparent text-[var(--link-color)] hover:text-[var(--primary-color)] active:text-[var(--primary-color-active)]',
    danger:
      'bg-[var(--danger-color)] hover:bg-[var(--primary-danger-hover)] active:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 !text-white shadow-[var(--button-shadow)] hover:shadow-[var(--button-shadow-hover)] active:shadow-inner border border-transparent',
  }

  const sizeClassMap: Record<ButtonSize, string> = {
    sm: 'h-7 px-3 py-1 text-xs font-medium rounded-[var(--radius-md)]',
    md: 'h-9 px-4 py-1.5 text-sm font-medium rounded-[var(--radius-md)]',
    lg: 'h-11 px-5 py-2 text-base font-medium rounded-[var(--radius-lg)]',
  }

  const baseClass = `inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold focus-visible:outline-none select-none ${
    disabled || loading ? 'opacity-50 cursor-not-allowed ' : 'cursor-pointer'
  } ${block ? 'w-full' : ''}`

  const loadingClass = loading ? 'opacity-70 pointer-events-none animate-pulse' : ''

  const buttonClass = [className, typeClassMap[type], sizeClassMap[size], baseClass, loadingClass]
    .filter(Boolean)
    .join(' ')

  const renderLeft = iconPosition === 'left'

  // 只有在有图标需要显示时才创建Icon组件
  const shouldShowIcon = loading || (icon && icon !== '')

  const iconElement = shouldShowIcon ? (
    <Icon
      iconName={loading ? 'loading' : icon}
      color={
        type === 'primary' || type === 'submit' || type === 'danger' ? 'white' : 'currentColor'
      }
      size={size}
      className={loading ? 'animate-spin flex-shrink-0' : 'flex-shrink-0'}
    />
  ) : null

  return (
    <button
      {...rest}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {renderLeft && iconElement}
      {children}
      {!renderLeft && iconElement}
    </button>
  )
}
