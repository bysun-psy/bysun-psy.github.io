// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 시 저장소 이름으로 base 설정
  // 예: https://username.github.io/sensestock/
  base: '/sensestock/',
})

// ─────────────────────────────────────────
// .env.local  (로컬 전용, .gitignore에 포함)
// ─────────────────────────────────────────
// VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
// VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// ─────────────────────────────────────────
// .env.example  (팀 공유용, git에 포함)
// ─────────────────────────────────────────
// VITE_SUPABASE_URL=your_supabase_project_url
// VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

// ─────────────────────────────────────────
// .gitignore에 반드시 추가
// ─────────────────────────────────────────
// .env.local
// .env*.local
