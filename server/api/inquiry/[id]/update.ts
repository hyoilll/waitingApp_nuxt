import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../../utils'
import { getInquiriesWithComments } from '../util'

export default eventHandler(async (event) => {
  const inquiryId = getRouterParam(event, 'id')
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  try {
    const { error: updateError } = await client
      .from('inquiries')
      .update({ title: body.title, content: body.content, updated_at: new Date() })
      .eq('id', inquiryId)
      .eq('user_id', body.user_id)
    
    if (updateError) {
      return { error: getErrorMessage(updateError, 'server.error.updateInquiryFailed') };
    }

    return getInquiriesWithComments(client)
  } catch (error) {
    return { error: 'server.error.unexpected' };
  }
})