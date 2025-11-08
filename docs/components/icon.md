---
title: Icon 图标
order: 7
---

# Icon 图标

统一的内置 SVG 图标组件，支持尺寸与颜色控制。

## 基本用法

```tsx
import React from 'react'
import { Icon } from '@cui/ui'

export default () => (
  <div className="flex items-center gap-4">
    <Icon iconName="search" />
    <Icon iconName="home" color="#3b82f6" />
    <Icon iconName="alert" color="#ef4444" />
  </div>
)
```

## 尺寸

```tsx
import React from 'react'
import { Icon } from '@cui/ui'

export default () => (
  <div className="flex items-end gap-6">
    <Icon iconName="rocket" width="16" height="16" />
    <Icon iconName="rocket" width="20" height="20" />
    <Icon iconName="rocket" width="28" height="28" />
  </div>
)
```

## 自定义 SVG

```tsx
import React from 'react'
import { Icon } from '@cui/ui'

const Custom = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
  </svg>
)

export default () => (
  <div className="flex gap-4">
    <Icon svg={Custom} />
    <Icon svg={Custom} className="text-blue-600" />
  </div>
)
```

## 可用图标清单

```tsx
import React from 'react'
import { Icon } from '@cui/ui'

const names = [
  'search',
  'home',
  'homeOutline',
  'user',
  'userOutline',
  'setting',
  'settingOutline',
  'alert',
  'bug',
  'api',
  'rocket',
  'back',
  'more',
  'copy',
  'delete',
  'edit',
  'info',
  'choose',
  'arrow_up',
  'arrow_down',
  'loading',
  'connect',
  'bubble',
  'bubbleOutline',
  'upload_success',
  'upload_defeat',
  'run_able',
  'modify',
  'watch_icon',
]

export default () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
    {names.map((n) => (
      <div
        key={n}
        className="flex flex-col items-center gap-2 rounded-md border p-3 text-xs hover:bg-gray-50"
      >
        <Icon iconName={n} />
        <span className="truncate w-full text-center">{n}</span>
      </div>
    ))}
  </div>
)
```

## API

- `iconName`: `string` 内置图标名
- `color`: `string` 填充色
- `width`/`height`: `string` 尺寸，默认 `20`
- `svg`: 自定义 React SVG 元素，提供时优先使用
