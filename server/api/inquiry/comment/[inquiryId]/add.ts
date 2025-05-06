import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../../../utils'
import { getInquiriesWithComments } from '../../util'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)
  const inquiryId = event.context.params?.inquiryId;

  try {
    const { error: insertError } = await client
      .from('inquiry_comments')
      .insert({
        ...body,
        inquiry_id: inquiryId,
      })

    if (insertError) {
      return { error: getErrorMessage(insertError, '問い合わせコメントのリスト取得に失敗しました') };
    }

    return getInquiriesWithComments(client)
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
