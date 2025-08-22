<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <div class="w-full max-w-2xl px-4">
      <div
        class="rounded-lg bg-gray-800 p-8 text-center shadow-lg">
        <h1 class="mb-6 text-3xl font-bold text-white">
          ウェイティング登録用QRコード
        </h1>
        <div class="mb-6 flex justify-center">
          <img class="rounded-lg border-4 border-white" :src="qrcode" alt="QR Code" />
        </div>
        <div class="text-left">
          <p class="text-lg text-gray-300">
            <span class="font-semibold">1. </span>
            上記のQRコードをスマートフォンで読み取ってください。
          </p>
          <p class="mt-2 text-lg text-gray-300">
            <span class="font-semibold">2. </span>
            表示されたページで人数を入力し、登録ボタンを押してください。
          </p>
          <p class="mt-2 text-lg text-gray-300">
            <span class="font-semibold">3. </span>
            入店準備ができましたら、通知メッセージをお送りします。
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
})
</script>