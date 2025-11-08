import type { EChartsOption } from 'echarts'
import type { ChartConfig, ChartType, ChartTheme, ChartDataItem } from './types'

// 获取CSS变量值
const getCSSVariable = (variable: string): string => {
  if (typeof window === 'undefined') return '#ffffff'
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  return value || '#ffffff'
}

// 默认颜色配置
export const DEFAULT_COLORS = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
  '#5d7092',
]

// 苹果风格颜色配置
export const APPLE_COLORS = [
  '#007AFF', // 蓝色
  '#34C759', // 绿色
  '#FF9500', // 橙色
  '#FF3B30', // 红色
  '#AF52DE', // 紫色
  '#FF2D55', // 粉色
  '#5AC8FA', // 青色
  '#FFCC00', // 黄色
  '#FF6482', // 珊瑚色
  '#30D158', // 薄荷绿
]

// Tableau 10 专业数据可视化配色方案
export const TABLEAU_COLORS = [
  '#4E79A7', // 蓝色
  '#F28E2B', // 橙色
  '#E15759', // 红色
  '#76B7B2', // 青色
  '#59A14F', // 绿色
  '#EDC948', // 黄色
  '#B07AA1', // 紫色
  '#FF9DA7', // 粉色
  '#9C755F', // 棕色
  '#BAB0AC', // 灰色
]

