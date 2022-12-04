import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import { defineConfig } from 'rollup'

export default defineConfig({
  input: 'packages/cli/lib/index.ts',
  output: {
    dir: 'packages/cli/dist',
    format: 'cjs',
    manualChunks(id) {
      if (id.includes('node_modules')) {
        return 'vendor'
      }
    },
    chunkFileNames: '[name].js'
  },
  sourcemap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        {
          modules: false
        }
      ]
    }),
    resolve(),
    commonjs({
      ignoreDynamicRequires: true
    }),
    typescript(),
    json()
  ]
})
