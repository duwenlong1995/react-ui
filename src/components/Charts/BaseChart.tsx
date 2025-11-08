import React, { useEffect, useRef, useMemo } from 'react'
import { useEcharts } from '@/hooks/useEcharts'
import type { BaseChartProps, ChartType } from './types'
import { getChartOption } from './utils'

// 基础图表组件
export interface BaseChartComponentProps extends BaseChartProps {
  chartType: ChartType
}

const BaseChart: React.FC<BaseChartComponentProps> = ({
  data,
  config,
  theme = 'auto',
  loading = false,
  height = '400px',
  width = '100%',
  className = '',
  chartType,
  onChartReady,
  onDataZoom,
  onLegendSelectChanged,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // 生成图表配置
  const option = useMemo(() => {
    return getChartOption(chartType, data as any, config, theme)
  }, [chartType, data, config, theme])

  // 使用ECharts Hook
  const chartInstance = useEcharts(containerRef as any, option)

  // 图表准备就绪回调
  useEffect(() => {
    if (chartInstance && onChartReady) {
      onChartReady(chartInstance)
    }
  }, [chartInstance, onChartReady])

  // 数据缩放事件
  useEffect(() => {
    if (chartInstance && onDataZoom) {
      chartInstance.on('dataZoom', onDataZoom)
      return () => {
        chartInstance.off('dataZoom', onDataZoom)
      }
    }
  }, [chartInstance, onDataZoom])

  // 图例选择变化事件
  useEffect(() => {
    if (chartInstance && onLegendSelectChanged) {
      chartInstance.on('legendselectchanged', onLegendSelectChanged)
      return () => {
        chartInstance.off('legendselectchanged', onLegendSelectChanged)
      }
    }
  }, [chartInstance, onLegendSelectChanged])

  return (
    <div
      ref={containerRef}
      className={`chart-container ${className}`}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
        position: 'relative',
      }}
      {...props}
    >
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '20px',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          加载中...
        </div>
      )}
    </div>
  )
}

export default BaseChart
