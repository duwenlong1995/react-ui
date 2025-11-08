// import type { ChartConfig, ChartDataItem } from './types';

// 预设图表配置
export const CHART_PRESETS = {
  // 基础配置
  basic: {
    title: {
      text: '图表标题',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 'top',
      left: 'center',
    },
  },

  // 响应式配置
  responsive: {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'transparent',
      textStyle: {
        color: '#fff',
      },
    },
  },

  // 暗色主题配置
  dark: {
    backgroundColor: '#1f1f1f',
    textStyle: {
      color: '#ffffff',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      backgroundColor: 'transparent',
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#666',
        },
      },
      axisTick: {
        lineStyle: {
          color: '#666',
        },
      },
      axisLabel: {
        color: '#999',
      },
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: '#666',
        },
      },
      axisTick: {
        lineStyle: {
          color: '#666',
        },
      },
      axisLabel: {
        color: '#999',
      },
      splitLine: {
        lineStyle: {
          color: '#333',
        },
      },
    },
  },

  // 亮色主题配置
  light: {
    backgroundColor: '#ffffff',
    textStyle: {
      color: '#333333',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      backgroundColor: 'transparent',
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
      axisTick: {
        lineStyle: {
          color: '#ccc',
        },
      },
      axisLabel: {
        color: '#666',
      },
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
      axisTick: {
        lineStyle: {
          color: '#ccc',
        },
      },
      axisLabel: {
        color: '#666',
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
        },
      },
    },
  },

  // 苹果风格主题配置
  apple: {
    backgroundColor: 'transparent',
    textStyle: {
      color: '#1d1d1f',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    color: [
      '#007AFF', // iOS 蓝
      '#34C759', // iOS 绿
      '#FF9500', // iOS 橙
      '#FF3B30', // iOS 红
      '#AF52DE', // iOS 紫
      '#FF2D55', // iOS 粉
      '#5AC8FA', // iOS 青
      '#FFCC00', // iOS 黄
      '#FF6482', // 珊瑚色
      '#30D158', // 薄荷绿
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      backgroundColor: 'transparent',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.05)',
      borderWidth: 1,
      textStyle: {
        color: '#1d1d1f',
        fontSize: 13,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
      padding: [10, 15],
      extraCssText:
        'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); border-radius: 10px; backdrop-filter: blur(10px);',
    },
    legend: {
      textStyle: {
        color: '#1d1d1f',
        fontSize: 13,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
    },
    xAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.1)',
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#86868b',
        fontSize: 12,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        margin: 10,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#86868b',
        fontSize: 12,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        margin: 10,
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.06)',
          width: 1,
          type: 'solid',
        },
      },
    },
    series: {
      lineStyle: {
        width: 3,
        cap: 'round',
        join: 'round',
      },
      itemStyle: {
        borderWidth: 0,
        borderRadius: 8,
      },
      emphasis: {
        scale: true,
        focus: 'series',
      },
    },
  },

  // 苹果暗色风格主题配置
  appleDark: {
    backgroundColor: 'transparent',
    textStyle: {
      color: '#f5f5f7',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    color: [
      '#0A84FF', // iOS 蓝 (暗色)
      '#30D158', // iOS 绿 (暗色)
      '#FF9F0A', // iOS 橙 (暗色)
      '#FF453A', // iOS 红 (暗色)
      '#BF5AF2', // iOS 紫 (暗色)
      '#FF375F', // iOS 粉 (暗色)
      '#64D2FF', // iOS 青 (暗色)
      '#FFD60A', // iOS 黄 (暗色)
      '#FF6482', // 珊瑚色
      '#32D74B', // 薄荷绿 (暗色)
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      backgroundColor: 'transparent',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(30, 30, 30, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      textStyle: {
        color: '#f5f5f7',
        fontSize: 13,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
      padding: [10, 15],
      extraCssText:
        'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); border-radius: 10px; backdrop-filter: blur(10px);',
    },
    legend: {
      textStyle: {
        color: '#f5f5f7',
        fontSize: 13,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
    },
    xAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#86868b',
        fontSize: 12,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        margin: 10,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#86868b',
        fontSize: 12,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        margin: 10,
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.08)',
          width: 1,
          type: 'solid',
        },
      },
    },
    series: {
      lineStyle: {
        width: 3,
        cap: 'round',
        join: 'round',
      },
      itemStyle: {
        borderWidth: 0,
        borderRadius: 8,
      },
      emphasis: {
        scale: true,
        focus: 'series',
      },
    },
  },
};