// 默认主题配置
export const THEME_CONFIG = {
  light: {
    backgroundColor: 'transparent',
    textStyle: {
      color: getCSSVariable('--text-primary'),
    },
  },
  dark: {
    backgroundColor: 'transparent',
    textStyle: {
      color: getCSSVariable('--text-primary'),
    },
  },
  apple: {
    backgroundColor: 'transparent',
    textStyle: {
      color: '#1d1d1f',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    color: TABLEAU_COLORS,
  },
  appleDark: {
    backgroundColor: 'transparent',
    textStyle: {
      color: '#f5f5f7',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    color: TABLEAU_COLORS,
  },
  tableau: {
    backgroundColor: 'transparent',
    textStyle: {
      color: '#333333',
      fontFamily:
        '"Tableau Book", "Salesforce Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    color: TABLEAU_COLORS,
  },
  tableauDark: {
    backgroundColor: 'transparent',
    textStyle: {
      color: '#E8E8E8',
      fontFamily:
        '"Tableau Book", "Salesforce Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    color: TABLEAU_COLORS, // Tableau 颜色在深色背景下也很清晰
  },
}

// 创建基础配置
export function createBaseConfig(
  config?: ChartConfig,
  theme: ChartTheme = 'auto',
): Partial<EChartsOption> {
  const whiteColor = getCSSVariable('--text-primary')

  // 确定使用的主题和颜色
  let colors = config?.color ?? DEFAULT_COLORS

  // 苹果风格主题处理
  if (theme === ('apple' as ChartTheme) || theme === ('appleDark' as ChartTheme)) {
    colors =
      theme === 'apple'
        ? APPLE_COLORS
        : [
            '#0A84FF',
            '#30D158',
            '#FF9F0A',
            '#FF453A',
            '#BF5AF2',
            '#FF375F',
            '#64D2FF',
            '#FFD60A',
            '#FF6482',
            '#32D74B',
          ]
  }

  // Tableau 主题处理
  if (theme === ('tableau' as ChartTheme) || theme === ('tableauDark' as ChartTheme)) {
    colors = TABLEAU_COLORS
  }

  const baseConfig: Partial<EChartsOption> = {
    animation: config?.animation ?? true,
    animationDuration: config?.animationDuration ?? 1000,
    color: colors,
    backgroundColor: config?.backgroundColor ?? 'transparent',
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      ...config?.grid,
    },
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor:
        theme === 'apple'
          ? 'rgba(255, 255, 255, 0.95)'
          : theme === 'appleDark'
            ? 'rgba(30, 30, 30, 0.95)'
            : theme === 'tableau'
              ? 'rgba(255, 255, 255, 0.98)'
              : theme === 'tableauDark'
                ? 'rgba(31, 36, 46, 0.98)'
                : 'rgba(0, 0, 0, 0.8)',
      borderColor:
        theme === 'apple'
          ? 'rgba(0, 0, 0, 0.05)'
          : theme === 'appleDark'
            ? 'rgba(255, 255, 255, 0.1)'
            : theme === 'tableau' || theme === 'tableauDark'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'transparent',
      borderWidth:
        theme === 'apple' || theme === 'appleDark' || theme === 'tableau' || theme === 'tableauDark'
          ? 1
          : 0,
      textStyle: {
        color:
          theme === 'apple'
            ? '#1d1d1f'
            : theme === 'appleDark'
              ? '#f5f5f7'
              : theme === 'tableau'
                ? '#333333'
                : theme === 'tableauDark'
                  ? '#E8E8E8'
                  : whiteColor,
        fontSize:
          theme === 'apple' ||
          theme === 'appleDark' ||
          theme === 'tableau' ||
          theme === 'tableauDark'
            ? 13
            : undefined,
        fontFamily:
          theme === 'apple' || theme === 'appleDark'
            ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            : theme === 'tableau' || theme === 'tableauDark'
              ? '"Tableau Book", "Salesforce Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              : undefined,
      },
      padding:
        theme === 'apple' || theme === 'appleDark' || theme === 'tableau' || theme === 'tableauDark'
          ? [10, 15]
          : undefined,
      extraCssText:
        theme === 'apple' || theme === 'appleDark' || theme === 'tableau' || theme === 'tableauDark'
          ? `box-shadow: 0 2px 8px ${theme === 'apple' || theme === 'tableau' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.3)'}; border-radius: ${theme === 'tableau' || theme === 'tableauDark' ? '4px' : '10px'};`
          : undefined,
      ...config?.tooltip,
    } as any,
    legend: {
      top: 'top',
      left: 'center',
      textStyle: {
        color:
          theme === 'apple'
            ? '#1d1d1f'
            : theme === 'appleDark'
              ? '#f5f5f7'
              : theme === 'tableau'
                ? '#333333'
                : theme === 'tableauDark'
                  ? '#E8E8E8'
                  : whiteColor,
        fontSize:
          theme === 'apple' ||
          theme === 'appleDark' ||
          theme === 'tableau' ||
          theme === 'tableauDark'
            ? 13
            : undefined,
        fontFamily:
          theme === 'apple' || theme === 'appleDark'
            ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            : theme === 'tableau' || theme === 'tableauDark'
              ? '"Tableau Book", "Salesforce Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              : undefined,
      },
      ...config?.legend,
    },
    title: {
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold' as const,
        color:
          theme === 'apple'
            ? '#1d1d1f'
            : theme === 'appleDark'
              ? '#f5f5f7'
              : theme === 'tableau'
                ? '#333333'
                : theme === 'tableauDark'
                  ? '#E8E8E8'
                  : whiteColor,
        fontFamily:
          theme === 'apple' || theme === 'appleDark'
            ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            : theme === 'tableau' || theme === 'tableauDark'
              ? '"Tableau Book", "Salesforce Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              : undefined,
      },
      ...config?.title,
    } as any,
  }

  // 应用主题
  if (theme === 'apple') {
    Object.assign(baseConfig, THEME_CONFIG.apple)
  } else if (theme === 'appleDark') {
    Object.assign(baseConfig, THEME_CONFIG.appleDark)
  } else if (theme === 'tableau') {
    Object.assign(baseConfig, THEME_CONFIG.tableau)
  } else if (theme === 'tableauDark') {
    Object.assign(baseConfig, THEME_CONFIG.tableauDark)
  } else if (
    theme === 'dark' ||
    (theme === 'auto' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    Object.assign(baseConfig, THEME_CONFIG.dark)
  } else {
    Object.assign(baseConfig, THEME_CONFIG.light)
  }

  return baseConfig
}

// 创建X轴配置
export function createXAxisConfig(
  type: 'category' | 'value' | 'time' | 'log' = 'category',
  data?: any[],
  config?: ChartConfig['xAxis'],
  theme?: ChartTheme,
): any {
  const whiteColor = getCSSVariable('--text-primary')
  const isAppleTheme = theme === 'apple' || theme === 'appleDark'
  const isTableauTheme = theme === 'tableau' || theme === 'tableauDark'

  return {
    type,
    data,
    boundaryGap: type === 'category',
    axisLine: {
      show: true,
      lineStyle: {
        color: isAppleTheme
          ? theme === 'apple'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.15)'
          : isTableauTheme
            ? theme === 'tableau'
              ? 'rgba(0, 0, 0, 0.15)'
              : 'rgba(255, 255, 255, 0.2)'
            : whiteColor,
        width: isAppleTheme || isTableauTheme ? 1 : undefined,
      },
    },
    axisTick: {
      show: !isAppleTheme && !isTableauTheme,
      lineStyle: {
        color: whiteColor,
      },
    },
    axisLabel: {
      show: true,
      color: isAppleTheme
        ? '#86868b'
        : isTableauTheme
          ? theme === 'tableau'
            ? '#666666'
            : '#B0B0B0'
          : whiteColor,
      fontSize: isAppleTheme || isTableauTheme ? 12 : undefined,
      fontFamily: isAppleTheme
        ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        : isTableauTheme
          ? '"Tableau Book", "Salesforce Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          : undefined,
      margin: isAppleTheme || isTableauTheme ? 10 : undefined,
    },
    splitLine: {
      show: !isAppleTheme && !isTableauTheme,
    },
    ...config,
  }
}

// 创建Y轴配置
export function createYAxisConfig(
  type: 'category' | 'value' | 'time' | 'log' = 'value',
  config?: ChartConfig['yAxis'],
  theme?: ChartTheme,
): any {
  const whiteColor = getCSSVariable('--text-primary')
  const isAppleTheme = theme === 'apple' || theme === 'appleDark'
  const isTableauTheme = theme === 'tableau' || theme === 'tableauDark'

  return {
    type,
    axisLine: {
      show: !isAppleTheme && !isTableauTheme,
      lineStyle: {
        color: whiteColor,
      },
    },
    axisTick: {
      show: !isAppleTheme && !isTableauTheme,
      lineStyle: {
        color: whiteColor,
      },
    },
    axisLabel: {
      show: true,
      color: isAppleTheme
        ? '#86868b'
        : isTableauTheme
          ? theme === 'tableau'
            ? '#666666'
            : '#B0B0B0'
          : whiteColor,
      fontSize: isAppleTheme || isTableauTheme ? 12 : undefined,
      fontFamily: isAppleTheme
        ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        : isTableauTheme
          ? '"Tableau Book", "Salesforce Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          : undefined,
      margin: isAppleTheme || isTableauTheme ? 10 : undefined,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: isAppleTheme || isTableauTheme ? 'solid' : 'dashed',
        color: isAppleTheme
          ? theme === 'apple'
            ? 'rgba(0, 0, 0, 0.06)'
            : 'rgba(255, 255, 255, 0.08)'
          : isTableauTheme
            ? theme === 'tableau'
              ? 'rgba(0, 0, 0, 0.08)'
              : 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.2)',
        width: isAppleTheme || isTableauTheme ? 1 : undefined,
      },
    },
    ...config,
  }
}

