import { defineConfig } from 'dumi'
import path from 'path'

const base = process.env.DUMI_BASE ?? '/'
const publicPath = process.env.DUMI_PUBLIC_PATH ?? '/'

export default defineConfig({
  base,
  publicPath,
  favicons: ['favicon.ico'],
  styles: ['/styles.css'],
  themeConfig: {
    name: '@cui/ui',
    nav: [
      { title: '按钮', link: '/components/button' },
      { title: '对话框', link: '/components/dialog' },
      { title: '提示', link: '/components/teleport' },
      { title: '甘特图', link: '/components/gantt-chart' },
      { title: '复选框', link: '/components/checkbox' },
      { title: '选项组', link: '/components/group' },
      { title: '输入框', link: '/components/input' },
      { title: '表单', link: '/components/form' },
      { title: '图标', link: '/components/icon' },
    ],
  },
  alias: {
    '@cui/ui': path.resolve(__dirname, 'src'),
  },
})
