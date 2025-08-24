import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../../../../utils'
import { getInquiriesWithComments } from '../../../util'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)
  const inquiryId = getRouterParam(event, 'id')
  const commentId = getRouterParam(event, 'commentId')

  try {
    const { error: updateError } = await client
      .from('inquiry_comments')
      .update({ content: body.content ,updated_at: new Date() })
      .eq('id', commentId)
      .eq('inquiry_id', inquiryId)
      .eq('user_id', body.user_id)
    
    if (updateError) {
      return { error: getErrorMessage(updateError, 'server.error.editCommentFailed') };
    }

    return getInquiriesWithComments(client)
  } catch (error) {
    return { error: 'server.error.unexpected' };
  }
})