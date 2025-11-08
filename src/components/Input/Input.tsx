import React, { forwardRef } from 'react'
import { InputTypes } from '../../types/input'
import { Icon } from '../Icon'
import './index.css'

type InputType = (typeof InputTypes)[number]
type InputSize = 'sm' | 'md' | 'lg'
type InputVariant = 'default' | 'error' | 'success'

export interface InputProps {
  disabled?: boolean
  placeholder?: string
  type?: InputType
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  value?: string
  defaultValue?: string
  size?: InputSize
  variant?: InputVariant
  error?: string
  icon?: string
  className?: string
  id?: string
  name?: string
  required?: boolean
  autoFocus?: boolean
  readOnly?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      disabled = false,
      type = 'text',
      placeholder,
      onChange,
      onFocus,
      onBlur,
      value,
      defaultValue,
      size = 'md',
      variant = 'default',
      error,
      icon,
      className = '',
      id,
      name,
      required = false,
      autoFocus = false,
      readOnly = false,
      ...rest
    },
    ref,
  ) => {
    const sizeClassMap: Record<InputSize, string> = {
      sm: 'h-8 px-3 py-1.5 text-xs font-medium rounded-[var(--radius-md)]',
      md: 'h-10 px-4 py-2 text-sm font-medium rounded-[var(--radius-md)]',
      lg: 'h-12 px-5 py-3 text-base font-medium rounded-[var(--radius-lg)]',
    }

    const variantClassMap: Record<InputVariant, string> = {
      default:
        'border-[var(--outline-color-border)] hover:border-[var(--primary-color)] focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:ring-offset-1',
      error:
        'border-red-500 hover:border-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:ring-offset-1',
      success:
        'border-green-500 hover:border-green-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:ring-offset-1',
    }

    const shouldShowIcon = icon && icon !== ''

    const iconPadding = shouldShowIcon
      ? {
          sm: 'pl-8',
          md: 'pl-9',
          lg: 'pl-10',
        }[size]
      : ''

    const baseClass = `w-full rounded-lg border bg-[var(--outline-color)] text-[var(--text-color)] shadow-sm transition-all duration-[var(--transition-fast)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:ring-offset-1 placeholder:text-[var(--text-color-secondary)] disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none hover:border-[var(--primary-color)] ${sizeClassMap[size]} ${variantClassMap[variant]} ${iconPadding}`

    return (
      <div className="relative">
        {shouldShowIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center justify-center w-8 pointer-events-none">
            <Icon
              iconName={icon}
              size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : size === 'lg' ? 'lg' : 'md'}
              color="var(--text-color-secondary)"
            />
          </div>
        )}

        <input
          ref={ref}
          {...rest}
          id={id}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoFocus={autoFocus}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`${baseClass} ${className}`}
          aria-invalid={variant === 'error'}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {error && (
          <div id={`${id}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
