import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        { find: 'api', replacement: './src/api' },
        { find: 'assets', replacement: './src/assets' },
        { find: 'components', replacement: './src/components' },
        { find: 'constants', replacement: './src/constants' },
        { find: 'context', replacement: './src/context' },
        { find: 'hooks', replacement: './src/hooks' }
      ]
    })
  ]
})
