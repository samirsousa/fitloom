import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Caminho onde o app é servido. Local: raiz. No GitHub Pages o workflow define /fitloom/.
  base: process.env.PAGES_BASE || '/',
})
