---
title: Charts 图表
order: 8
---

# Charts 图表

基于 ECharts 的通用图表组件集合，提供类型安全、主题友好、即插即用的图表能力。

## 折线图

```tsx
import React from 'react'
import { LineChart } from '@cui/ui'

const data = [
  { name: '1月', value: 120 },
  { name: '2月', value: 200 },
  { name: '3月', value: 150 },
]

export default () => (
  <LineChart
    data={data}
    config={{ title: { text: '折线图' }, legend: { data: ['数据'] } }}
    height={320}
  />
)
```

## 柱状图

```tsx
import React from 'react'
import { BarChart } from '@cui/ui'

const data = [
  { name: 'A', value: 120 },
  { name: 'B', value: 80 },
  { name: 'C', value: 160 },
]

export default () => (
  <BarChart
    data={data}
    config={{ title: { text: '柱状图' }, legend: { data: ['数据'] } }}
    height={320}
  />
)
```

## 饼图

```tsx
import React from 'react'
import { PieChart } from '@cui/ui'

const data = [
  { name: '苹果', value: 40 },
  { name: '香蕉', value: 25 },
  { name: '橙子', value: 35 },
]

export default () => (
  <PieChart
    data={data}
    config={{ title: { text: '饼图' }, legend: { data: ['数据'] } }}
    height={320}
  />
)
```

## 散点图

```tsx
import React from 'react'
import { ScatterChart } from '@cui/ui'

const data = [
  { name: '样本1', value: 10 },
  { name: '样本2', value: 22 },
  { name: '样本3', value: 36 },
]

export default () => (
  <ScatterChart
    data={data}
    config={{ title: { text: '散点图' }, legend: { data: ['数据'] } }}
    height={320}
  />
)
```

## 雷达图

```tsx
import React from 'react'
import { RadarChart } from '@cui/ui'

const data = [{ name: '预算分配', value: [120, 110, 125, 145, 160, 130] }]

const indicator = [
  { name: '销售', max: 200 },
  { name: '管理', max: 200 },
  { name: '信息技术', max: 200 },
  { name: '客服', max: 200 },
  { name: '研发', max: 200 },
  { name: '市场', max: 200 },
]

export default () => (
  <RadarChart
    data={data as any}
    indicator={indicator}
    config={{ title: { text: '雷达图' }, legend: { data: ['预算分配'] } }}
    height={320}
  />
)
```

## 仪表盘

```tsx
import React from 'react'
import { GaugeChart } from '@cui/ui'

export default () => (
  <GaugeChart
    data={66}
    min={0}
    max={100}
    splitNumber={10}
    config={{ title: { text: '仪表盘' } }}
    height={320}
  />
)
```

## 漏斗图

```tsx
import React from 'react'
import { FunnelChart } from '@cui/ui'

const data = [
  { name: '访问', value: 100 },
  { name: '咨询', value: 80 },
  { name: '下单', value: 60 },
  { name: '支付', value: 40 },
]

export default () => (
  <FunnelChart
    data={data}
    gap={2}
    config={{ title: { text: '漏斗图' }, legend: { data: ['转化'] } }}
    height={320}
  />
)
```

## 桑基图

```tsx
import React from 'react'
import { SankeyChart } from '@cui/ui'

const data = [
  { from: 'A', to: 'B', amount: 10 },
  { from: 'A', to: 'C', amount: 20 },
  { from: 'B', to: 'D', amount: 5 },
]

export default () => (
  <SankeyChart
    data={data}
    source="from"
    target="to"
    value="amount"
    config={{ title: { text: '桑基图' } }}
    height={320}
  />
)
```

## API 摘要

- LineChart：`smooth` `areaStyle` `stack` `step`
- BarChart：`horizontal` `stack` `barWidth` `barMaxWidth`
- PieChart：`radius` `center` `roseType`
- ScatterChart：`symbolSize` `symbol` `large`
- RadarChart：`indicator` `shape`
- GaugeChart：`min` `max` `splitNumber` `startAngle` `endAngle`
- FunnelChart：`sort` `gap` `funnelAlign`
- SankeyChart：`source` `target` `value` `nodeWidth` `nodeGap`
