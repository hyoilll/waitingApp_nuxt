import { serverSupabaseClient } from '#supabase/server'
import type { SignUpUserInfo } from '~/composables/types/Admin'
import { v4 as uuidv4 } from 'uuid'
import { getErrorMessage } from '../utils'

export default eventHandler(async (event) => {
  const body = await readBody<SignUpUserInfo>(event)
  const client = await serverSupabaseClient(event)

  // 1. signUp
  const { data, error: signupError } = await client.auth.signUp({
    email: body.email,
    password: body.password,
  })

  if (signupError) {
    return { error: getErrorMessage(signupError) }
  }

  // 2. signOut
  const { error: signoutError } = await client.auth.signOut()

  if (signoutError) {
    return { error: getErrorMessage(signoutError) }
  }

  // 3 & 4. insert userInfo to public.users and shopInfo to public.shops in parallel
  const id = data?.user ? data?.user.id : ''

  const [insertUserResult, insertShopResult] = await Promise.all([
    client.from('users').insert({
      id,
      email: body.email,
      shop_name: body.shopName,
    }),
    client.from('shops').insert({
      id: uuidv4(),
      user_id: id,
      current_number: 1,
    }),
  ])

  const insertUserError = insertUserResult.error
  const insertShopError = insertShopResult.error

  if (insertUserError) {
    return { error: getErrorMessage(insertUserError) }
  }

  if (insertShopError) {
    return { error: getErrorMessage(insertShopError) }
  }
})
