import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../utils'

export default eventHandler(async (event) => {
  const query = await readBody(event)
  const client = await serverSupabaseClient(event)

  try {
    const { error } = await client
    .from('entries')
    .update({ is_called: true })
    .eq('id', query.entryId);

    if (error) {
      return { error: getErrorMessage(error, '呼出処理に失敗しました') };
    }

    return true;
  }
  catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
