import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Сайтът се хоства в cPanel в корена на домейна (adrinapest.com), затова base е "/".
export default defineConfig({
  plugins: [react()],
})
