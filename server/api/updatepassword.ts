import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../utils'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  const newPw = body.newPassword
  const confirmPw = body.confirmPassword

  if (newPw !== confirmPw) {
    return { error: 'Passwords do not match' }
  }

  const { error } = await client.auth.updateUser({
    password: newPw,
  })
  if (error) {
    return { error: getErrorMessage(error, 'update password error') }
  }

  // Sign out after updating password　自動ログインされるため。
  const { error: signoutError } = await client.auth.signOut()
  if (signoutError) {
    return { error: getErrorMessage(signoutError, 'update password error') }
  }
})
