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
      return { error: getErrorMessage(error, '退店処理に失敗しました') };
    }

    return true;
  }
  catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
