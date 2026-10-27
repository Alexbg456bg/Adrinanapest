import { readFile, writeFile } from 'node:fs/promises'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Два начина на хостинг:
//  - GitHub Pages (по подразбиране): сайтът е под /Adrinanapest/
//  - cPanel (`npm run build:cpanel`, mode "cpanel"): в корена на домейна, base "/"
const PAGES_BASE = '/Adrinanapest/'

// public/404.html е статичен файл (не минава през Vite) и има твърдо зададен
// път към началната страница — подменяме го според избрания base.
function rewrite404Base(base) {
  return {
    name: 'rewrite-404-base',
    apply: 'build',
    async closeBundle() {
      const file = 'dist/404.html'
      try {
        const html = await readFile(file, 'utf8')
        await writeFile(file, html.replaceAll(PAGES_BASE, base))
      } catch {
        // няма 404.html в изхода — нищо за подмяна
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const base = mode === 'cpanel' ? '/' : PAGES_BASE
  return {
    base,
    plugins: [react(), rewrite404Base(base)],
  }
})
