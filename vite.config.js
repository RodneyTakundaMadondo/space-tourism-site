import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/space-tourism-site/',
  server: {
    open: true, // This will automatically open the browser
    host:true,
  },
  plugins: [react()],
})
//192.168.0.159