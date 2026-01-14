import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use environment variable to switch between backends
// VITE_BACKEND_PORT: '3000' (dev-nodejs: Node.js + Express)
//                  : '8000' (dev-python: FastAPI + Python)
const backendPort = process.env.VITE_BACKEND_PORT || '3000'
const backendTarget = `http://localhost:${backendPort}`

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
      }
    }
  }
})
