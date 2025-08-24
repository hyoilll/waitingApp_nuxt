import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'

export default eventHandler(async (event) => {
  const query = await readBody(event)
  const client = await serverSupabaseClient(event)

  try {
    const { error } = await client
      .from('entries')
      .update({ status: 'cancelled' })
      .eq('id', query.entryId);

    if (error) {
      return { error: getErrorMessage(error, 'server.error.cancelFailed') };
    }

    return true;
  }
  catch (error) {
    return { error: 'server.error.unexpected' };
  }
})