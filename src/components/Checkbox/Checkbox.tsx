import React, { ReactNode, forwardRef, useEffect, useId, useRef, useState } from 'react'

export type CheckboxType = 'checkbox' | 'radio'
export type CheckboxSize = 'sm' | 'md' | 'lg'

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'size' | 'children' | 'defaultChecked' | 'checked' | 'onChange'
  > {
  type?: CheckboxType
  size?: CheckboxSize
  label?: ReactNode
  description?: ReactNode
  helperText?: ReactNode
  error?: ReactNode
  indeterminate?: boolean
  className?: string
  wrapperClassName?: string
  controlClassName?: string
  children?: ReactNode
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const controlSizeMap: Record<CheckboxSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

const checkIconSizeMap: Record<CheckboxSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4',
}

const radioIndicatorSize: Record<CheckboxSize, string> = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
}

const labelSizeMap: Record<CheckboxSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const descriptionSizeMap: Record<CheckboxSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      type = 'checkbox',
      size = 'md',
      label,
      description,
      helperText,
      error,
      indeterminate = false,
      disabled = false,
      className = '',
      wrapperClassName = '',
      controlClassName = '',
      id,
      children,
      defaultChecked = false,
      checked,
      onChange,
      value,
      name,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? `${type}-${generatedId}`

    const internalRef = useRef<HTMLInputElement | null>(null)
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] = useState<boolean>(
      isControlled ? Boolean(checked) : Boolean(defaultChecked),
    )

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate && type === 'checkbox'
      }
    }, [indeterminate, type])

    useEffect(() => {
      if (isControlled) {
        setInternalChecked(Boolean(checked))
      }
    }, [checked, isControlled])

    const currentChecked = isControlled ? Boolean(checked) : internalChecked

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(event.target.checked)
      }
      onChange?.(event)
    }

    const setRefs = (node: HTMLInputElement | null) => {
      internalRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ;(ref as React.MutableRefObject<HTMLInputElement | null>).current = node
      }
    }

    const helperTextId = helperText ? `${inputId}-help` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy =
      [helperTextId, errorId, rest['aria-describedby']].filter(Boolean).join(' ') || undefined

    const rootClasses = [
      'group/checkbox relative flex w-fit items-start gap-3 text-[var(--text-color)]',
      disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
      className,
      wrapperClassName,
    ]
      .filter(Boolean)
      .join(' ')

    const controlClasses = [
      'pointer-events-none flex items-center justify-center border border-[var(--outline-color-border)] bg-[var(--outline-color)] text-white shadow-sm transition-all duration-[var(--transition-fast)]',
      type === 'radio' ? 'rounded-full' : 'rounded-[var(--radius-sm)]',
      'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--info-color)]/30 peer-focus-visible:ring-offset-2',
      currentChecked
        ? 'border-[var(--primary-color)] bg-[var(--primary-color)] shadow-[var(--button-shadow)]'
        : '',
      'peer-disabled:border-[var(--outline-color-border)] peer-disabled:bg-[var(--outline-color)] peer-disabled:text-[var(--text-color-muted)]',
      controlSizeMap[size],
      controlClassName,
    ]
      .filter(Boolean)
      .join(' ')

    const labelContent = label ?? children
    const hasLabel = Boolean(labelContent)
    const hasDescription = Boolean(description)
    const hasHelperText = Boolean(helperText)
    const hasError = Boolean(error)
    const hasTextualContent = hasLabel || hasDescription || hasHelperText || hasError
    const showIndeterminate = indeterminate && type === 'checkbox'

    return (
      <label htmlFor={inputId} className={rootClasses}>
        <span className="relative flex h-full items-center">
          <input
            id={inputId}
            ref={setRefs}
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            className="peer sr-only"
            aria-invalid={!!error || rest['aria-invalid']}
            aria-describedby={describedBy}
            checked={currentChecked}
            onChange={handleChange}
            {...rest}
          />
          <span className={controlClasses}>
            {type === 'checkbox' ? (
              showIndeterminate ? (
                <span aria-hidden="true" className="h-0.5 w-3 rounded-full bg-white" />
              ) : (
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className={`${checkIconSizeMap[size]} transition-opacity duration-150 ease-in-out ${currentChecked ? 'opacity-100' : 'opacity-0'}`}
                >
                  <polyline
                    points="3.5 8.5 6.5 11.5 12.5 5.5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  />
                </svg>
              )
            ) : (
              <span
                aria-hidden="true"
                className={`${radioIndicatorSize[size]} rounded-full bg-white transition-transform duration-150 ease-in-out ${currentChecked ? 'scale-100' : 'scale-0'}`}
              />
            )}
          </span>
        </span>

        {hasTextualContent ? (
          <span className="flex min-w-0 flex-col gap-1">
            {hasLabel ? (
              <span
                className={`${labelSizeMap[size]} font-medium leading-tight text-[var(--text-color)]`}
              >
                {labelContent}
              </span>
            ) : null}
            {hasDescription ? (
              <span className={`${descriptionSizeMap[size]} text-[var(--text-color-secondary)]`}>
                {description}
              </span>
            ) : null}
            {hasHelperText ? (
              <span id={helperTextId} className="text-xs text-[var(--text-color-secondary)]">
                {helperText}
              </span>
            ) : null}
            {hasError ? (
              <span id={errorId} className="text-xs text-red-500">
                {error}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