// 处理数据格式
export function processChartData(
  data: ChartDataItem[] | number[],
  _type?: ChartType,
): { categories: any[]; series: any[] } {
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'number') {
    // 数字数组
    return {
      categories: data.map((_, index) => index.toString()),
      series: data,
    }
  }

  const chartData = data as ChartDataItem[]
  const categories = chartData.map((item) => item.name)
  const series = chartData.map((item) => item.value)

  return { categories, series }
}

// 创建折线图配置
export function createLineChartOption(
  data: any,
  config?: ChartConfig,
  theme: ChartTheme = 'auto',
): EChartsOption {
  const { categories, series } = processChartData(data, 'line')
  const baseConfig = createBaseConfig(config, theme)
  const isAppleTheme = theme === 'apple' || theme === 'appleDark'
  const isTableauTheme = theme === 'tableau' || theme === 'tableauDark'

  // 判断数据量，用于性能优化
  const dataLength = Array.isArray(series) ? series.length : 0
  const isLargeData = dataLength > 100 // 数据量大于100时启用优化

  return {
    ...baseConfig,
    // 性能优化：大数据集时启用懒加载
    ...(isLargeData && {
      progressive: 500, // 渐进式渲染阈值
      progressiveThreshold: 1000, // 数据量超过1000时启用渐进式渲染
    }),
    xAxis: createXAxisConfig('category', categories, config?.xAxis, theme),
    yAxis: createYAxisConfig('value', config?.yAxis, theme),
    series: [
      {
        name: config?.legend?.data?.[0] || '数据',
        type: 'line',
        data: series,
        smooth: true,
        // 性能优化：隐藏折点，只在 hover 时显示
        symbol: 'none',
        showSymbol: false,
        // 线条样式
        lineStyle: {
          width: isAppleTheme ? 3 : isTableauTheme ? 2.5 : 2,
          cap: isAppleTheme || isTableauTheme ? 'round' : undefined,
          join: isAppleTheme || isTableauTheme ? 'round' : undefined,
        },
        // hover 时显示折点和高亮效果
        emphasis: {
          focus: 'series',
          scale: true,
          itemStyle: {
            borderWidth: 3,
            borderColor: '#fff',
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)',
          },
        } as any,
        // 性能优化：数据采样，大数据集时启用
        sampling: isLargeData ? 'lttb' : undefined, // LTTB 采样算法，保留视觉特征
        // 性能优化：关闭不必要的动画
        ...(isLargeData && {
          animation: false,
          animationThreshold: 1000,
        }),
      },
    ],
  }
}

