import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  try {
    const { error: insertError } = await client
      .from('inquiries')
      .insert(body)
    
    if (insertError) {
      return { error: getErrorMessage(insertError, '問い合わせの追加に失敗しました') };
    }

    const { data, error: selectError } = await client
      .from('inquiries')
      .select('*')

    if (selectError) {
      return { error: getErrorMessage(selectError, '問い合わせのリスト取得に失敗しました') };
    }

    return { data };
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
