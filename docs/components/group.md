---
title: Group 选项组
order: 4
---

# Group 选项组

批量管理一组复选框或单选按钮，提供统一的排版、间距与受控数据处理能力。

## 复选框组（Checkbox）

```tsx
import React from 'react'
import { Group } from '@cui/ui'

export default () => (
  <Group
    direction="vertical"
    gap="md"
    options={[
      { value: 'email', label: '邮件通知', description: '实时获取审核结果' },
      { value: 'sms', label: '短信通知', description: '重要消息短信提醒' },
      { value: 'push', label: '推送通知', description: 'App 内推送', helperText: '推荐开启' },
    ]}
    defaultValue={['email', 'push']}
  />
)
```

## 单选组（Radio）

```tsx
import React from 'react'
import { Group } from '@cui/ui'

export default () => (
  <Group
    type="radio"
    name="priority"
    direction="horizontal"
    gap="lg"
    options={[
      { value: 'low', label: '低', description: '排队执行' },
      { value: 'medium', label: '中', description: '常规优先级', helperText: '默认选项' },
      { value: 'high', label: '高', description: '立即执行', error: '需管理员授权' },
    ]}
    defaultValue="medium"
  />
)
```

## 受控用法

```tsx
import React, { useState } from 'react'
import { Group } from '@cui/ui'

export default () => {
  const [value, setValue] = useState<string[]>(['design'])

  return (
    <div className="space-y-4">
      <Group
        options={[
          { value: 'design', label: '设计团队' },
          { value: 'frontend', label: '前端团队' },
          { value: 'backend', label: '后端团队' },
        ]}
        value={value}
        onChange={(next) => setValue(next)}
      />

      <div className="text-sm text-[var(--text-color-secondary)]">
        当前选择：{value.length ? value.join('、') : '无'}
      </div>
    </div>
  )
}
```

## 自定义子元素

```tsx
import React from 'react'
import { Group, Checkbox } from '@cui/ui'

export default () => (
  <Group direction="vertical" gap="sm">
    <Checkbox value="basic" label="基础功能" helperText="默认必选" disabled defaultChecked />
    <Checkbox value="pro" label="专业增强" description="附加报表与权限管理" />
    <Checkbox value="ai" label="AI 助手" description="智能总结与问答" />
  </Group>
)
```

## API

### GroupProps

| 属性            | 说明                                          | 类型                                                                        | 默认值       |
| --------------- | --------------------------------------------- | --------------------------------------------------------------------------- | ------------ |
| type            | 分组类型                                      | `'checkbox'` \| `'radio'`                                                   | `'checkbox'` |
| name            | 控件的 `name` 属性，常用于单选组              | `string`                                                                    | -            |
| options         | 快速渲染的选项数组                            | `GroupOption[]`                                                             | -            |
| direction       | 布局方向                                      | `'vertical'` \| `'horizontal'`                                              | `'vertical'` |
| gap             | 选项间距                                      | `'none'` \| `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'`                  | `'md'`       |
| className       | 容器类名                                      | `string`                                                                    | -            |
| optionClassName | 每个选项的附加类名                            | `string`                                                                    | -            |
| size            | 传递给子复选框的尺寸                          | `'sm'` \| `'md'` \| `'lg'`                                                  | `'md'`       |
| disabled        | 是否整体禁用                                  | `boolean`                                                                   | `false`      |
| value           | 受控值（`checkbox` 为数组，`radio` 为字符串） | `string[]` \| `string`                                                      | -            |
| defaultValue    | 默认值（支持数组或字符串）                    | `string[]` \| `string`                                                      | -            |
| onChange        | 变更回调                                      | `(value: string[] \| string, event: ChangeEvent<HTMLInputElement>) => void` | -            |
| children        | 自定义子元素（代替 `options`）                | `ReactNode`                                                                 | -            |

> 当 `options` 与 `children` 同时存在时，优先渲染 `options`。

### GroupOption

| 属性          | 说明               | 类型        | 默认值  |
| ------------- | ------------------ | ----------- | ------- |
| value         | 选项值（必须唯一） | `string`    | -       |
| label         | 选项标题           | `ReactNode` | -       |
| description   | 辅助描述           | `ReactNode` | -       |
| helperText    | 底部辅助文案       | `ReactNode` | -       |
| error         | 错误文案           | `ReactNode` | -       |
| disabled      | 是否禁用该选项     | `boolean`   | `false` |
| indeterminate | 是否半选           | `boolean`   | `false` |

### 可访问性

- 自动为子复选框/单选框传递 `name`、`checked`、`onChange` 等属性。
- 受控/非受控模式均可；受控模式下 `value` 与 `onChange` 搭配使用。
- 所有选项均继承 `Checkbox` 的可访问性增强，包括 `aria-invalid`、键盘支持等。
