import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../../../utils'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  try {
    const { error: insertError } = await client
      .from('inquiry_comments')
      .insert(body)

    if (insertError) {
      return { error: getErrorMessage(insertError, '問い合わせコメントのリスト取得に失敗しました') };
    }

    const {data, error: selectError} = await client
      .from('inquiry_comments')
      .select('*, user:users(email)')
      .eq('inquiry_id', body.inquiry_id)

      if (selectError) {
      return { error: getErrorMessage(selectError, '問い合わせコメントのリスト取得に失敗しました') };
    }

    return { data };
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
