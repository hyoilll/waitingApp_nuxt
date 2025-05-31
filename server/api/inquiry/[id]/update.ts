import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../../utils'
import { getInquiriesWithComments } from '../util'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)
  const inquiryId = event.context.params?.id ?? '';

  try {
    const { error: updateError } = await client
      .from('inquiries')
      .update({ title: body.title, content: body.content, update_at: new Date() })
      .eq('id', inquiryId)
      .eq('user_id', body.user_id)

    if (updateError) {
      return { error: getErrorMessage(updateError, '問い合わせコメントの更新に失敗しました') };
    }

    return getInquiriesWithComments(client)
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
