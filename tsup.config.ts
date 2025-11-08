import { defineConfig } from 'tsup'
import svgr from 'esbuild-plugin-svgr'
import type { Plugin } from 'esbuild'
import path from 'path'

const stripSvgReactQuery: Plugin = {
  name: 'strip-svg-react-query',
  setup(build) {
    build.onResolve({ filter: /\.svg\?react$/ }, (args) => {
      const resolved = path.resolve(args.resolveDir, args.path.replace(/\?react$/, ''))
      return { path: resolved, namespace: 'file' }
    })
  },
}

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: 'es2018',
  minify: false,
  splitting: true,
  outDir: 'dist',
  external: ['react', 'react-dom'],
  esbuildPlugins: [stripSvgReactQuery, svgr()],
  outExtension({ format }) {
    return { js: format === 'esm' ? '.mjs' : '.cjs' }
  },
  ignoreWatch: ['**/*.docs'],
})
