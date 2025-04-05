import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../utils'

export default eventHandler(async (event) => {
  const query = await getQuery(event)
  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from('shops')
    .select('shop_name:users (shop_name)')
    .eq('id', query.shopId)
    .single()

  if (error) {
    return { error: getErrorMessage(error) }
  }

  return data.shop_name
})