// 创建柱状图配置
export function createBarChartOption(
  data: any,
  config?: ChartConfig,
  theme: ChartTheme = 'auto',
): EChartsOption {
  const { categories, series } = processChartData(data, 'bar')
  const baseConfig = createBaseConfig(config, theme)
  const isAppleTheme = theme === 'apple' || theme === 'appleDark'
  const isTableauTheme = theme === 'tableau' || theme === 'tableauDark'

  return {
    ...baseConfig,
    xAxis: createXAxisConfig('category', categories, config?.xAxis, theme),
    yAxis: createYAxisConfig('value', config?.yAxis, theme),
    series: [
      {
        name: config?.legend?.data?.[0] || '数据',
        type: 'bar',
        data: series,
        barWidth: '60%',
        itemStyle: {
          borderRadius: isAppleTheme ? [8, 8, 0, 0] : isTableauTheme ? [2, 2, 0, 0] : [4, 4, 0, 0],
        },
        emphasis:
          isAppleTheme || isTableauTheme
            ? ({
                focus: 'series',
              } as any)
            : undefined,
      },
    ],
  }
}

// 创建饼图配置
export function createPieChartOption(
  data: ChartDataItem[],
  config?: ChartConfig,
  theme: ChartTheme = 'auto',
): EChartsOption {
  const baseConfig = createBaseConfig(config, theme)
  const whiteColor = getCSSVariable('--text-primary')

  return {
    ...baseConfig,
    series: [
      {
        name: config?.legend?.data?.[0] || '数据',
        type: 'pie',
        data: data,
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {c} ({d}%)',
          color: whiteColor,
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: whiteColor,
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold',
            color: whiteColor,
          },
        },
      },
    ],
  }
}

// 创建散点图配置
export function createScatterChartOption(
  data: ChartDataItem[],
  config?: ChartConfig,
  theme: ChartTheme = 'auto',
): EChartsOption {
  const baseConfig = createBaseConfig(config, theme)
  const isAppleTheme = theme === 'apple' || theme === 'appleDark'
  const isTableauTheme = theme === 'tableau' || theme === 'tableauDark'

  return {
    ...baseConfig,
    xAxis: createXAxisConfig('value', undefined, config?.xAxis, theme),
    yAxis: createYAxisConfig('value', config?.yAxis, theme),
    series: [
      {
        name: config?.legend?.data?.[0] || '数据',
        type: 'scatter',
        data: data.map((item) => [Number(item.value), item.name]) as any,
        symbolSize: isAppleTheme ? 10 : isTableauTheme ? 9 : 8,
        itemStyle: {
          opacity: isAppleTheme || isTableauTheme ? 0.9 : 0.8,
        },
        emphasis:
          isAppleTheme || isTableauTheme
            ? ({
                focus: 'item',
              } as any)
            : undefined,
      },
    ] as any,
  }
}

// 创建雷达图配置
export function createRadarChartOption(
  data: ChartDataItem[],
  config?: ChartConfig,
  theme: ChartTheme = 'auto',
): EChartsOption {
  const baseConfig = createBaseConfig(config, theme)
  const whiteColor = getCSSVariable('--text-primary')
  const radarConfig = (config as any)?.radar ?? {}
  const indicator: Array<{ name: string; max: number; min?: number }> = radarConfig.indicator ?? []

  return {
    ...baseConfig,
    radar: {
      indicator,
      shape: radarConfig.shape ?? 'polygon',
      splitNumber: 5,
      splitArea: {
        areaStyle: {
          color: ['rgba(250, 250, 250, 0.3)', 'rgba(200, 200, 200, 0.3)'],
        },
      },
      axisName: {
        color: whiteColor,
      },
      ...radarConfig,
    } as any,
    series: [
      {
        name: config?.legend?.data?.[0] || '数据',
        type: 'radar',
        data: data as any,
      },
    ] as any,
  }
}

