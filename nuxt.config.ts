import { fileURLToPath, URL } from 'node:url';
import type { LocaleType } from './components/common/LanguageSelector.vue';

const publicPages = [
  '/',
  '/Services',
  '/Inquiry',
  '/Inquiry/**',
  '/Login',
  '/Signup',
  '/updatepassword',
  '/dashboard/create-entry-id/**',
  '/dashboard/customer/**',
  '/dashboard/canceled',
];

const nonDefaultLocales = ['en', 'ko'];

const supabaseExcludePaths = [
  ...publicPages,
  ...nonDefaultLocales.flatMap(locale => [
    `/${locale}`,
    ...publicPages.filter(page => page !== '/').map(page => `/${locale}${page}`)
  ])
];

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
    defaultLocale: process.env.DEFAULT_LOCALE as LocaleType ?? 'ja',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
    }
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/dashboard/ModeSelect', '/dashboard/Admin', '/dashboard/QRCodeDisplay'],
      exclude: supabaseExcludePaths,
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
      DEFAULT_LOCALE: process.env.DEFAULT_LOCALE || 'ja',
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
