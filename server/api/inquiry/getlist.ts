import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  try {
    const { data, error } = await client
    .from('inquiries')
    .select('*')

    if (error) {
      return { error: getErrorMessage(error, '問い合わせのリスト取得に失敗しました') };
    }

    return { data };
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
