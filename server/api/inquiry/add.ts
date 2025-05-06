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
      return { error: getErrorMessage(insertError, '問い合わせの追加に失敗しました') };
    }

    return getInquiriesWithComments(client)
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
