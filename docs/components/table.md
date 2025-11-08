---
title: Table 表格
order: 10
---

# Table 表格

用于展示结构化数据列表，支持固定列、斑马纹、紧凑模式与自定义单元格渲染。

## 基本用法

```tsx
import React from 'react'
import { Table, TableColumn } from '@cui/ui'

type User = {
  id: string
  name: string
  age: number
  city: string
}

const columns: TableColumn<User>[] = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age', align: 'center' },
  { title: '城市', dataIndex: 'city' },
]

const data: User[] = [
  { id: '1', name: 'Alice', age: 28, city: '上海' },
  { id: '2', name: 'Bob', age: 32, city: '深圳' },
  { id: '3', name: 'Cindy', age: 24, city: '杭州' },
]

export default () => (
  <Table<User> columns={columns} data={data} rowKey="id" responsive />
)
```

## 样式组合

```tsx
import React from 'react'
import { Table, TableColumn } from '@cui/ui'

type Project = {
  id: string
  name: string
  owner: string
  status: '规划中' | '进行中' | '已完成'
}

const columns: TableColumn<Project>[] = [
  { title: '项目', dataIndex: 'name', fixed: 'left', width: 180 },
  { title: '负责人', dataIndex: 'owner' },
  { title: '状态', dataIndex: 'status', align: 'center' },
]

const data: Project[] = [
  { id: '1', name: '平台重构', owner: '夏夜', status: '进行中' },
  { id: '2', name: '数据资产梳理', owner: '明轩', status: '规划中' },
  { id: '3', name: '营销活动投放', owner: '乐陶', status: '已完成' },
]

export default () => (
  <Table<Project>
    columns={columns}
    data={data}
    rowKey="id"
    bordered
    striped
    hover
    responsive
  />
)
```

## 自定义单元格

```tsx
import React from 'react'
import { Button, Table, TableColumn } from '@cui/ui'

type Member = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}

const columns: TableColumn<Member>[] = [
  { title: '成员', dataIndex: 'name' },
  { title: '邮箱', dataIndex: 'email', width: 220 },
  {
    title: '角色',
    dataIndex: 'role',
    align: 'center',
    render: (value) => {
      const map: Record<Member['role'], string> = {
        admin: '管理员',
        editor: '编辑',
        viewer: '只读',
      }
      return map[value as Member['role']]
    },
  },
  {
    title: '操作',
    align: 'right',
    render: (_, record) => (
      <div className="flex justify-end gap-2">
        <Button size="sm" type="link">
          查看
        </Button>
        <Button size="sm" type="outline">
          编辑
        </Button>
      </div>
    ),
  },
]

const data: Member[] = [
  { id: '1', name: '李安', email: 'lee@example.com', role: 'admin' },
  { id: '2', name: '王小', email: 'wang@example.com', role: 'editor' },
  { id: '3', name: '赵云', email: 'zhao@example.com', role: 'viewer' },
]

export default () => <Table<Member> columns={columns} data={data} rowKey="id" responsive />
```

## 加载与空状态

```tsx
import React from 'react'
import { Table, TableColumn } from '@cui/ui'

type RecordItem = {
  id: string
  title: string
  createdAt: string
}

const columns: TableColumn<RecordItem>[] = [
  { title: '标题', dataIndex: 'title' },
  { title: '创建时间', dataIndex: 'createdAt', align: 'center', width: 160 },
]

export default () => {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState<RecordItem[]>([])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setData([
        { id: '1', title: '需求排期确认', createdAt: '2025-10-12 09:24' },
        { id: '2', title: '版本回顾与总结', createdAt: '2025-10-18 15:42' },
      ])
      setLoading(false)
    }, 900)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Table<RecordItem>
      columns={columns}
      data={data}
      rowKey="id"
      loading={loading}
      emptyContent="暂无记录"
      responsive
    />
  )
}
```

## API

### TableProps

| 属性           | 说明                                   | 类型                                                                    | 默认值    |
| -------------- | -------------------------------------- | ----------------------------------------------------------------------- | --------- |
| data           | 数据源                                 | `RecordType[]`                                                          | `[]`      |
| columns        | 列配置                                 | `TableColumn<RecordType>[]`                                             | -         |
| rowKey         | 行唯一标识，可为字段名或函数           | `keyof RecordType \| (record, index) => React.Key`                      | `index`   |
| bordered       | 是否展示外边框                         | `boolean`                                                               | `false`   |
| striped        | 是否开启斑马纹                         | `boolean`                                                               | `false`   |
| hover          | 是否在悬浮时高亮行                     | `boolean`                                                               | `false`   |
| condensed      | 是否紧凑显示                           | `boolean`                                                               | `false`   |
| responsive     | 是否在超出时允许横向滚动               | `boolean`                                                               | `false`   |
| loading        | 是否处于加载中                         | `boolean`                                                               | `false`   |
| emptyContent   | 空数据时的自定义展示                   | `ReactNode`                                                             | `'暂无数据'` |
| children       | 兼容旧用法，空数据时自定义 `tbody` 内容 | `ReactNode`                                                             | -         |
| className      | 自定义类名                             | `string`                                                                | -         |
| 其余           | 支持全部 `<table>` 原生属性            | `TableHTMLAttributes<HTMLTableElement>`                                 | -         |

### TableColumn

| 属性       | 说明                                   | 类型                                                                 | 默认值 |
| ---------- | -------------------------------------- | -------------------------------------------------------------------- | ------ |
| title      | 列标题                                 | `ReactNode`                                                          | -      |
| dataIndex  | 对应数据字段，支持 `a.b.c` 嵌套路径     | `keyof RecordType \| string \| Array<keyof RecordType \| string>`    | -      |
| key        | 列唯一标识，不传时自动使用 `dataIndex` | `React.Key`                                                          | -      |
| width      | 列宽                                   | `number \| string`                                                   | -      |
| align      | 对齐方式                               | `'left' \| 'center' \| 'right'`                                      | `'left'` |
| fixed      | 固定列                                 | `'left' \| 'right'`                                                  | -      |
| render     | 自定义渲染函数                         | `(value: any, record: RecordType, index: number) => React.ReactNode` | -      |
| headerStyle| 表头单元格样式                         | `CSSProperties`                                                      | -      |
| cellStyle  | 单元格样式                             | `CSSProperties`                                                      | -      |
| className  | 自定义类名（应用于表头与单元格）       | `string`                                                             | -      |
| rowSpan    | 行合并                                 | `number`                                                             | -      |
| colSpan    | 列合并                                 | `number`                                                             | -      |

> `render` 函数的三个参数分别为当前单元格值、当前行数据与行索引。

