---
title: Button 按钮
order: 1
---

# Button 按钮

用于触发操作的按钮。

## 基本用法

```tsx
import React from 'react'
import { Button } from '@cui/ui'

export default () => (
  <div className="space-x-2">
    <Button>默认按钮</Button>
  </div>
)
```

## 类型（type）

```tsx
import React from 'react'
import { Button } from '@cui/ui'

export default () => (
  <div className="flex gap-2">
    <Button type="primary">Primary</Button>
    <Button type="link">Link</Button>
    <Button type="danger">Danger</Button>
    <Button type="submit">Submit</Button>
    <Button type="outline" block>
      Outline
    </Button>
  </div>
)
```

## 禁用状态

```tsx
import React from 'react'
import { Button } from '@cui/ui'

export default () => (
  <div className="flex gap-2">
    <Button disabled>禁用</Button>
    <Button type="outline" disabled>
      禁用
    </Button>
  </div>
)
```

## 尺寸（size）

```tsx
import React from 'react'
import { Button } from '@cui/ui'

export default () => (
  <div className="flex items-end gap-2">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
)
```

## 图标与加载

```tsx
import React from 'react'
import { Button } from '@cui/ui'

export default () => (
  <div className="flex flex-col gap-3">
    <div className="flex gap-2">
      <Button icon="search">Search</Button>
      <Button icon="upload_success" iconPosition="right" type="primary">
        Upload
      </Button>
    </div>
    <div className="flex gap-2">
      <Button loading type="primary">
        Loading
      </Button>
      <Button loading size="sm">
        Loading
      </Button>
    </div>
  </div>
)
```

## API

- `type`: `'primary' | 'outline' | 'link' | 'danger' | 'submit'`，默认 `outline`
- `size`: `'sm' | 'md' | 'lg'`，默认 `md`
- `icon`: `string`（与内置图标名一致）
- `iconPosition`: `'left' | 'right'`，默认 `left`
- `loading`: `boolean` 加载态，禁用点击，自动展示内置 `loading` 图标
- `block`: `boolean` 是否撑满父容器宽度

支持原生 `button` 的全部属性，例如 `onClick`、`disabled` 等。