// 创建仪表盘配置
export function createGaugeChartOption(
  data: number,
  config?: ChartConfig,
  theme: ChartTheme = 'auto',
): EChartsOption {
  const baseConfig = createBaseConfig(config, theme)
  const whiteColor = getCSSVariable('--text-primary')
  const seriesConfig = (config?.series?.[0] as any) ?? {}

  const gaugeSeriesDefaults = {
    name: config?.legend?.data?.[0] || '数据',
    type: 'gauge',
    data: [{ value: data }],
    min: 0,
    max: 100,
    splitNumber: 10,
    radius: '80%',
    axisLine: {
      lineStyle: {
        width: 6,
        color: [
          [0.3, '#67e0e3'],
          [0.7, '#37a2da'],
          [1, '#fd666d'],
        ],
      },
    },
    pointer: {
      itemStyle: {
        color: 'auto',
      },
    },
    axisTick: {
      distance: -30,
      splitNumber: 5,
      lineStyle: {
        width: 2,
        color: whiteColor,
      },
    },
    splitLine: {
      distance: -30,
      length: 30,
      lineStyle: {
        width: 4,
        color: whiteColor,
      },
    },
    axisLabel: {
      color: whiteColor,
      distance: 40,
      fontSize: 12,
    },
    detail: {
      valueAnimation: true,
      formatter: '{value}%',
      color: whiteColor,
    },
    clockwise: true,
  } as Record<string, any>

  const gaugeSeries: Record<string, any> = {
    ...gaugeSeriesDefaults,
    ...seriesConfig,
    name: seriesConfig.name ?? gaugeSeriesDefaults.name,
    data: seriesConfig.data ?? gaugeSeriesDefaults.data,
    min: seriesConfig.min ?? gaugeSeriesDefaults.min,
    max: seriesConfig.max ?? gaugeSeriesDefaults.max,
    splitNumber: seriesConfig.splitNumber ?? gaugeSeriesDefaults.splitNumber,
    radius: seriesConfig.radius ?? gaugeSeriesDefaults.radius,
    axisLine: seriesConfig.axisLine ?? gaugeSeriesDefaults.axisLine,
    pointer: seriesConfig.pointer ?? gaugeSeriesDefaults.pointer,
    axisTick: seriesConfig.axisTick ?? gaugeSeriesDefaults.axisTick,
    splitLine: seriesConfig.splitLine ?? gaugeSeriesDefaults.splitLine,
    axisLabel: seriesConfig.axisLabel ?? gaugeSeriesDefaults.axisLabel,
    detail: seriesConfig.detail ?? gaugeSeriesDefaults.detail,
    clockwise: seriesConfig.clockwise ?? gaugeSeriesDefaults.clockwise,
  }

  if (seriesConfig.startAngle !== undefined) {
    gaugeSeries.startAngle = seriesConfig.startAngle
  }

  if (seriesConfig.endAngle !== undefined) {
    gaugeSeries.endAngle = seriesConfig.endAngle
  }

  return {
    ...baseConfig,
    series: [
      {
        ...gaugeSeries,
      },
    ],
  }
}

