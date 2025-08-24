<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-black">
    <div class="w-full max-w-2xl px-4">
      <div
        class="rounded-lg bg-gray-800 p-8 text-center shadow-lg">
        <h1 class="mb-6 text-3xl font-bold text-white">
          {{ $t('dashboard.qrCodeDisplay.title') }}
        </h1>
        <div class="mb-6 flex justify-center">
          <img class="rounded-lg border-4 border-white" :src="qrcode" alt="QR Code" />
        </div>
        <div class="text-left">
          <p class="text-lg text-gray-300">
            {{ $t('dashboard.qrCodeDisplay.step1') }}
          </p>
          <p class="mt-2 text-lg text-gray-300">
            {{ $t('dashboard.qrCodeDisplay.step2') }}
          </p>
          <p class="mt-2 text-lg text-gray-300">
            {{ $t('dashboard.qrCodeDisplay.step3') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'

definePageMeta({
  layout: 'dashboard',
  disableDashboardHeader: true,
})

const { shop } = useUserStore()

const config = useRuntimeConfig()
const baseUrl = config.public.QR_CODE_MOVE_PAGE_URL

const { locale } = useI18n()

const qrcode = useQRCode(`${baseUrl}/${locale.value}/dashboard/create-entry-id/${shop.id}`, {
  errorCorrectionLevel: 'H',
  margin: 3,
  color: {
    light: '#FFFFFF', // 背景を白に設定
    dark: '#000000',  // QRコードの色を黒に設定
  },
})
</script>
