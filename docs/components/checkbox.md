---
title: Checkbox 复选框
order: 3
---

# Checkbox 复选框

用于选择一个或多个选项，支持描述、错误提示、半选状态以及单选（radio）模式。

## 基本用法

```tsx
import React, { useState } from 'react'
import { Checkbox } from '@cui/ui'

export default () => {
  const [checked, setChecked] = useState(true)

  return (
    <div className="space-y-3">
      <Checkbox
        label="接受服务协议"
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />

      <Checkbox label="接收最新资讯" defaultChecked />

      <Checkbox label="不再提示" />
    </div>
  )
}
```

## 尺寸（size）

```tsx
import React from 'react'
import { Checkbox } from '@cui/ui'

export default () => (
  <div className="space-y-2">
    <Checkbox size="sm" label="Small" defaultChecked />
    <Checkbox size="md" label="Medium" defaultChecked />
    <Checkbox size="lg" label="Large" defaultChecked />
  </div>
)
```

## 描述与辅助文案

```tsx
import React from 'react'
import { Checkbox } from '@cui/ui'

export default () => (
  <div className="space-y-3">
    <Checkbox
      label="启用提醒"
      description="激活后将在每天早上 8:00 发送提醒"
      helperText="可随时在设置中关闭"
      defaultChecked
    />
    <Checkbox label="匿名收集使用数据" description="仅用于改进产品功能，不会上传个人信息" />
  </div>
)
```

## 状态（禁用 / 错误 / 半选）

```tsx
import React, { useState } from 'react'
import { Checkbox } from '@cui/ui'

export default () => {
  const [indeterminate, setIndeterminate] = useState(true)

  return (
    <div className="space-y-3">
      <Checkbox label="禁用" disabled helperText="无法操作" defaultChecked />

      <Checkbox
        label="错误示例"
        error="请选择至少一个选项"
        description="发生错误时会自动加上 `aria-invalid` 属性"
      />

      <Checkbox
        label="部分选中"
        indeterminate={indeterminate}
        helperText="点击后将取消半选状态"
        onChange={() => setIndeterminate(false)}
      />
    </div>
  )
}
```

## 单选（radio）模式

```tsx
import React, { useState } from 'react'
import { Checkbox } from '@cui/ui'

export default () => {
  const [value, setValue] = useState('monthly')

  return (
    <div className="space-y-2">
      {[
        { label: '月付', value: 'monthly' },
        { label: '季付', value: 'quarterly' },
        { label: '年付', value: 'yearly' },
      ].map((option) => (
        <Checkbox
          key={option.value}
          type="radio"
          name="plan"
          label={option.label}
          value={option.value}
          checked={value === option.value}
          onChange={(event) => setValue(event.target.value)}
        />
      ))}
    </div>
  )
}
```

## 与 Group 组合

```tsx
import React from 'react'
import { Group } from '@cui/ui'

export default () => (
  <Group
    direction="vertical"
    gap="sm"
    options={[
      { value: 'figma', label: 'Figma', description: '协作设计工具' },
      { value: 'framer', label: 'Framer', description: '交互原型与建站' },
      { value: 'sketch', label: 'Sketch', description: 'macOS 设计软件', disabled: true },
    ]}
  />
)
```

## API

### CheckboxProps

| 属性             | 说明                                          | 类型                                             | 默认值       |
| ---------------- | --------------------------------------------- | ------------------------------------------------ | ------------ |
| type             | 控件类型                                      | `'checkbox' \| 'radio'`                          | `'checkbox'` |
| size             | 尺寸                                          | `'sm' \| 'md' \| 'lg'`                           | `'md'`       |
| label            | 主标签内容                                    | `ReactNode`                                      | -            |
| description      | 辅助描述文本                                  | `ReactNode`                                      | -            |
| helperText       | 底部辅助文案                                  | `ReactNode`                                      | -            |
| error            | 错误提示文案，自动附带红色样式                | `ReactNode`                                      | -            |
| indeterminate    | 是否为半选状态（仅 `checkbox` 有效）          | `boolean`                                        | `false`      |
| className        | 外层容器类名                                  | `string`                                         | -            |
| wrapperClassName | 兼容旧版的容器类名（将与 `className` 合并）   | `string`                                         | -            |
| controlClassName | 自定义选择框图形的类名                        | `string`                                         | -            |
| disabled         | 是否禁用                                      | `boolean`                                        | `false`      |
| checked          | 受控选中状态                                  | `boolean`                                        | -            |
| defaultChecked   | 默认选中状态（非受控）                        | `boolean`                                        | -            |
| onChange         | 状态变更回调                                  | `(event: ChangeEvent<HTMLInputElement>) => void` | -            |
| 其余             | 继承原生 `<input>` (type=checkbox/radio) 属性 | -                                                | -            |

### 样式变量

复选框组件使用与按钮、输入一致的一套 CSS 变量，可通过覆盖以下变量实现主题定制：

```css
:root {
  --outline-color-border: #e2e8f0;
  --primary-color: #2563eb;
  --text-color: #1e293b;
  --text-color-secondary: #64748b;
}
```
