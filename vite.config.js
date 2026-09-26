import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths: with HashRouter every page is served from index.html,
  // so the build works under any GitHub Pages repo name without configuration.
  base: './',
  test: {
    // Unit tests only; the browser specs in e2e/ run under Playwright.
    include: ['src/**/*.test.js'],
  },
})
