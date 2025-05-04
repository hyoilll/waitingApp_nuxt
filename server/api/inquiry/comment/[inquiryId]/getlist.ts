import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../../../utils'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const inquiryId = event.context.params?.inquiryId;

  if (!inquiryId) {
    return { error: 'IDが指定されていません' };
  }

  try {
    const { data, error } = await client
    .from('inquiry_comments')
    .select('*, user:users(email)')
    .eq('inquiry_id', inquiryId)

    if (error) {
      return { error: getErrorMessage(error, '問い合わせコメントのリスト取得に失敗しました') };
    }

    return { data };
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
