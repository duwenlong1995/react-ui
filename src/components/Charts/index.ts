// 导出所有图表组件
export { default as BaseChart } from './BaseChart'
export { default as LineChart } from './LineChart'
export { default as BarChart } from './BarChart'
export { default as PieChart } from './PieChart'
export { default as ScatterChart } from './ScatterChart'
export { default as RadarChart } from './RadarChart'
export { default as GaugeChart } from './GaugeChart'
export { default as FunnelChart } from './FunnelChart'
export { default as SankeyChart } from './SankeyChart'

// 导出类型
export type {
  ChartType,
  ChartTheme,
  ChartDataItem,
  ChartSeries,
  ChartConfig,
  BaseChartProps,
  LineChartProps,
  BarChartProps,
  PieChartProps,
  ScatterChartProps,
  RadarChartProps,
  GaugeChartProps,
  FunnelChartProps,
  SankeyChartProps,
} from './types'

// 导出工具函数
export {
  DEFAULT_COLORS,
  APPLE_COLORS,
  TABLEAU_COLORS,
  THEME_CONFIG,
  createBaseConfig,
  createXAxisConfig,
  createYAxisConfig,
  processChartData,
  createLineChartOption,
  createBarChartOption,
  createPieChartOption,
  createScatterChartOption,
  createRadarChartOption,
  createGaugeChartOption,
  createFunnelChartOption,
  createSankeyChartOption,
  getChartOption,
} from './utils'

// 导出预设配置
export {
  CHART_PRESETS,
  SAMPLE_DATA,
  CHART_CONFIGS,
  getPresetConfig,
  getPresetData,
  getChartConfig,
} from './presets'
