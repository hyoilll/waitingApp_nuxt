import { serverSupabaseClient } from '#supabase/server'
import { getInquiriesWithComments } from './util'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  try {
    return getInquiriesWithComments(client)
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
