import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../utils'
import dayjs from 'dayjs';
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  try {
    const { error } = await client
      .from('entries')
      .update({ exited_at: dayjs().add(9, 'hour').toISOString(), status: 'exited' })
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
