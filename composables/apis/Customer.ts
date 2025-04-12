import type { RealtimeChannel } from "@supabase/supabase-js";

/**
 * shopIdを使ってshop_nameを取得する
 * @param shopId 
 * @returns 
 */
export const getShopName = async (shopId: string) => {
  return await $fetch('/api/shopname', {
    method: 'GET',
    query: { shopId },
  })
}

/**
 * QRコード読み取り後に呼び出され、整理番号情報を返す
 * @param shopId 
 * @param visitorCount 
 * @returns 
 */
export const getTicket = async (shopId: string, visitorCount: number) => {
  return await $fetch('/api/ticket', {
    method: 'GET',
    query: { shopId, visitorCount },
  })
};

/**
 * 整理番号の詳細情報を取得する
 * @param entryId 
 * @returns 
 */
export const getEntryDetail = async (entryId: string) => {
  return await $fetch('/api/entrydetail', {
    method: 'GET',
    query: { entryId },
  })
}

/**
 * 呼び出されたかどうかを取得する
 * @param entryId 
 */
export const getIsCalled = async (entryId: string) => {
  return await $fetch('/api/iscalled', {
    method: 'GET',
    query: { entryId },
  })
}

/**
 * お待ちの人数 & 最近の入店リストのリアルタイム更新を監視
 * @param shopId 
 * @param fetchEnteredList 
 * @param fetchWaitingList 
 * @returns 
 */
export const subscribeToShop = async (shopId: string, entryId: string, fetchEnteredList: () => void, fetchWaitingList: () => void, fetchIsCalled: () => void): Promise<RealtimeChannel> => {
  const supabase = useSupabaseClient(); // Supabaseクライアントを取得
  const channel = supabase
    .channel(`shop:${shopId}/entry:${entryId}`) // 'shopId/entryId'に基づいてチャンネルを作成
    .on('postgres_changes', { event: '*', schema: 'public', table: 'entries', filter: `shop_id=eq.${shopId}` }, () => {
      // 'entries'テーブルの'shop_id'が指定された'shopId'と一致する行に対する全てのイベントを監視
      fetchEnteredList();
      fetchWaitingList();
      fetchIsCalled();
    })
    .subscribe(); // チャンネルにサブスクライブしてリアルタイム更新を開始

  return channel;
};

/**
 * チャンネルにサブスクライブしてリアルタイム更新を停止
 * @param channel 
 */
export const unsubscribeFromShop = (channel: RealtimeChannel): void => {
  channel.unsubscribe();
};

/**
 * 先に入店した顧客の入店時間を返す
 * @param shopId 
 * @returns 
 */
export const getRecentEntryTimes = async (shopId: string) => {
  return await $fetch('/api/recententrytimes', {
    method: 'GET',
    query: { shopId },
  })
}

/**
 * 待ち組数を返す
 * @param shopId 
 * @returns 
 */
export const getWaitingCount = async (shopId: string, entryNumber: number) => {
  return await $fetch('/api/waitingcount', {
    method: 'GET',
    query: { shopId, entryNumber },
  })
}

/**
 * @param entryId 
 * @returns 
 */
export const updateCancelWaiting = async (entryId: string) => {
  return await $fetch('/api/cancelwaiting', {
    method: 'PUT',
    body: { entryId },
  })
}