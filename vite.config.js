/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@api': path.resolve(__dirname, './src/features/api'),
      '@public': path.resolve(__dirname, './public/'),
      '@static': path.resolve(__dirname, './src/static/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@config': path.resolve(__dirname, './src/site.config.json'),
      '@features': path.resolve(__dirname, './src/features/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@theme': path.resolve(__dirname, './src/style/'),
      '@ui': path.resolve(__dirname, './src/components/ui')
    }
  }
})
