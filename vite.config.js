import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        luyagent: resolve('luyagent/index.html'),
        khmeradv: resolve('khmeradv/index.html'),
        khaudit: resolve('khaudit/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
})
