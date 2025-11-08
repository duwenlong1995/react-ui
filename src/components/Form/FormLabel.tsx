import React, { ReactElement, ReactNode, cloneElement, useId } from 'react'

type FieldOrientation = 'vertical' | 'horizontal'
type FieldSpacing = 'sm' | 'md' | 'lg'

const spacingMap: Record<FieldSpacing, string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
}

const horizontalSpacingMap: Record<FieldSpacing, string> = {
  sm: 'md:gap-2',
  md: 'md:gap-3',
  lg: 'md:gap-4',
}

export interface FormLabelProps {
  className?: string
  label?: ReactNode
  htmlFor?: string
  name?: string
  orientation?: FieldOrientation
  spacing?: FieldSpacing
  labelWidth?: string
  helpText?: ReactNode
  error?: ReactNode
  required?: boolean
  children: ReactElement
}

export const FormLabel = ({
  className = '',
  label,
  htmlFor,
  name,
  orientation = 'vertical',
  spacing = 'md',
  labelWidth,
  helpText,
  error,
  required = false,
  children,
}: FormLabelProps) => {
  const generatedId = useId()
  const controlId = htmlFor ?? children.props.id ?? `${generatedId}-field`

  const helpTextId = helpText ? `${controlId}-help` : undefined
  const errorId = error ? `${controlId}-error` : undefined
  const describedBy =
    [helpTextId, errorId, children.props['aria-describedby']].filter(Boolean).join(' ') || undefined

  const clonedChild = cloneElement(children, {
    id: controlId,
    name: name ?? children.props.name,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : children.props['aria-invalid'],
    className: ['w-full', children.props.className].filter(Boolean).join(' '),
  })

  const isHorizontal = orientation === 'horizontal'
  const containerClasses = [
    'flex',
    isHorizontal ? 'flex-col md:flex-row md:items-center' : 'flex-col',
    spacingMap[spacing],
    isHorizontal ? horizontalSpacingMap[spacing] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const labelClasses = [
    'text-sm font-medium text-[var(--text-color)]',
    isHorizontal ? (labelWidth ?? 'md:w-28') : 'w-full',
  ]
    .filter(Boolean)
    .join(' ')

  const controlWrapperClasses = ['flex-1 w-full', isHorizontal ? 'mt-2 md:mt-0' : 'mt-2']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={controlId} className={labelClasses}>
          <span className="flex items-center gap-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </span>
        </label>
      )}

      <div className={controlWrapperClasses}>
        {clonedChild}
        {(helpText || error) && (
          <div
            id={error ? errorId : helpTextId}
            className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-[var(--text-color-secondary)]'}`}
          >
            {error ?? helpText}
          </div>
        )}
      </div>
    </div>
  )
}

FormLabel.displayName = 'FormLabel'
