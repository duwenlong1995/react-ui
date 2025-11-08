---
title: GanttChart 甘特图
order: 9
---

# GanttChart 甘特图

可视化展示任务时间轴的甘特图组件，支持自定义列、状态配色、滚动同步以及任务拖拽调整。

## 基本用法

```tsx
import React from 'react'
import { GanttChart } from '@cui/ui'

const columns = [
  { title: '设备', dataIndex: 'seat', key: 'seat', width: 160 },
  { title: '机型', dataIndex: 'typeName', key: 'typeName', width: 120 },
]

const data = [
  {
    id: 'room-1',
    seat: 'A 线',
    typeName: 'CNC',
    blockList: [
      {
        id: 'task-1',
        projectName: '示例工单',
        status: '1',
        startTime: '2025-04-01',
        endTime: '2025-04-05',
      },
    ],
  },
]

export default () => <GanttChart columns={columns} data={data} />
```

## 自定义列与数据

```tsx
import React from 'react'
import { GanttChart } from '@cui/ui'

const columns = [
  { title: '设备', dataIndex: 'seat', key: 'seat', width: 160 },
  { title: '机型', dataIndex: 'typeName', key: 'typeName', width: 120 },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 200,
    render: (value: string) => value ?? '—',
  },
]

const data = [
  {
    id: 'room-1',
    seat: 'A 线',
    typeName: 'CNC',
    remark: '双工位',
    blockList: [
      {
        id: 'task-1',
        projectName: '刀具维护',
        status: '2',
        startTime: '2025-04-01',
        endTime: '2025-04-03',
      },
      {
        id: 'task-2',
        projectName: '批次 042',
        status: '1',
        startTime: '2025-04-05',
        endTime: '2025-04-12',
      },
    ],
  },
  {
    id: 'room-2',
    seat: 'B 线',
    typeName: '喷涂',
    blockList: [
      {
        id: 'task-3',
        projectName: '返修',
        status: '3',
        startTime: '2025-04-02',
        endTime: '2025-04-04',
      },
    ],
  },
]

export default () => <GanttChart columns={columns} data={data} />
```

## 自定义时间轴范围

```tsx
import React from 'react'
import { GanttChart } from '@cui/ui'
import { ganttData } from '../../src/components/GanttChart/data'

export default () => (
  <GanttChart
    data={ganttData}
    startDate="2025-03-01"
    endDate="2025-05-01"
    dayWidth={36}
    rowHeight={36}
  />
)
```

## 外部控制时间跨度

```tsx
import React, { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { GanttChart, Button } from '@cui/ui'
import { ganttData } from '../../src/components/GanttChart/data'

const RANGE_PRESET = {
  quarter: 3,
  year: 12,
} as const

export default () => {
  const [mode, setMode] = useState<'quarter' | 'year'>('quarter')

  const { start, end } = useMemo(() => {
    const months = RANGE_PRESET[mode]
    const startOfMonth = dayjs().startOf('month')
    return {
      start: startOfMonth.toDate(),
      end: startOfMonth.add(months, 'month').toDate(),
    }
  }, [mode])

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Button type="primary" onClick={() => setMode('quarter')}>
          近三个月
        </Button>
        <Button type="primary" onClick={() => setMode('year')}>
          近一年
        </Button>
      </div>
      <GanttChart data={ganttData} startDate={start} endDate={end} />
    </div>
  )
}
```

## 自定义状态样式

```tsx
import React from 'react'
import { GanttChart } from '@cui/ui'
import { ganttData } from '../../src/components/GanttChart/data'

const statusMap = {
  '1': {
    background: 'rgba(37, 99, 235, 0.25)',
    borderColor: 'rgba(37, 99, 235, 0.45)',
    color: '#0f172a',
  },
  '2': {
    background: 'rgba(249, 115, 22, 0.25)',
    borderColor: 'rgba(249, 115, 22, 0.45)',
    color: '#7c2d12',
  },
  '3': {
    background: 'rgba(239, 68, 68, 0.25)',
    borderColor: 'rgba(239, 68, 68, 0.45)',
    color: '#7f1d1d',
  },
}

export default () => <GanttChart data={ganttData} statusMap={statusMap} />
```

## 互动事件

```tsx
import React from 'react'
import { GanttChart } from '@cui/ui'
import { ganttData } from '../../src/components/GanttChart/data'

export default () => (
  <GanttChart
    data={ganttData}
    onBlockClick={(task) => console.log('click', task)}
    onBlockContextMenu={(task, row, event) => {
      console.log('context menu', task, row)
      event.preventDefault()
    }}
  />
)
```

## 启用拖拽与调整

```tsx
import React from 'react'
import { GanttChart } from '@cui/ui'
import { ganttData } from '../../src/components/GanttChart/data'

export default () => <GanttChart data={ganttData} enableDragging />
```

## API

### GanttChartProps

| 属性                | 说明                         | 类型                               | 默认值        |
| ------------------- | ---------------------------- | ---------------------------------- | ------------- |
| data                | 数据源                       | `GanttRow[]`                       | `[]`          |
| columns             | 左侧列配置                   | `GanttColumn[]`                    | `[]`          |
| listKey             | 行数据中存储任务列表的字段名 | `string`                           | `'blockList'` |
| startDate           | 时间范围起点                 | `string \| Date`                   | 自动计算      |
| endDate             | 时间范围终点                 | `string \| Date`                   | 自动计算      |
| dayWidth            | 单天像素宽度                 | `number`                           | `32`          |
| rowHeight           | 行高度                       | `number`                           | `32`          |
| blockOffset         | 任务块顶部偏移               | `number`                           | `4`           |
| fallbackRangeMonths | 数据无法推导时的默认月份跨度 | `number`                           | `1`           |
| height              | 组件高度                     | `number`                           | 自适应        |
| enableDragging      | 是否启用拖拽和调整时长       | `boolean`                          | `false`       |
| statusMap           | 状态样式映射                 | `Record<string, GanttStatusStyle>` | 内置配色      |
| className           | 自定义类名                   | `string`                           | -             |
| onBlockClick        | 点击任务回调                 | `(task, row) => void`              | -             |
| onBlockContextMenu  | 右键任务回调                 | `(task, row, event) => void`       | -             |

### 类型定义

- `GanttColumn`：列配置，包含 `title`、`dataIndex`、`width` 等。
- `GanttRow`：行数据结构，包含唯一 `id` 与任务 `blockList`。
- `GanttTask`：任务信息，包含 `startTime`、`endTime`、`status` 等字段。
- `GanttStatusStyle`：状态样式结构，支持 `background`、`borderColor`、`color`。
