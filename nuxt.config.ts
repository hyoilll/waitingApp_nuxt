// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@pinia/nuxt', '@vueuse/nuxt', 'dayjs-nuxt'],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/', '/services', '/inquiry', '/signup', '/updatepassword'],
      saveRedirectToCookie: false,
    },
    cookieOptions: {
      path: '/',
      secure: false,
    }
  },
  routeRules: {
    '/dashboard/**': { ssr: false }
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  }
})