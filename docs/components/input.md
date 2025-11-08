---
title: Input 输入框
order: 5
---

# Input 输入框

用于用户输入文本的表单组件，支持多种状态和验证。

## 基本用法

```tsx
import React from 'react'
import { Input } from '@cui/ui'

export default () => (
  <div className="space-y-4">
    <Input placeholder="请输入用户名" />
    <Input placeholder="请输入邮箱" type="email" />
    <Input placeholder="请输入密码" type="password" />
  </div>
)
```

## 尺寸（size）

```tsx
import React from 'react'
import { Input } from '@cui/ui'

export default () => (
  <div className="space-y-4">
    <Input size="sm" placeholder="Small input" />
    <Input size="md" placeholder="Medium input" />
    <Input size="lg" placeholder="Large input" />
  </div>
)
```

## 状态（variant）

```tsx
import React from 'react'
import { Input } from '@cui/ui'

export default () => (
  <div className="space-y-4">
    <Input placeholder="默认状态" />
    <Input variant="error" placeholder="错误状态" error="请输入正确的邮箱格式" />
    <Input variant="success" placeholder="成功状态" />
  </div>
)
```

## 带图标

```tsx
import React from 'react'
import { Input } from '@cui/ui'

export default () => (
  <div className="space-y-4">
    <Input icon="search" placeholder="搜索内容" />
    <Input icon="user" placeholder="用户名" />
    <Input icon="email" placeholder="邮箱地址" type="email" />
    <Input icon="lock" placeholder="密码" type="password" />
  </div>
)
```

## 禁用状态

```tsx
import React from 'react'
import { Input } from '@cui/ui'

export default () => (
  <div className="space-y-4">
    <Input disabled placeholder="禁用状态" />
    <Input icon="search" disabled placeholder="带图标的禁用状态" />
  </div>
)
```

## 只读状态

```tsx
import React from 'react'
import { Input } from '@cui/ui'

export default () => (
  <div className="space-y-4">
    <Input readOnly value="只读内容" />
    <Input icon="user" readOnly value="只读用户名" />
  </div>
)
```

## 表单验证

```tsx
import React, { useState } from 'react'
import { Input } from '@cui/ui'

export default () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (value: string) => {
    if (!value) {
      setError('邮箱不能为空')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setError('请输入正确的邮箱格式')
      return
    }
    setError('')
  }

  return (
    <div className="space-y-4">
      <Input
        type="email"
        placeholder="请输入邮箱"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          validateEmail(e.target.value)
        }}
        variant={error ? 'error' : 'default'}
        error={error}
      />
    </div>
  )
}
```

## 完整示例

```tsx
import React, { useState } from 'react'
import { Input } from '@cui/ui'

export default () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))

    // 清除错误
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  return (
    <div className="space-y-4 max-w-md">
      <Input
        placeholder="用户名"
        value={formData.username}
        onChange={handleInputChange('username')}
        variant={errors.username ? 'error' : 'default'}
        error={errors.username}
        icon="user"
      />

      <Input
        type="email"
        placeholder="邮箱地址"
        value={formData.email}
        onChange={handleInputChange('email')}
        variant={errors.email ? 'error' : 'default'}
        error={errors.email}
        icon="email"
      />

      <Input
        type="password"
        placeholder="密码"
        value={formData.password}
        onChange={handleInputChange('password')}
        variant={errors.password ? 'error' : 'default'}
        error={errors.password}
        icon="lock"
      />

      <Input type="submit" value="注册" className="cursor-pointer" />
    </div>
  )
}
```

## API

### InputProps

| 属性         | 说明           | 类型                                         | 默认值      | 版本 |
| ------------ | -------------- | -------------------------------------------- | ----------- | ---- |
| type         | 输入框类型     | `InputType`                                  | `'text'`    | -    |
| size         | 输入框尺寸     | `'sm' \| 'md' \| 'lg'`                       | `'md'`      | -    |
| variant      | 输入框状态     | `'default' \| 'error' \| 'success'`          | `'default'` | -    |
| placeholder  | 占位符文本     | `string`                                     | -           | -    |
| value        | 输入框的值     | `string`                                     | -           | -    |
| defaultValue | 输入框的默认值 | `string`                                     | -           | -    |
| disabled     | 是否禁用       | `boolean`                                    | `false`     | -    |
| readOnly     | 是否只读       | `boolean`                                    | `false`     | -    |
| required     | 是否必填       | `boolean`                                    | `false`     | -    |
| autoFocus    | 是否自动聚焦   | `boolean`                                    | `false`     | -    |
| icon         | 图标名称       | `string`                                     | -           | -    |
| error        | 错误信息       | `string`                                     | -           | -    |
| className    | 自定义CSS类名  | `string`                                     | -           | -    |
| id           | 输入框的id     | `string`                                     | -           | -    |
| name         | 输入框的name   | `string`                                     | -           | -    |
| onChange     | 输入框变化回调 | `(e: ChangeEvent<HTMLInputElement>) => void` | -           | -    |
| onFocus      | 输入框聚焦回调 | `(e: FocusEvent<HTMLInputElement>) => void`  | -           | -    |
| onBlur       | 输入框失焦回调 | `(e: FocusEvent<HTMLInputElement>) => void`  | -           | -    |

### InputType

支持所有HTML5输入框类型：

- `text` - 文本输入
- `password` - 密码输入
- `email` - 邮箱输入
- `number` - 数字输入
- `tel` - 电话输入
- `url` - 链接输入
- `search` - 搜索输入
- `date` - 日期输入
- `time` - 时间输入
- `datetime-local` - 日期时间输入
- `month` - 月份输入
- `week` - 星期输入
- `file` - 文件输入
- `range` - 范围输入
- `color` - 颜色输入

### 样式定制

Input组件使用CSS变量进行样式定制：

```css
:root {
  --outline-color: #ffffff;
  --outline-color-border: #e5e7eb;
  --text-color: #1e293b;
  --text-color-secondary: #64748b;
  --primary-color: #2563eb;
  --info-color: #2563eb;
}
```

支持所有原生 `input` 元素的属性和事件。
