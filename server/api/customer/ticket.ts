import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'
import { v4 as uuidv4 } from 'uuid'

export default eventHandler(async (event) => {
  const query = await getQuery(event)
  const client = await serverSupabaseClient(event)

  // --- Server-side Validation ---
  const visitorCountRaw = query.visitorCount
  if (visitorCountRaw === null || visitorCountRaw === undefined) {
    setResponseStatus(event, 400)
    return { error: '人数が指定されていません。' }
  }

  const visitorCount = Number(visitorCountRaw)
  if (isNaN(visitorCount) || !Number.isInteger(visitorCount) || visitorCount < 1 || visitorCount > 30) {
    setResponseStatus(event, 400)
    return { error: '人数の値が不正です。1から30までの整数で指定してください。' }
  }
  // --- End of Validation ---

  try {
    // 1. shops テーブルの current_number をインクリメント
    // まず current_number を取得
    const { data: shopData, error: selectError } = await client
      .from('shops')
      .select('id, current_number')
      .eq('id', query.shopId)
      .single();

    if (selectError || !shopData) {
      return { error: getErrorMessage(selectError, '整理番号の取得に失敗しました') };
    }

    const newCurrentNumber = shopData.current_number + 1;

    // 次に current_number を更新
    const { data: updatedShop, error: incrementError } = await client
      .from('shops')
      .update({ current_number: newCurrentNumber })
      .eq('id', shopData.id)
      .select('current_number')
      .single();

    if (incrementError || !updatedShop) {
      return { error: getErrorMessage(incrementError, '整理番号の更新に失敗しました') };
    }

    const newTicketNumber = updatedShop.current_number;

    // 2. entries テーブルに新しいエントリーを作成
    const { data: newEntry, error: entryError } = await client
      .from('entries')
      .insert([{ id: uuidv4(), shop_id: shopData.id, entry_number: newTicketNumber, visitor_count: visitorCount }])
      .select('id')
      .single();

    if (entryError || !newEntry) {
      return { error: getErrorMessage(entryError, '整理番号の発行に失敗しました') };
    }

    return newEntry; // 発行された整理番号とエントリーIDを返す
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})