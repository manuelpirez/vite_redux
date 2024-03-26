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
      // asstes
      '@': path.resolve(__dirname, './src/'),
      '@public': path.resolve(__dirname, './public/'),
      '@static': path.resolve(__dirname, './src/static/'),
      // services
      '@api': path.resolve(__dirname, './src/features/api'),
      '@features': path.resolve(__dirname, './src/features/'),
      // utils
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@theme': path.resolve(__dirname, './src/style/'),
      '@config': path.resolve(__dirname, './src/site.config.json'),
      // controllers, ui & providers
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@auth': path.resolve(__dirname, './src/components/auth'),
      '@providers': path.resolve(__dirname, './src/components/providers'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@controllers': path.resolve(__dirname, './src/components/controllers'),
      // tests config
      '@test': path.resolve(__dirname, './test')
    }
  }
})
