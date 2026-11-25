import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_PAGES === 'true' ? '/portfolio-2.0/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
