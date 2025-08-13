import { fileURLToPath, URL } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    '@nuxt/test-utils/module',
    '@nuxt/icon',
    'nuxt-anchorscroll',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'ja', name: 'Japaness', file: 'ja.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ko', name: 'Korean', file: 'ko.json' },
    ],
    defaultLocale: 'en',
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: [
        '/', '/services', '/inquiry', '/inquiry/**', '/signup', '/updatepassword', 
        '/dashboard/create-entry-id/**', '/dashboard/customer/**', '/dashboard/canceled',],
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
  },
  runtimeConfig: {
    public: {
      QR_CODE_MOVE_PAGE_URL: process.env.QR_CODE_MOVE_PAGE_URL || 'http://localhost:3000',
    }
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '@Servers': fileURLToPath(new URL('./servers', import.meta.url)),
    '@Components': fileURLToPath(new URL('./components', import.meta.url)),
    '@Composables': fileURLToPath(new URL('./composables', import.meta.url)),
    '@Layouts': fileURLToPath(new URL('./layouts', import.meta.url)),
    '@Pages': fileURLToPath(new URL('./pages', import.meta.url)),
    '@Stores': fileURLToPath(new URL('./stores', import.meta.url)),
  },
})