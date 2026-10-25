import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Сайтът се хоства в GitHub Pages под /Adrinanapest/ — затова base не е "/".
export default defineConfig({
  base: '/Adrinanapest/',
  plugins: [react()],
})
