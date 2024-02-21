/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@static': path.resolve(__dirname, './src/static/'),
      '@features': path.resolve(__dirname, './src/features/'),
      '@api': path.resolve(__dirname, './src/features/api'),
      '@public': path.resolve(__dirname, './public/'),
      '@config': path.resolve(__dirname, './src/site.config.json'),
      '@services': path.resolve(__dirname, './services')
    }
  }
})
