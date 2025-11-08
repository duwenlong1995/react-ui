---
title: Dialog 对话框
order: 2
---

# Dialog 对话框

用于展示重要信息或执行确认操作的模态对话框，支持尺寸、对齐、按钮组与可访问性增强。

## 基本用法

```tsx
import React, { useState } from 'react'
import { Button, Modal } from '@cui/ui'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开对话框
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="创建项目"
        description="填写项目信息后点击创建。"
        secondaryActions={[
          {
            key: 'cancel',
            label: '取消',
            variant: 'outline',
            onClick: () => setOpen(false),
          },
        ]}
        actions={[
          {
            key: 'create',
            label: '创建',
            variant: 'primary',
            onClick: () => setOpen(false),
          },
        ]}
      >
        <p className="text-sm leading-relaxed text-[var(--text-color-secondary)]">
          对话框主体支持放置任意内容，例如表单、图表或说明文本。默认提供遮罩、ESC
          关闭与焦点自动回到触发源的可访问性体验。
        </p>
      </Modal>
    </>
  )
}
```

## 尺寸与对齐

```tsx
import React, { useState } from 'react'
import { Button, Modal } from '@cui/ui'

const SizeExample = () => {
  const [state, setState] = useState<{
    open: boolean
    size: 'sm' | 'md' | 'lg' | 'xl'
    align: 'center' | 'top'
  }>({
    open: false,
    size: 'md',
    align: 'center',
  })

  const openWith = (size: 'sm' | 'md' | 'lg' | 'xl', align: 'center' | 'top' = 'center') => {
    setState({ open: true, size, align })
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => openWith('sm')}>
        小尺寸
      </Button>
      <Button size="sm" onClick={() => openWith('md')}>
        中尺寸
      </Button>
      <Button size="sm" onClick={() => openWith('lg')}>
        大尺寸
      </Button>
      <Button size="sm" onClick={() => openWith('xl')}>
        超大尺寸
      </Button>
      <Button size="sm" type="outline" onClick={() => openWith('md', 'top')}>
        顶部展示
      </Button>

      <Modal
        open={state.open}
        size={state.size}
        align={state.align}
        onClose={() => setState((prev) => ({ ...prev, open: false }))}
        title="不同尺寸"
        description="根据内容选择合适的尺寸，也可以将对话框对齐到页面顶部。"
        actions={[
          {
            key: 'confirm',
            label: '我知道了',
            variant: 'primary',
            onClick: () => setState((prev) => ({ ...prev, open: false })),
          },
        ]}
      >
        <div className="space-y-2 text-sm text-[var(--text-color-secondary)]">
          <p>• `size` 支持 `sm`、`md`、`lg`、`xl`，默认 `md`。</p>
          <p>• `align` 可选 `center`（垂直居中）或 `top`（顶部出现）。</p>
        </div>
      </Modal>
    </div>
  )
}

export default SizeExample
```

## 自定义底部与异步状态

```tsx
import React, { useState } from 'react'
import { Button, Modal } from '@cui/ui'

export default () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setLoading(false)
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>异步保存</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="保存设置"
        closeOnBackdrop={!loading}
        closeOnEsc={!loading}
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="outline" onClick={() => setOpen(false)} disabled={loading}>
              取消
            </Button>
            <Button type="primary" loading={loading} onClick={handleSubmit}>
              {loading ? '保存中...' : '保存'}
            </Button>
          </div>
        }
      >
        <p className="text-sm leading-relaxed text-[var(--text-color-secondary)]">
          自定义 `footer` 可以完全接管底部区域，常用于复杂场景或按钮布局特别定制的需求。
        </p>
      </Modal>
    </>
  )
}
```

## 禁用遮罩关闭

```tsx
import React, { useState } from 'react'
import { Button, Modal } from '@cui/ui'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="danger" onClick={() => setOpen(true)}>
        强制确认
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="删除确认"
        description="此操作无法撤销，请确认是否继续。"
        closeOnBackdrop={false}
        secondaryActions={[
          {
            key: 'cancel',
            label: '取消',
            variant: 'outline',
            onClick: () => setOpen(false),
          },
        ]}
        actions={[
          {
            key: 'delete',
            label: '删除',
            variant: 'danger',
            onClick: () => setOpen(false),
          },
        ]}
      />
    </>
  )
}
```

## API

### ModalProps

| 属性             | 说明                                  | 类型                           | 默认值     |
| ---------------- | ------------------------------------- | ------------------------------ | ---------- |
| open             | 是否显示对话框                        | `boolean`                      | `false`    |
| onClose          | 关闭回调                              | `() => void`                   | -          |
| title            | 标题内容                              | `ReactNode`                    | -          |
| description      | 描述文本                              | `ReactNode`                    | -          |
| children         | 主体内容                              | `ReactNode`                    | -          |
| className        | 内容容器额外类名                      | `string`                       | -          |
| actions          | 右侧主按钮数组                        | `DialogAction[]`               | `[]`       |
| secondaryActions | 左侧次按钮数组                        | `DialogAction[]`               | `[]`       |
| footer           | 自定义底部（提供时覆盖 actions 渲染） | `ReactNode`                    | -          |
| showCloseButton  | 是否显示右上角关闭按钮                | `boolean`                      | `true`     |
| closeOnBackdrop  | 点击遮罩是否关闭                      | `boolean`                      | `true`     |
| closeOnEsc       | 按下 `Esc` 是否关闭                   | `boolean`                      | `true`     |
| size             | 对话框宽度                            | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`     |
| align            | 垂直对齐方式                          | `'center' \| 'top'`            | `'center'` |
| contentClassName | 内容容器额外类名（兼容旧写法）        | `string`                       | -          |
| headerClassName  | 头部区域额外类名                      | `string`                       | -          |
| footerClassName  | 底部区域额外类名                      | `string`                       | -          |
| overlayClassName | 遮罩层额外类名                        | `string`                       | -          |
| initialFocusRef  | 初始聚焦的元素引用                    | `RefObject<HTMLElement>`       | -          |

> 组件同时兼容旧版 `config` 写法，老代码可逐步迁移到新的属性模式。

### DialogAction

| 属性         | 说明                 | 类型                                             | 默认值   |
| ------------ | -------------------- | ------------------------------------------------ | -------- |
| key          | 唯一标识（推荐）     | `string`                                         | -        |
| label        | 按钮文本             | `ReactNode`                                      | -        |
| onClick      | 点击回调             | `(event: MouseEvent<HTMLButtonElement>) => void` | -        |
| variant      | 使用按钮的类型       | `ButtonProps['type']`                            | -        |
| icon         | 按钮图标名称         | `string`                                         | -        |
| iconPosition | 图标位置             | `'left' \| 'right'`                              | `'left'` |
| loading      | 是否为加载状态       | `boolean`                                        | `false`  |
| disabled     | 是否禁用             | `boolean`                                        | `false`  |
| className    | 按钮额外类名         | `string`                                         | -        |
| autoClose    | 点击后自动关闭对话框 | `boolean`                                        | `false`  |

> 主按钮默认渲染为 `primary` 样式，次按钮默认渲染为 `outline` 样式，亦可通过 `variant` 覆盖。

### 样式变量

对话框使用与按钮/输入一致的 CSS 变量，可通过覆盖 `:root` 中的变量进行主题定制，例如：

```css
:root {
  --bg-opacity-color: rgb(15 23 42 / 0.45);
  --outline-color-border: #e2e8f0;
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```
