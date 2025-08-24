import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'

export default eventHandler(async (event) => {
  const query = await getQuery(event)
  const client = await serverSupabaseClient(event)

  try {
    const { data: entry, error } = await client
      .from('entries')
      .select('is_called')
      .eq('id', query.entryId)
      .single();

    if (error) {
      return { error: getErrorMessage(error, 'server.error.fetchCallInfoFailed') };
    }

    return entry;
  }
  catch (error) {
    return { error: 'server.error.unexpected' }
  }
})