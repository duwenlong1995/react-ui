import React, { forwardRef } from 'react'

type LayoutDirection = 'vertical' | 'horizontal'
type LayoutGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type LayoutAlign = 'start' | 'center' | 'end' | 'stretch'
type LayoutJustify = 'start' | 'center' | 'end' | 'between' | 'around'
type LayoutPadding = 'none' | 'sm' | 'md' | 'lg'

export interface FormLayout {
  direction?: LayoutDirection
  gap?: LayoutGap | string
  align?: LayoutAlign
  justify?: LayoutJustify
  fullWidth?: boolean
  padding?: LayoutPadding
}

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  layout?: FormLayout
  onSubmit?: (
    values: Record<string, FormDataEntryValue>,
    event: React.FormEvent<HTMLFormElement>,
  ) => void
  collectValues?: boolean
  nativeOnSubmit?: React.FormEventHandler<HTMLFormElement>
}

const gapClassMap: Record<LayoutGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

const alignClassMap: Record<LayoutAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const justifyClassMap: Record<LayoutJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
}

const paddingClassMap: Record<LayoutPadding, string> = {
  none: 'p-0',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
}

export const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const {
    layout = {},
    className = '',
    children,
    onSubmit,
    collectValues = true,
    nativeOnSubmit,
    style,
    ...rest
  } = props

  const {
    direction = 'vertical',
    gap = 'md',
    align = 'stretch',
    justify = 'start',
    fullWidth = false,
    padding = 'none',
  } = layout

  const directionClass =
    direction === 'horizontal' ? 'flex-col md:flex-row md:flex-wrap' : 'flex-col'

  const gapClass =
    typeof gap === 'string' && gap in gapClassMap ? gapClassMap[gap as LayoutGap] : ''
  const alignClass = alignClassMap[align]
  const justifyClass = justifyClassMap[justify]
  const paddingClass = paddingClassMap[padding]

  const formStyle = {
    ...style,
    ...(gapClass === '' && typeof gap === 'string' ? { gap } : {}),
  }

  const classes = [
    'flex',
    directionClass,
    alignClass,
    justifyClass,
    gapClass,
    paddingClass,
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (onSubmit && collectValues) {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const values: Record<string, FormDataEntryValue> = {}
      formData.forEach((value, key) => {
        values[key] = value
      })
      onSubmit(values, event)
    }

    nativeOnSubmit?.(event)
  }

  return (
    <form ref={ref} className={classes} style={formStyle} onSubmit={handleSubmit} {...rest}>
      {children}
    </form>
  )
})

Form.displayName = 'Form'
