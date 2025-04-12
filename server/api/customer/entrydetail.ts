import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'

export default eventHandler(async (event) => {
  const query = await getQuery(event)
  const client = await serverSupabaseClient(event)

  try {
    const { data: entry, error: entryError } = await client
    .from('entries')
    .select('entry_number, shop_id, is_called')
    .eq('id', query.entryId)
    .eq('status', 'waiting')
    .single();

    if (entryError) {
      return { error: getErrorMessage(entryError, 'エントリー情報の取得に失敗しました') };
    }

    return entry;
  } catch (error) {
    return { error: '予期せぬエラーが発生しました。' }
  }
})
