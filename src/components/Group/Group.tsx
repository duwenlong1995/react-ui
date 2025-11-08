import React, { useCallback, useState } from 'react'
import { Checkbox, type CheckboxProps, type CheckboxSize, type CheckboxType } from '../Checkbox'

type Direction = 'vertical' | 'horizontal'
type GroupGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface GroupOption {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  helperText?: React.ReactNode
  error?: React.ReactNode
  disabled?: boolean
  indeterminate?: boolean
}

interface BaseGroupProps {
  name?: string
  options?: GroupOption[]
  direction?: Direction
  gap?: GroupGap
  className?: string
  optionClassName?: string
  children?: React.ReactNode
  size?: CheckboxSize
  disabled?: boolean
}

interface CheckboxGroupProps extends BaseGroupProps {
  type?: Extract<CheckboxType, 'checkbox'>
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[], event: React.ChangeEvent<HTMLInputElement>) => void
}

interface RadioGroupProps extends BaseGroupProps {
  type: Extract<CheckboxType, 'radio'>
  value?: string
  defaultValue?: string
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export type GroupProps = CheckboxGroupProps | RadioGroupProps

const gapClassMap: Record<Direction, Record<GroupGap, string>> = {
  vertical: {
    none: 'gap-y-0',
    xs: 'gap-y-1.5',
    sm: 'gap-y-2',
    md: 'gap-y-3',
    lg: 'gap-y-4',
    xl: 'gap-y-6',
  },
  horizontal: {
    none: 'gap-x-0',
    xs: 'gap-x-1.5',
    sm: 'gap-x-2',
    md: 'gap-x-3',
    lg: 'gap-x-4',
    xl: 'gap-x-6',
  },
}

const toArray = (value?: string | string[] | null) => {
  if (!value) return []
  return Array.isArray(value) ? value.map(String) : [String(value)]
}

export const Group: React.FC<GroupProps> = ({
  type = 'checkbox',
  name,
  options,
  direction = 'vertical',
  gap = 'md',
  className = '',
  optionClassName = '',
  children,
  size = 'md',
  disabled = false,
  ...rest
}) => {
  const isCheckbox = type === 'checkbox'
  const controlledValue = (rest as CheckboxGroupProps).value ?? (rest as RadioGroupProps).value
  const defaultValue =
    (rest as CheckboxGroupProps).defaultValue ?? (rest as RadioGroupProps).defaultValue

  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (controlledValue !== undefined) {
      return toArray(controlledValue as string | string[])
    }
    if (defaultValue !== undefined) {
      return toArray(defaultValue as string | string[])
    }
    return []
  })

  const currentValue =
    controlledValue !== undefined ? toArray(controlledValue as string | string[]) : internalValue

  const gapClass = gapClassMap[direction][gap]
  const containerClasses = [
    'flex',
    direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
    gapClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const value = String(event.target.value)
      let nextValues: string[]

      if (isCheckbox) {
        const exists = currentValue.includes(value)
        nextValues = exists
          ? currentValue.filter((item) => item !== value)
          : [...currentValue, value]
      } else {
        nextValues = [value]
      }

      if (controlledValue === undefined) {
        setInternalValue(nextValues)
      }

      if (isCheckbox) {
        const callback = (rest as CheckboxGroupProps).onChange
        callback?.(nextValues, event)
      } else {
        const callback = (rest as RadioGroupProps).onChange
        callback?.(nextValues[0] ?? '', event)
      }
    },
    [controlledValue, currentValue, isCheckbox, rest],
  )

  const renderOption = (option: GroupOption) => (
    <Checkbox
      key={option.value}
      type={type as CheckboxType}
      name={name}
      size={size}
      value={option.value}
      label={option.label}
      description={option.description}
      helperText={option.helperText}
      error={option.error}
      indeterminate={option.indeterminate}
      disabled={disabled || option.disabled}
      checked={currentValue.includes(option.value)}
      onChange={handleChange}
      className={optionClassName}
    />
  )

  const renderedChildren =
    options && options.length > 0
      ? options.map(renderOption)
      : React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return child
          }

          const childValue = child.props.value ?? ''
          const valueString = String(childValue)
          const originalOnChange = child.props.onChange as
            | React.ChangeEventHandler<HTMLInputElement>
            | undefined

          const mergedOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
            handleChange(event)
            originalOnChange?.(event)
          }

          return React.cloneElement(child as React.ReactElement<CheckboxProps>, {
            type,
            name,
            size: child.props.size ?? size,
            disabled: disabled || child.props.disabled,
            checked: currentValue.includes(valueString),
            onChange: mergedOnChange,
            className: [child.props.className, optionClassName].filter(Boolean).join(' '),
          })
        })

  return <div className={containerClasses}>{renderedChildren}</div>
}
