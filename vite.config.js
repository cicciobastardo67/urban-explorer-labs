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
        about: resolve('about/index.html'),
        hermesPost: resolve('hermes-post/index.html'),
        kramos: resolve('kramos/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
})
