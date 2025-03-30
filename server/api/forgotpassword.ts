import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../utils'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  const { error } = await client.auth.resetPasswordForEmail(body.email, {
    redirectTo: body.redirectTo,
  })

  if (error) {
    return { error: getErrorMessage(error, 'forgot password error') }
  }
})
