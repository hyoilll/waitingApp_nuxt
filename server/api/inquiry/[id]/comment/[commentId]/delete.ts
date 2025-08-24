import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../../../../utils'
import { getInquiriesWithComments } from '../../../util'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const inquiryId = getRouterParam(event, 'id')
  const commentId = getRouterParam(event, 'commentId')
  const client = await serverSupabaseClient(event)

  try {
    const { error: deleteError } = await client
      .from('inquiry_comments')
      .delete()
      .eq('id', commentId)
      .eq('inquiry_id', inquiryId)
      .eq('user_id', body.user_id)
    
    if (deleteError) {
      return { error: getErrorMessage(deleteError, 'server.error.deleteCommentFailed') };
    }

    return getInquiriesWithComments(client)
  } catch (error) {
    return { error: 'server.error.unexpected' };
  }
})