import React, { memo, useMemo } from 'react'
import { iconMap } from './data'
import { renderName } from './utils'

export interface IconProps {
  className?: string
  iconName?: string
  color?: string
  width?: string | number
  height?: string | number
  onClick?: () => void
  style?: React.CSSProperties
  svg?: React.ReactElement
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export type IconSize = IconProps['size']
export type IconColor = string
type IconModule = React.ComponentType<React.SVGProps<SVGSVGElement>> | string

export const Icon: React.FC<IconProps> = memo((props) => {
  const { className, iconName, color, width, height, onClick, style, svg, size } = props

  // Pre-compute icon data for better performance
  const iconData = React.useMemo(
    () =>
      Object.keys(iconMap).map((key) => ({
        name: key,
        DOM: (size: { width: string; height: string }, color: string) => {
          const mod = iconMap[key as keyof typeof iconMap] as IconModule
          if (typeof mod === 'string') {
            return (
              <img
                key={key}
                src={mod}
                width={Number(size.width)}
                height={Number(size.height)}
                alt={key}
                className="inline-block select-none"
                loading="lazy"
              />
            )
          }
          const Comp = mod as React.ComponentType<React.SVGProps<SVGSVGElement>>
          return (
            <Comp
              key={key}
              width={size.width}
              height={size.height}
              fill={color}
              className="inline-block select-none"
            />
          )
        },
      })),
    [],
  )

  const sizeMap = {
    xs: { width: '14', height: '14' },
    sm: { width: '14', height: '14' },
    md: { width: '16', height: '16' },
    lg: { width: '18', height: '18' },
    xl: { width: '20', height: '20' },
  }

  const iconSize = size ? sizeMap[size] : { width: width || '16', height: height || '16' }
  const finalSize = useMemo(
    () => ({
      width: String(iconSize.width),
      height: String(iconSize.height),
    }),
    [iconSize.width, iconSize.height],
  )

  const defaultColor = useMemo(() => color || 'currentColor', [color])

  return (
    <span
      className={renderName('inline-flex items-center justify-center', className)}
      onClick={onClick}
      style={style}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {svg
        ? svg
        : iconData.find((item) => item.name === iconName)?.DOM(finalSize, defaultColor) || null}
    </span>
  )
})
Icon.displayName = 'Icon'
