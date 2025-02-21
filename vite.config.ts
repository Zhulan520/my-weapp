import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@/services/utils',
        replacement: path.resolve(__dirname, 'src/services/utils.ts')
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  }
})