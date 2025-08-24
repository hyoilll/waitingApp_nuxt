import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../../../utils'
import { getInquiriesWithComments } from '../../util'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)
  const inquiryId = getRouterParam(event, 'id')
  try {
    const { error: insertError } = await client
      .from('inquiry_comments')
      .insert({
        ...body,
        inquiry_id: inquiryId,
      })
    
    if (insertError) {
      return { error: getErrorMessage(insertError, 'server.error.addCommentFailed') };
    }

    return getInquiriesWithComments(client)
  } catch (error) {
    return { error: 'server.error.unexpected' };
  }
})