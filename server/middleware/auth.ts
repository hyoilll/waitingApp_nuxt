import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const path = event.node.req.url
  if (path === '/login' || path === '/signup') {
    const user = await serverSupabaseUser(event)

    if (user) {
      return await sendRedirect(event, '/', 302)
    }
  }
})
