import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../utils'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  const { data, error } = await client.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  })

  if (error) {
    return { error: getErrorMessage(error, 'sign in error') }
  }

  // Get user info from public.users
  const { data: user, error: userError } = await client
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single()

  if (userError) {
    return { error: getErrorMessage(userError, 'sign in error') }
  }
  
  return { user }
})
