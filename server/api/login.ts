import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  const { data, error } = await client.auth.verifyOtp({
    email: body.email,
    token: body.token,
    type: 'email',
  })

  return { data, error }
})
