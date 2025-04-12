import type { RealtimeChannel } from "@supabase/supabase-js";

/**
 * 待っている順番のリストを返す
 * @param shopId 
 * @returns 
 */
export const getWaitingList = async (shopId: string) => {
  return await $fetch('/api/waitinglist', {
    method: 'GET',
    query: { shopId },
  })
};

/**
 * 入店済みのリストを返す
 * @param shopId 
 * @returns 
 */
export const getEnteredList = async (shopId: string) => {
  return await $fetch('/api/enteredlist', {
    method: 'GET',
    query: { shopId },
  })
};

/**
 * 入店済み & 順番待ちリストのリアルタイム更新を監視
 * @param shopId 
 * @param fetchEnteredList 
 * @param fetchWaitingList 
 * @returns 
 */
export const subscribeToShopInAdmin = async (shopId: string, fetchEnteredList: () => void, fetchWaitingList: () => void): Promise<RealtimeChannel> => {
  const supabase = useSupabaseClient(); // Supabaseクライアントを取得
  const channel = supabase
    .channel(`shop:${shopId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'entries', filter: `shop_id=eq.${shopId}` }, () => {
        fetchEnteredList();
        fetchWaitingList();
      }
    )
    .subscribe();

  return channel;
}

/**
 * チャンネルにサブスクライブしてリアルタイム更新を停止
 * @param channel 
 */
export const unsubscribeFromShopInAdmin = (channel: RealtimeChannel): void => {
  channel.unsubscribe();
}

/**
 * 退室処理
 * @param entryId 
 * @returns 
 */
export const markAsExited = async (entryId: string) => {
  return await $fetch('/api/markexited', {
    method: 'PUT',
    body: { entryId },
  })
}

/**
 * 呼び出し処理
 * @param entryId 
 * @returns 
 */
export const markAsCalled = async (entryId: string) => {
  return await $fetch('/api/markcalled', {
    method: 'PUT',
    body: { entryId },
  })
}

/**
 * 入店処理
 * @param entryId 
 * @returns 
 */
export const markAsEntered = async (entryId: string) => {
  return await $fetch('/api/markentered', {
    method: 'PUT',
    body: { entryId },
  })
}

/**
 * キャンセル処理
 * @param entryId 
 * @returns 
 */
export const markAsCanceled = async (entryId: string) => { 
  return await $fetch('/api/markcanceled', {
    method: 'PUT',
    body: { entryId },
  })
}