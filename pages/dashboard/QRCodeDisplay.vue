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
})

// const text = shallowRef(`http://192.168.3.112:5173/create-entry-id/${queueId}`);
const qrcode = useQRCode('https://google.com', {
  errorCorrectionLevel: 'H',
  margin: 3,
})
</script>