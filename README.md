# @cui/ui

React + TypeScript 组件库，使用 tsup 打包。

## 开发

```bash
npm install
npm run dev
npm run build
npm run lint
npm run format

npm run build:css
npm run docs:build
npm run docs:dev
```

## 使用

```tsx
import { Button } from '@cui/ui'

export default function App() {
  return <Button variant="primary">Hello</Button>
}
```

## 目录结构

```
src/
  components/
    Button.tsx
  index.ts
```
