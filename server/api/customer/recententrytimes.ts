import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'

export default eventHandler(async (event) => {
  const query = await getQuery(event)
  const client = await serverSupabaseClient(event)

  try {
    const { data, error } = await client
      .from('entries')
      .select('entry_number, entered_at, visitor_count')
      .eq('shop_id', query.shopId)
      .eq('status', 'entered')
      .not('entered_at', 'is', null)
      .order('entered_at', { ascending: false })
      .limit(10);

    if (error) {
      return { error: getErrorMessage(error, '最近の入店情報の取得に失敗しました') };
    }

    return { entries: data }
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
