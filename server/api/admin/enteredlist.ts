import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'

export default eventHandler(async (event) => {
  const query = await getQuery(event)
  const client = await serverSupabaseClient(event)

  try {
    const { data, error } = await client
    .from('entries')
    .select('*')
    .eq('shop_id', query.shopId)
    .not('entered_at', 'is', null)
    .eq('status', 'entered')
    .order('entered_at', { ascending: true });

    if (error) {
      return { error: getErrorMessage(error, 'server.error.fetchWaitingListFailed') };
    }

    return { data };
  } catch (error) {
    return { error: 'server.error.unexpected' };
  }
})