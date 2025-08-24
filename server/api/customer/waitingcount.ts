import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'

export default eventHandler(async (event) => {
  const query = await getQuery(event)
  const client = await serverSupabaseClient(event)

  try {
    const { count, error } = await client
      .from('entries')
      .select('id', { count: 'exact' })
      .eq('shop_id', query.shopId)
      .lt('entry_number', query.entryNumber)
      .is('entered_at', null)
      .eq('status', 'waiting')
    
    if (error) {
      return { error: getErrorMessage(error, 'server.error.fetchWaitingCountFailed') };
    }

    return { count };
  } catch (error) {
    return { error: 'server.error.unexpected' };
  }
})