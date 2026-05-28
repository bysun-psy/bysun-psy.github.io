import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export type Item = {
  id: number
  name: string
  use_id: number
  space: string
  group: string
  cell: string
  qty: number
  min: number | null
  spec: string
  note: string
  received: string
  created_at: string
  updated_at: string
  updated_by: string
}

export function useItems() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  // 초기 데이터 로드
  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('id', { ascending: true })
    if (!error && data) setItems(data)
    setLoading(false)
  }

  // Realtime 구독 — 다른 사용자의 변경사항 즉시 반영
  useEffect(() => {
    fetchItems()
    const channel = supabase
      .channel('items-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'items' }, () => {
        fetchItems() // 변경 감지 시 전체 재조회
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  // 생성 또는 수정
  const upsertItem = async (data: Partial<Item>, userName: string) => {
    const payload = {
      ...data,
      updated_at: new Date().toISOString(),
      updated_by: userName,
      ...(data.id ? {} : { created_at: new Date().toISOString() }),
    }
    const { data: result, error } = await supabase
      .from('items')
      .upsert(payload)
      .select()
      .single()
    if (error) throw error
    return result
  }

  // 단건 삭제
  const deleteItem = async (id: number) => {
    const { error } = await supabase.from('items').delete().eq('id', id)
    if (error) throw error
  }

  // 다건 삭제
  const deleteItems = async (ids: number[]) => {
    const { error } = await supabase.from('items').delete().in('id', ids)
    if (error) throw error
  }

  return { items, loading, upsertItem, deleteItem, deleteItems }
}
