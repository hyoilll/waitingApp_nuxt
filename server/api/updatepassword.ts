import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../utils'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  const newPw = body.newPassword
  const confirmPw = body.confirmPassword

  if (newPw !== confirmPw) {
    return { error: 'server.error.passwordsDoNotMatch' }
  }

  const { error } = await client.auth.updateUser({
    password: newPw,
  })
  if (error) {
    return { error: getErrorMessage(error, 'server.error.updatePasswordFailed') }
  }

  // Sign out after updating password　自動ログインされるため。
  const { error: signoutError } = await client.auth.signOut()
  if (signoutError) {
    return { error: getErrorMessage(signoutError, 'server.error.updatePasswordFailed') }
  }
})