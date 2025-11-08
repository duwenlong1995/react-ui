import React from 'react'
import BaseChart from './BaseChart'
import type { GaugeChartProps } from './types'

const GaugeChart: React.FC<GaugeChartProps> = ({
  data,
  config,
  theme = 'auto',
  min,
  max,
  splitNumber,
  startAngle,
  endAngle,
  clockwise,
  ...props
}) => {
  const mergedSeries: Record<string, any> = {
    ...(config?.series?.[0] ?? {}),
    type: 'gauge',
  }

  if (min !== undefined) mergedSeries.min = min
  if (max !== undefined) mergedSeries.max = max
  if (splitNumber !== undefined) mergedSeries.splitNumber = splitNumber
  if (startAngle !== undefined) mergedSeries.startAngle = startAngle
  if (endAngle !== undefined) mergedSeries.endAngle = endAngle
  if (clockwise !== undefined) mergedSeries.clockwise = clockwise

  const mergedConfig = {
    ...config,
    series: [mergedSeries],
  }

  return (
    <BaseChart
      chartType="gauge"
      data={data}
      config={mergedConfig as any}
      theme={theme}
      {...props}
    />
  )
}

export default GaugeChart
