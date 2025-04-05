import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../utils'

export default defineEventHandler(async (event) => {
  const data = await serverSupabaseUser(event)
  if (!data) {
    return { error: 'No user found' }
  }

  const client = await serverSupabaseClient(event)
  
  const { data: user, error: userError } = await client
      .from('users')
      .select('*')
      .eq('id', data?.id)
      .single()
  
  if (userError) {
    return { error: getErrorMessage(userError, 'fetch user error') }
  }

  // Get user info from public.shops
  const { data: shop, error: shopError } = await client
      .from('shops')
      .select('*')
      .eq('user_id', user.id)
      .single()

  if (shopError) {
    return { error: getErrorMessage(shopError, 'fetch shop error') }
  }
    
  return { user, shop }
})
