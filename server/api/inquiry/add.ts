import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'
import { getInquiriesWithComments } from './util'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  try {
    const { error: insertError } = await client
      .from('inquiries')
      .insert(body)
    
    if (insertError) {
      return { error: getErrorMessage(insertError, 'server.error.addInquiryFailed') };
    }

    return getInquiriesWithComments(client)
  } catch (error) {
    return { error: 'server.error.unexpected' };
  }
})