import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import type { EChartsType } from 'echarts/core'
import type { EChartsOption } from 'echarts'
import {
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
  GaugeChart,
  FunnelChart,
  SankeyChart,
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 按需注册 ECharts 组件（ECharts v6 需要）
echarts.use([
  // charts
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
  GaugeChart,
  FunnelChart,
  SankeyChart,
  // components
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  // renderer
  CanvasRenderer,
])

export function useEcharts(containerRef: React.RefObject<HTMLDivElement>, option: EChartsOption) {
  const chartRef = useRef<EChartsType | null>(null)

  // 初始化与销毁仅在容器可用时执行
  useEffect(() => {
    if (!containerRef.current) return

    if (!chartRef.current) {
      chartRef.current = echarts.init(containerRef.current)
    }

    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize()
      }
    }

    window.addEventListener('resize', handleResize)

    // 首次初始化后，下一帧触发一次 resize，避免初始布局尺寸为 0 的情况
    const rafId = window.requestAnimationFrame(() => {
      handleResize()
    })

    // 监听容器尺寸变化，自动触发 resize
    const ro = new ResizeObserver(() => handleResize())
    ro.observe(containerRef.current)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.cancelAnimationFrame(rafId)
      ro.disconnect()
      if (chartRef.current) {
        chartRef.current.dispose()
        chartRef.current = null
      }
    }
    // 仅在容器 ref 变化时重新初始化
  }, [containerRef])

  // 配置项变更时仅 setOption，不销毁实例
  useEffect(() => {
    if (chartRef.current && option) {
      chartRef.current.setOption(option, true)
      // 配置更新后确保根据容器当前尺寸渲染
      chartRef.current.resize()
    }
  }, [option])

  return chartRef.current
}
