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
    setupFiles: './test/setup.js',
    silent: true,
    coverage: {
      exclude: ['server', 'test', 'src/style']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@api': path.resolve(__dirname, './src/features/api'),
      '@auth': path.resolve(__dirname, './src/components/auth'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@config': path.resolve(__dirname, './src/site.config.json'),
      '@controllers': path.resolve(__dirname, './src/components/controllers'),
      '@features': path.resolve(__dirname, './src/features/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@providers': path.resolve(__dirname, './src/components/providers'),
      '@public': path.resolve(__dirname, './public/'),
      '@static': path.resolve(__dirname, './src/static/'),
      '@test': path.resolve(__dirname, './test'),
      '@theme': path.resolve(__dirname, './src/style/'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@utils': path.resolve(__dirname, './src/utils/')
    }
  }
})
