import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages에서 리포지토리 이름이 'username.github.io'인 경우 base를 '/'로 설정
  // 다른 이름인 경우 base를 '/리포지토리-이름/'으로 설정
  base: '/',
  build: {
    outDir: 'dist',
  },
})

