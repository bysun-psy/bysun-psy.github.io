import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !key) throw new Error('Supabase 환경변수가 설정되지 않았습니다.')

export const supabase = createClient(url, key)
