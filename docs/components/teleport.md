---
title: Teleport 提示
order: 8
---

# Teleport 提示

轻量级全局提示工具，支持多种状态、位置、可关闭/自动关闭、以及手动清理。

## 基本用法

```tsx
import React from 'react'
import { Button, Teleport } from '@cui/ui'

export default () => (
  <Button
    type="primary"
    onClick={() => Teleport.show({ content: '保存成功 🎉', variant: 'success' })}
  >
    显示提示
  </Button>
)
```

## 状态 & 图标

```tsx
import React from 'react'
import { Button, Teleport } from '@cui/ui'

const variants = [
  { label: '默认', variant: 'default', content: '这是一条普通提示' },
  { label: '信息', variant: 'info', content: '同步中，请稍候…' },
  { label: '成功', variant: 'success', content: '创建成功！' },
  { label: '警告', variant: 'warning', content: '将覆盖现有配置，请确认' },
  { label: '错误', variant: 'danger', content: '删除失败，请稍后重试' },
]

export default () => (
  <div className="flex flex-wrap gap-2">
    {variants.map((item) => (
      <Button
        key={item.variant}
        size="sm"
        onClick={() => Teleport.show({ ...item, closable: true })}
      >
        {item.label}
      </Button>
    ))}
  </div>
)
```

## 持久化提示与手动关闭

```tsx
import React from 'react'
import { Button, Teleport } from '@cui/ui'

export default () => {
  const handleStart = () => {
    const toast = Teleport.show({
      content: '正在上传文件...',
      variant: 'info',
      duration: 0, // 不自动关闭
    })

    setTimeout(() => {
      toast?.close()
      Teleport.show({ content: '上传完成 ✅', variant: 'success' })
    }, 1800)
  }

  return (
    <Button type="primary" onClick={handleStart}>
      模拟上传
    </Button>
  )
}
```

## 不同位置

```tsx
import React from 'react'
import { Button, Teleport } from '@cui/ui'

const positions = [
  { label: '顶部', position: 'top' },
  { label: '中部', position: 'middle' },
  { label: '底部', position: 'bottom' },
]

export default () => (
  <div className="flex gap-2">
    {positions.map((item) => (
      <Button
        key={item.position}
        size="sm"
        onClick={() =>
          Teleport.show({
            content: `出现在 ${item.label}`,
            position: item.position,
            variant: 'info',
          })
        }
      >
        {item.label}
      </Button>
    ))}
  </div>
)
```

## 清理所有提示

```tsx
import React from 'react'
import { Button, Teleport } from '@cui/ui'

export default () => (
  <div className="flex gap-2">
    <Button
      onClick={() => {
        Teleport.show({ content: '稍后自动关闭' })
        Teleport.show({ content: '中间位置', position: 'middle', variant: 'info', duration: 0 })
      }}
    >
      生成提示
    </Button>
    <Button type="danger" onClick={() => Teleport.clear()}>
      清空全部
    </Button>
  </div>
)
```

## API

### Teleport.show(options)

- 参数：`options: TeleportOptions`
- 返回值：`{ id: string | number, close: () => void } | null`
- 当 `duration` 为 `0` 时默认会带关闭按钮，也可以通过 `closable` 手动控制。

### Teleport.hide(id)

- 参数：`id: string | number`
- 功能：根据 `show` 返回的 `id` 主动关闭对应提示。

### Teleport.clear(position?)

- 参数：`position?: 'top' | 'middle' | 'bottom'`
- 功能：清理指定位置或全部提示，并触发 `afterClose` 回调。

### TeleportOptions

| 属性       | 说明                                 | 类型                                                        | 默认值                  |
| ---------- | ------------------------------------ | ----------------------------------------------------------- | ----------------------- |
| content    | 提示内容（必填）                     | `ReactNode`                                                 | -                       |
| duration   | 自动关闭倒计时（毫秒，0 表示常驻）   | `number`                                                    | `2500`                  |
| afterClose | 关闭后回调                           | `() => void`                                                | -                       |
| position   | 出现位置                             | `'top' \| 'middle' \| 'bottom'`                             | `'top'`                 |
| variant    | 视觉风格                             | `'default' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'default'`             |
| icon       | 自定义图标节点                       | `ReactNode`                                                 | -                       |
| iconName   | 内置图标名称（优先级低于 `icon`）    | `string`                                                    | 根据 `variant` 自动匹配 |
| closable   | 是否显示右上角关闭按钮               | `boolean`                                                   | `duration === 0`        |
| className  | 自定义样式类名                       | `string`                                                    | -                       |
| style      | 自定义内联样式                       | `React.CSSProperties`                                       | -                       |
| key        | 自定义唯一标识（用于覆盖同一个提示） | `string \| number`                                          | 自动生成                |
| ariaRole   | 无障碍语义角色                       | `'status' \| 'alert'`                                       | `'status'`              |

### 类型补充

- `TeleportPosition`：`'top' \| 'middle' \| 'bottom'`
- `TeleportVariant`：`'default' \| 'info' \| 'success' \| 'warning' \| 'danger'`

> Teleport 在浏览器环境下工作，服务端渲染时自动安全降级。
