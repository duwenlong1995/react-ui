import { useRef } from 'react'
import type { EChartsOption } from 'echarts'
import { useEcharts } from '@/hooks/useEcharts'

export default function Chart({
  option,
  style,
  className,
  ...props
}: {
  option: EChartsOption
} & React.HTMLAttributes<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null)
  useEcharts(containerRef as any, option)

  return (
    <div
      ref={containerRef}
      className={`chart-container${className ? ` ${className}` : ''}`}
      style={{
        height: style?.height ?? '400px',
        width: style?.width ?? '100%',
        ...style,
      }}
      {...props}
    />
  )
}
