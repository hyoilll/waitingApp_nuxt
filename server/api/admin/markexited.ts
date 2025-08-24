import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  try {
    const { error } = await client
      .from('entries')
      .update({ exited_at: new Date(), status: 'exited' })
      .eq('id', body.entryId);

    if (error) {
      return { error: getErrorMessage(error, 'server.error.exitFailed') };
    }

    return true;
  }
  catch (error) {
    return { error: 'server.error.unexpected' };
  }
})