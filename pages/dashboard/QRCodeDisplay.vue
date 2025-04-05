<template>
  <div class="mt-20">
    <Header headerTitle="QRコードを読み取ってください" />

    <div class="mt-6 flex gap-5 justify-center">
      <img v-if="true" class="rounded border" :src="qrcode" alt="QR Code">
      <div class="flex flex-col items-start">
        <span>読み取った上で、人数を入力して送信ボタンを押してください。</span>
        <span>入店のメッセージが表示されるまで、お待ちください。</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode';

definePageMeta({
  layout: 'dashboard',
  disableDashboardHeader: true,
})

const { shop } = useUserStore()

const config = useRuntimeConfig()
const baseUrl = config.public.QR_CODE_MOVE_PAGE_URL

const qrcode = useQRCode(`${baseUrl}/dashboard/create-entry-id/${shop.id}`, {
  errorCorrectionLevel: 'H',
  margin: 3,
})
</script>