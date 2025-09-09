import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // Vercel expects this folder as output
  },
  server: {
    port: 3000,      // local dev port
    open: true,      // auto-open browser on dev
  },
})
