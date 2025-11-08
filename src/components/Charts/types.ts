// import type { EChartsOption } from 'echarts';

// 图表类型
export type ChartType = 'line' | 'bar' | 'pie' | 'scatter' | 'radar' | 'gauge' | 'funnel' | 'sankey'

// 图表主题
export type ChartTheme =
  | 'light'
  | 'dark'
  | 'auto'
  | 'apple'
  | 'appleDark'
  | 'tableau'
  | 'tableauDark'

// 图表数据项
export interface ChartDataItem {
  name: string
  value: number | number[]
  [key: string]: any
}

// 图表系列配置
export interface ChartSeries {
  name: string
  type: ChartType
  data: ChartDataItem[] | number[]
  smooth?: boolean
  areaStyle?: boolean | object
  stack?: string
  [key: string]: any
}

// 图表配置选项
export interface ChartConfig {
  title?: {
    text: string
    subtext?: string
    left?: string | number
    top?: string | number
    textStyle?: {
      fontSize?: number
      fontWeight?: string
      color?: string
    }
  }
  dataZoom?: any
  tooltip?: {
    trigger?: 'axis' | 'item'
    formatter?: string | Function
  }
  legend?: {
    data?: string[]
    position?: 'top' | 'bottom' | 'left' | 'right'
    orient?: 'horizontal' | 'vertical'
    left?: string | number
    top?: string | number
  }
  grid?: {
    left?: string | number
    right?: string | number
    top?: string | number
    bottom?: string | number
    containLabel?: boolean
  }
  xAxis?: {
    type?: 'category' | 'value' | 'time' | 'log'
    data?: any[]
    name?: string
    nameLocation?: 'start' | 'middle' | 'end'
    min?: number
    max?: number
  }
  yAxis?: {
    type?: 'category' | 'value' | 'time' | 'log'
    name?: string
    nameLocation?: 'start' | 'middle' | 'end'
    min?: number
    max?: number
    axisLabel?: {
      formatter?: string | Function
    }
  }
  series?: ChartSeries[]
  color?: string[]
  backgroundColor?: string
  animation?: boolean
  animationDuration?: number
}

// 图表组件Props
export interface BaseChartProps {
  data: ChartDataItem[] | number[] | number | Array<Record<string, any>>
  config?: ChartConfig
  theme?: ChartTheme
  loading?: boolean
  height?: string | number
  width?: string | number
  className?: string
  onChartReady?: (chart: any) => void
  onDataZoom?: (params: any) => void
  onLegendSelectChanged?: (params: any) => void
}

// 折线图Props
export interface LineChartProps extends BaseChartProps {
  smooth?: boolean
  areaStyle?: boolean
  stack?: string
  step?: boolean | 'start' | 'middle' | 'end'
}

// 柱状图Props
export interface BarChartProps extends BaseChartProps {
  horizontal?: boolean
  stack?: string
  barWidth?: string | number
  barMaxWidth?: string | number
}

// 饼图Props
export interface PieChartProps extends BaseChartProps {
  radius?: string | number | [string | number, string | number]
  center?: [string | number, string | number]
  roseType?: boolean | 'radius' | 'area'
  labelLine?: {
    show?: boolean
    length?: number
    length2?: number
  }
}

// 散点图Props
export interface ScatterChartProps extends BaseChartProps {
  symbolSize?: number | Function
  symbol?: string
  large?: boolean
  largeThreshold?: number
}

// 雷达图Props
export interface RadarChartProps extends BaseChartProps {
  indicator: Array<{
    name: string
    max: number
    min?: number
  }>
  shape?: 'polygon' | 'circle'
}

// 仪表盘Props
export interface GaugeChartProps extends Omit<BaseChartProps, 'data'> {
  data: number
  min?: number
  max?: number
  splitNumber?: number
  startAngle?: number
  endAngle?: number
  clockwise?: boolean
}

// 漏斗图Props
export interface FunnelChartProps extends BaseChartProps {
  sort?: 'ascending' | 'descending' | 'none'
  gap?: number
  funnelAlign?: 'left' | 'center' | 'right'
}

// 桑基图Props
export interface SankeyChartProps extends Omit<BaseChartProps, 'data'> {
  data: Array<Record<string, any>>
  source: string
  target: string
  value: string
  nodeWidth?: number
  nodeGap?: number
  layoutIterations?: number
}
