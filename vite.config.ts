import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

declare const process: {
  cwd(): string
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': `${process.cwd()}/src`,
    },
  },
})
