# 通用图表组件

基于 ECharts 的通用图表组件库，提供类型安全、易于使用的图表组件。

## 特性

- 🎯 **类型安全** - 完整的 TypeScript 类型定义
- 🎨 **主题支持** - 支持亮色、暗色和自动主题
- 📦 **按需加载** - 只引入需要的图表类型
- 🔧 **高度可配置** - 丰富的配置选项
- 📱 **响应式** - 自适应不同屏幕尺寸
- 🎪 **预设配置** - 常用配置预设
- 🎭 **事件支持** - 完整的交互事件

## 安装

```bash
npm install echarts
```

## 基础用法

### 1. 折线图

```tsx
import { LineChart } from '@/components/charts';

const data = [
  { name: '1月', value: 120 },
  { name: '2月', value: 200 },
  { name: '3月', value: 150 },
];

<LineChart
  data={data}
  config={{
    title: { text: '销售趋势' },
    tooltip: { trigger: 'axis' },
  }}
  height='400px'
  theme='auto'
/>;
```

### 2. 柱状图

```tsx
import { BarChart } from '@/components/charts';

<BarChart
  data={data}
  config={{
    title: { text: '产品销量' },
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
  }}
  horizontal={false}
  barWidth='60%'
/>;
```

### 3. 饼图

```tsx
import { PieChart } from '@/components/charts';

<PieChart
  data={data}
  config={{
    title: { text: '市场份额' },
    tooltip: { trigger: 'item' },
  }}
  radius={['40%', '70%']}
  roseType='radius'
/>;
```

## 高级用法

### 使用预设配置

```tsx
import { LineChart, getPresetData, getChartConfig } from '@/components/charts';

// 获取预设数据
const data = getPresetData('lineData');

// 获取预设配置
const config = getChartConfig('simpleLine');

<LineChart data={data} config={config} />;
```

### 自定义主题

```tsx
<LineChart
  data={data}
  config={config}
  theme='dark' // 'light' | 'dark' | 'auto'
/>
```

### 事件处理

```tsx
<LineChart
  data={data}
  config={config}
  onChartReady={chart => {
    console.log('图表已准备就绪', chart);
  }}
  onDataZoom={params => {
    console.log('数据缩放', params);
  }}
  onLegendSelectChanged={params => {
    console.log('图例选择变化', params);
  }}
/>
```

## 组件列表

| 组件           | 描述   | 主要属性                          |
| -------------- | ------ | --------------------------------- |
| `LineChart`    | 折线图 | `smooth`, `areaStyle`, `step`     |
| `BarChart`     | 柱状图 | `horizontal`, `stack`, `barWidth` |
| `PieChart`     | 饼图   | `radius`, `center`, `roseType`    |
| `ScatterChart` | 散点图 | `symbolSize`, `symbol`, `large`   |
| `RadarChart`   | 雷达图 | `indicator`, `shape`              |
| `GaugeChart`   | 仪表盘 | `min`, `max`, `splitNumber`       |
| `FunnelChart`  | 漏斗图 | `sort`, `gap`, `funnelAlign`      |
| `SankeyChart`  | 桑基图 | `source`, `target`, `value`       |

## 配置选项

### 通用配置

```typescript
interface BaseChartProps {
  data: ChartDataItem[] | number[]; // 图表数据
  config?: ChartConfig; // 图表配置
  theme?: ChartTheme; // 主题
  loading?: boolean; // 加载状态
  height?: string | number; // 高度
  width?: string | number; // 宽度
  className?: string; // CSS类名
  onChartReady?: (chart: any) => void; // 图表就绪回调
  onDataZoom?: (params: any) => void; // 数据缩放回调
  onLegendSelectChanged?: (params: any) => void; // 图例选择回调
}
```

### 图表配置

```typescript
interface ChartConfig {
  title?: {
    text: string;
    subtext?: string;
    left?: string | number;
    top?: string | number;
  };
  tooltip?: {
    trigger?: 'axis' | 'item';
    formatter?: string | Function;
  };
  legend?: {
    data?: string[];
    position?: 'top' | 'bottom' | 'left' | 'right';
  };
  grid?: {
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
  };
  xAxis?: {
    type?: 'category' | 'value' | 'time' | 'log';
    data?: any[];
    name?: string;
  };
  yAxis?: {
    type?: 'category' | 'value' | 'time' | 'log';
    name?: string;
    axisLabel?: {
      formatter?: string | Function;
    };
  };
  series?: ChartSeries[];
  color?: string[];
  backgroundColor?: string;
  animation?: boolean;
  animationDuration?: number;
}
```

## 预设配置

### 预设数据

```typescript
// 获取预设数据
const lineData = getPresetData('lineData'); // 折线图数据
const barData = getPresetData('barData'); // 柱状图数据
const pieData = getPresetData('pieData'); // 饼图数据
const scatterData = getPresetData('scatterData'); // 散点图数据
const radarData = getPresetData('radarData'); // 雷达图数据
const gaugeData = getPresetData('gaugeData'); // 仪表盘数据
const funnelData = getPresetData('funnelData'); // 漏斗图数据
const sankeyData = getPresetData('sankeyData'); // 桑基图数据
```

### 预设配置

```typescript
// 获取预设配置
const simpleLine = getChartConfig('simpleLine'); // 简单折线图
const areaLine = getChartConfig('areaLine'); // 面积图
const stackedBar = getChartConfig('stackedBar'); // 堆叠柱状图
const donutPie = getChartConfig('donutPie'); // 环形饼图
const rosePie = getChartConfig('rosePie'); // 玫瑰图
```

## 最佳实践

### 1. 数据格式

```typescript
// 推荐的数据格式
const data: ChartDataItem[] = [
  { name: '类别1', value: 100 },
  { name: '类别2', value: 200 },
  { name: '类别3', value: 150 },
];

// 或者使用数字数组（仅适用于某些图表类型）
const data: number[] = [100, 200, 150];
```

### 2. 响应式设计

```tsx
<LineChart
  data={data}
  config={config}
  height='400px'
  width='100%'
  className='w-full h-full'
/>
```

### 3. 主题适配

```tsx
// 自动适配系统主题
<LineChart data={data} config={config} theme="auto" />

// 手动指定主题
<LineChart data={data} config={config} theme="dark" />
```

### 4. 性能优化

```tsx
// 使用 useMemo 缓存配置
const config = useMemo(
  () => ({
    title: { text: '图表标题' },
    tooltip: { trigger: 'axis' },
  }),
  []
);

<LineChart data={data} config={config} />;
```

## 故障排除

### 常见问题

1. **图表不显示**
   - 检查数据格式是否正确
   - 确认容器有明确的高度
   - 查看控制台是否有错误信息

2. **类型错误**
   - 确保导入了正确的类型
   - 检查数据格式是否符合类型定义

3. **主题不生效**
   - 确认主题值是否正确
   - 检查是否有样式覆盖

### 调试技巧

```tsx
<LineChart
  data={data}
  config={config}
  onChartReady={chart => {
    console.log('图表实例:', chart);
    console.log('图表配置:', chart.getOption());
  }}
/>
```

## 更新日志

### v1.0.0

- 初始版本发布
- 支持 8 种图表类型
- 完整的 TypeScript 类型定义
- 预设配置和数据
- 主题支持
- 事件处理

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个组件库。

## 许可证

MIT License
