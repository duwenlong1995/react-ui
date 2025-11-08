import React from 'react'
import BaseChart from './BaseChart'
import type { FunnelChartProps } from './types'

const FunnelChart: React.FC<FunnelChartProps> = ({
  data,
  config,
  theme = 'auto',
  sort = 'descending',
  gap = 2,
  funnelAlign = 'center',
  ...props
}) => {
  const mergedSeries: Record<string, any> = {
    ...(config?.series?.[0] ?? {}),
    type: 'funnel',
    data,
  }

  if (sort) mergedSeries.sort = sort
  if (gap !== undefined) mergedSeries.gap = gap
  if (funnelAlign) mergedSeries.funnelAlign = funnelAlign

  const mergedConfig = {
    ...config,
    series: [mergedSeries],
  }

  return (
    <BaseChart
      chartType="funnel"
      data={data}
      config={mergedConfig as any}
      theme={theme}
      {...props}
    />
  )
}

export default FunnelChart
