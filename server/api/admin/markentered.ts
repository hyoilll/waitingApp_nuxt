import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'

interface EntryInfo {
  is_called: boolean;
}

export default eventHandler(async (event) => {
  const query = await readBody(event)
  const client = await serverSupabaseClient(event)

  try {
    const {data, error: selectError} = await client
      .from('entries')
      .select('is_called')
      .eq('id', query.entryId);

    if (selectError) {
      return { error: getErrorMessage(selectError, 'server.error.fetchEntryInfoFailed') };
    }

    if (data !== null && (data as EntryInfo[]).at(0)?.is_called === false) {
      return { error: 'server.error.callBeforeEntry' };
    }
    
    const { error } = await client
      .from('entries')
      .update({ status: 'entered', entered_at: new Date() })
      .eq('id', query.entryId);

    if (error) {
      return { error: getErrorMessage(error, 'server.error.enterFailed') };
    }

    return true;
  }
  catch (error) {
    return { error: 'server.error.unexpected' };
  }
})