// 预设数据
export const SAMPLE_DATA = {
  // 折线图数据
  lineData: [
    { name: '1月', value: 820 },
    { name: '2月', value: 932 },
    { name: '3月', value: 901 },
    { name: '4月', value: 934 },
    { name: '5月', value: 1290 },
    { name: '6月', value: 1330 },
    { name: '7月', value: 1320 },
  ],

  // 柱状图数据
  barData: [
    { name: '产品A', value: 120 },
    { name: '产品B', value: 200 },
    { name: '产品C', value: 150 },
    { name: '产品D', value: 80 },
    { name: '产品E', value: 70 },
    { name: '产品F', value: 110 },
    { name: '产品G', value: 130 },
  ],

  // 饼图数据
  pieData: [
    { name: '直接访问', value: 335 },
    { name: '邮件营销', value: 310 },
    { name: '联盟广告', value: 234 },
    { name: '视频广告', value: 135 },
    { name: '搜索引擎', value: 1548 },
  ],

  // 散点图数据
  scatterData: [
    { name: '数据点1', value: [10, 20] },
    { name: '数据点2', value: [20, 30] },
    { name: '数据点3', value: [30, 40] },
    { name: '数据点4', value: [40, 50] },
    { name: '数据点5', value: [50, 60] },
  ],

  // 雷达图数据
  radarData: [
    {
      name: '预算分配',
      value: [4200, 3000, 20000, 35000, 50000, 18000],
    },
    {
      name: '实际开销',
      value: [5000, 14000, 28000, 26000, 42000, 21000],
    },
  ],

  // 仪表盘数据
  gaugeData: 75,

  // 漏斗图数据
  funnelData: [
    { name: '访问', value: 100 },
    { name: '咨询', value: 80 },
    { name: '订单', value: 60 },
    { name: '点击', value: 40 },
    { name: '展现', value: 20 },
  ],

  // 桑基图数据
  sankeyData: [
    { source: '北京', target: '上海', value: 100 },
    { source: '北京', target: '广州', value: 80 },
    { source: '上海', target: '深圳', value: 60 },
    { source: '广州', target: '深圳', value: 40 },
  ],
};

// 预设图表配置组合
export const CHART_CONFIGS = {
  // 简单折线图
  simpleLine: {
    title: {
      text: '简单折线图',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis' as const,
    },
    xAxis: {
      type: 'category' as const,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value' as const,
    },
  },

  // 面积折线图
  areaLine: {
    title: {
      text: '面积折线图',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis' as const,
    },
    xAxis: {
      type: 'category' as const,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value' as const,
    },
  },

  // 堆叠柱状图
  stackedBar: {
    title: {
      text: '堆叠柱状图',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis' as const,
    },
    legend: {
      data: ['系列1', '系列2', '系列3'],
    },
    xAxis: {
      type: 'category' as const,
    },
    yAxis: {
      type: 'value' as const,
    },
  },

  // 环形饼图
  donutPie: {
    title: {
      text: '环形饼图',
      left: 'center',
    },
    tooltip: {
      trigger: 'item' as const,
    },
    legend: {
      orient: 'vertical' as const,
      left: 'left',
    },
  },

  // 玫瑰图
  rosePie: {
    title: {
      text: '玫瑰图',
      left: 'center',
    },
    tooltip: {
      trigger: 'item' as const,
    },
    legend: {
      orient: 'vertical' as const,
      left: 'left',
    },
  },
};

// 获取预设配置
export function getPresetConfig(presetName: keyof typeof CHART_PRESETS): any {
  return CHART_PRESETS[presetName];
}

// 获取预设数据
export function getPresetData(dataName: keyof typeof SAMPLE_DATA): any {
  return SAMPLE_DATA[dataName];
}

// 获取图表配置
export function getChartConfig(configName: keyof typeof CHART_CONFIGS): any {
  return CHART_CONFIGS[configName];
}
