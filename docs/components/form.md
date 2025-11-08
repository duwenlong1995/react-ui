---
title: Form 表单
order: 6
---

# Form 表单

组合表单元素的容器组件，提供一致的布局、对齐与数据收集能力。

## 基本用法

```tsx
import React from 'react'
import { Form, FormLabel, Input, Button } from '@cui/ui'

export default () => (
  <Form
    layout={{ gap: 'md', padding: 'md' }}
    onSubmit={(values) => {
      console.log(values)
    }}
  >
    <FormLabel label="用户名" required>
      <Input name="username" placeholder="请输入用户名" />
    </FormLabel>

    <FormLabel label="邮箱" required>
      <Input name="email" type="email" placeholder="请输入邮箱" />
    </FormLabel>

    <Button type="submit">提交</Button>
  </Form>
)
```

## 布局（layout）

```tsx
import React from 'react'
import { Form, FormLabel, Input } from '@cui/ui'

export default () => (
  <div className="space-y-6">
    <Form layout={{ direction: 'vertical', gap: 'md', padding: 'md' }}>
      <FormLabel label="标题" orientation="vertical">
        <Input name="title" placeholder="垂直布局" />
      </FormLabel>
      <FormLabel label="描述" orientation="vertical">
        <Input name="description" placeholder="支持完整宽度" />
      </FormLabel>
    </Form>

    <Form layout={{ direction: 'horizontal', gap: 'md', padding: 'md', align: 'center' }}>
      <FormLabel label="标题" orientation="horizontal">
        <Input name="title" placeholder="水平布局" />
      </FormLabel>
      <FormLabel label="字段" orientation="horizontal">
        <Input name="field" placeholder="自适应宽度" />
      </FormLabel>
    </Form>
  </div>
)
```

## 表单校验

```tsx
import React, { useState } from 'react'
import { Form, FormLabel, Input, Button } from '@cui/ui'

export default () => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (values: Record<string, FormDataEntryValue>) => {
    const nextErrors: Record<string, string> = {}
    if (!values.username) nextErrors.username = '用户名不能为空'
    if (!values.password) nextErrors.password = '密码不能为空'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      console.log('提交成功', values)
    }
  }

  return (
    <Form layout={{ gap: 'md', padding: 'md' }} onSubmit={handleSubmit}>
      <FormLabel label="用户名" required error={errors.username} orientation="horizontal">
        <Input name="username" icon="user" placeholder="请输入用户名" />
      </FormLabel>

      <FormLabel label="密码" required error={errors.password} orientation="horizontal">
        <Input name="password" type="password" icon="lock" placeholder="请输入密码" />
      </FormLabel>

      <Button type="submit">登录</Button>
    </Form>
  )
}
```

## 组合示例

```tsx
import React from 'react'
import { Form, FormLabel, Input, Button } from '@cui/ui'

export default () => (
  <Form
    layout={{ direction: 'vertical', gap: 'lg', padding: 'lg', fullWidth: true }}
    onSubmit={(values) => console.log(values)}
  >
    <FormLabel label="公司名称" required>
      <Input name="company" placeholder="请输入公司名称" />
    </FormLabel>

    <FormLabel label="联系人" orientation="horizontal" helpText="请填写真实姓名">
      <Input name="contact" placeholder="联系人姓名" />
    </FormLabel>

    <FormLabel label="联系电话" orientation="horizontal">
      <Input name="phone" type="tel" placeholder="手机/座机号码" />
    </FormLabel>

    <FormLabel label="网站" orientation="horizontal">
      <Input name="website" type="url" placeholder="https://example.com" />
    </FormLabel>

    <div className="flex justify-end gap-3">
      <Button type="button" variant="outline">
        取消
      </Button>
      <Button type="submit">保存信息</Button>
    </div>
  </Form>
)
```

## API

### FormProps

| 属性           | 说明                              | 类型                                                                     | 默认值                                 |
| -------------- | --------------------------------- | ------------------------------------------------------------------------ | -------------------------------------- |
| layout         | 布局配置                          | `FormLayout`                                                             | `{ direction: 'vertical', gap: 'md' }` |
| onSubmit       | 提交回调（自动收集表单值）        | `(values: Record<string, FormDataEntryValue>, event: FormEvent) => void` | -                                      |
| collectValues  | 是否收集表单数据并调用 `onSubmit` | `boolean`                                                                | `true`                                 |
| nativeOnSubmit | 原生 `onSubmit` 回调              | `(event: FormEvent<HTMLFormElement>) => void`                            | -                                      |
| className      | 自定义类名                        | `string`                                                                 | -                                      |
| 其余           | 支持全部原生 `<form>` 属性        | -                                                                        | -                                      |

### FormLayout

| 属性      | 说明           | 类型                                                       | 默认值       |
| --------- | -------------- | ---------------------------------------------------------- | ------------ |
| direction | 主轴方向       | `'vertical' \| 'horizontal'`                               | `'vertical'` |
| gap       | 项目间距       | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | `'md'`       |
| align     | 交叉轴对齐方式 | `'start' \| 'center' \| 'end' \| 'stretch'`                | `'stretch'`  |
| justify   | 主轴对齐方式   | `'start' \| 'center' \| 'end' \| 'between' \| 'around'`    | `'start'`    |
| fullWidth | 是否占满宽度   | `boolean`                                                  | `false`      |
| padding   | 内边距         | `'none' \| 'sm' \| 'md' \| 'lg'`                           | `'none'`     |

### FormLabelProps

| 属性        | 说明                          | 类型                         | 默认值       |
| ----------- | ----------------------------- | ---------------------------- | ------------ |
| label       | 标签文本                      | `ReactNode`                  | -            |
| htmlFor     | 控件 `id`                     | `string`                     | 自动生成     |
| name        | 控件 `name`，自动传递给子元素 | `string`                     | -            |
| orientation | 布局方向                      | `'vertical' \| 'horizontal'` | `'vertical'` |
| spacing     | 标签与控件间距                | `'sm' \| 'md' \| 'lg'`       | `'md'`       |
| labelWidth  | 标签宽度（横向布局）          | `string`                     | `'md:w-32'`  |
| helpText    | 辅助说明文本                  | `ReactNode`                  | -            |
| error       | 错误信息文本                  | `ReactNode`                  | -            |
| required    | 是否必填                      | `boolean`                    | `false`      |
| children    | 表单控件，必须是 React 元素   | `ReactElement`               | -            |

> `FormLabel` 会自动为子控件注入 `id`、`name`、`aria-describedby` 等可访问性属性，并支持错误与提示文案。
