import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This will proxy all requests starting with /api to your Express server
      '/api': {
        target: 'http://127.0.0.1:3000', // Your Express server URL
        changeOrigin: true,
        // You can remove the pathRewrite if your backend URLs actually start with /api
        // pathRewrite: {'^/api': ''}
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      }
    }
  }
})