// 创建漏斗图配置
export function createFunnelChartOption(
  data: ChartDataItem[],
  config?: ChartConfig,
  theme: ChartTheme = 'auto',
): EChartsOption {
  const baseConfig = createBaseConfig(config, theme)
  const whiteColor = getCSSVariable('--text-primary')
  const seriesConfig = (config?.series?.[0] as any) ?? {}

  const funnelSeriesDefaults = {
    name: config?.legend?.data?.[0] || '数据',
    type: 'funnel',
    data,
    left: '10%',
    top: 60,
    bottom: 60,
    width: '80%',
    min: 0,
    max: 100,
    minSize: '0%',
    maxSize: '100%',
    sort: 'descending',
    gap: 2,
    funnelAlign: 'center',
    label: {
      show: true,
      position: 'inside',
      formatter: '{b}: {c}',
      color: whiteColor,
    },
    labelLine: {
      length: 10,
      lineStyle: {
        width: 1,
        type: 'solid',
        color: whiteColor,
      },
    },
    itemStyle: {
      borderColor: whiteColor,
      borderWidth: 1,
    },
    emphasis: {
      label: {
        fontSize: 20,
        color: whiteColor,
      },
    },
  } as Record<string, any>

  const funnelSeries: Record<string, any> = {
    ...funnelSeriesDefaults,
    ...seriesConfig,
    name: seriesConfig.name ?? funnelSeriesDefaults.name,
    data: seriesConfig.data ?? funnelSeriesDefaults.data,
    sort: seriesConfig.sort ?? funnelSeriesDefaults.sort,
    gap: seriesConfig.gap ?? funnelSeriesDefaults.gap,
    funnelAlign: seriesConfig.funnelAlign ?? funnelSeriesDefaults.funnelAlign,
    label: seriesConfig.label ?? funnelSeriesDefaults.label,
    labelLine: seriesConfig.labelLine ?? funnelSeriesDefaults.labelLine,
    itemStyle: seriesConfig.itemStyle ?? funnelSeriesDefaults.itemStyle,
    emphasis: seriesConfig.emphasis ?? funnelSeriesDefaults.emphasis,
    left: seriesConfig.left ?? funnelSeriesDefaults.left,
    top: seriesConfig.top ?? funnelSeriesDefaults.top,
    bottom: seriesConfig.bottom ?? funnelSeriesDefaults.bottom,
    width: seriesConfig.width ?? funnelSeriesDefaults.width,
    min: seriesConfig.min ?? funnelSeriesDefaults.min,
    max: seriesConfig.max ?? funnelSeriesDefaults.max,
    minSize: seriesConfig.minSize ?? funnelSeriesDefaults.minSize,
    maxSize: seriesConfig.maxSize ?? funnelSeriesDefaults.maxSize,
  }

  return {
    ...baseConfig,
    series: [
      {
        ...funnelSeries,
      },
    ],
  }
}

// 创建桑基图配置
export function createSankeyChartOption(
  data: Array<Record<string, any>>,
  config?: ChartConfig,
  theme: ChartTheme = 'auto',
): EChartsOption {
  const baseConfig = createBaseConfig(config, theme)

  const seriesConfig = (config?.series?.[0] as any) ?? {}

  const defaultLinks = Array.isArray(data)
    ? data.map((item: any, index: number) => ({
        source: item?.source ?? item?.name ?? `source_${index}`,
        target: item?.target ?? `target_${index}`,
        value: item?.value ?? 0,
      }))
    : []

  return {
    ...baseConfig,
    series: [
      {
        name: config?.legend?.data?.[0] || '数据',
        type: 'sankey',
        data: seriesConfig.data ?? data,
        links: seriesConfig.links ?? defaultLinks,
        emphasis: seriesConfig.emphasis ?? { focus: 'adjacency' },
        lineStyle: seriesConfig.lineStyle ?? { color: 'gradient', curveness: 0.5 },
        ...seriesConfig,
      },
    ],
  }
}

// 获取图表配置函数：重载以匹配不同图表的数据类型
export function getChartOption(
  type: 'line' | 'bar',
  data: ChartDataItem[] | number[],
  config?: ChartConfig,
  theme?: ChartTheme,
): EChartsOption
export function getChartOption(
  type: 'pie' | 'scatter' | 'radar' | 'funnel',
  data: ChartDataItem[],
  config?: ChartConfig,
  theme?: ChartTheme,
): EChartsOption
export function getChartOption(
  type: 'sankey',
  data: Array<Record<string, any>>,
  config?: ChartConfig,
  theme?: ChartTheme,
): EChartsOption
export function getChartOption(
  type: 'gauge',
  data: number,
  config?: ChartConfig,
  theme?: ChartTheme,
): EChartsOption
export function getChartOption(
  type: ChartType,
  data: ChartDataItem[] | number[] | number | Array<Record<string, any>>,
  config?: ChartConfig,
  theme?: ChartTheme,
): EChartsOption
export function getChartOption(
  type: ChartType,
  data: any,
  config?: ChartConfig,
  theme: ChartTheme = 'auto',
): EChartsOption {
  switch (type) {
    case 'line':
      return createLineChartOption(data as any, config, theme)
    case 'bar':
      return createBarChartOption(data as any, config, theme)
    case 'pie':
      return createPieChartOption(data as ChartDataItem[], config, theme)
    case 'scatter':
      return createScatterChartOption(data as ChartDataItem[], config, theme)
    case 'radar':
      return createRadarChartOption(data as ChartDataItem[], config, theme)
    case 'gauge':
      return createGaugeChartOption(data, config, theme)
    case 'funnel':
      return createFunnelChartOption(data as ChartDataItem[], config, theme)
    case 'sankey':
      return createSankeyChartOption(data, config, theme)
    default:
      return createLineChartOption(data as any, config, theme)
  }
}
