<template>
  <div class="w-full max-w-4xl px-4">
    <h1 class="mb-8 text-center text-4xl font-bold text-white">
      {{ $t('dashboard.modeSelect.title') }}
    </h1>
    <div class="flex flex-col gap-8 md:flex-row md:justify-center">
      <!-- Waiting Management Card -->
      <NuxtLink
        :to="localePath('/dashboard/admin')"
        class="group block rounded-lg bg-gray-800 p-8 shadow-lg transition-transform duration-300 md:w-1/2">
        <div class="text-center">
          <div class="mb-4 flex justify-center">
            <Icon name="mdi:account-group" class="h-16 w-16 text-blue-500" />
          </div>
          <h2 class="mb-2 text-2xl font-semibold text-white">
            {{ $t('dashboard.modeSelect.waitingManagement') }}
          </h2>
          <p class="text-gray-300">
            {{ $t('dashboard.modeSelect.waitingManagementDesc') }}
          </p>
        </div>
      </NuxtLink>

      <!-- QR Code Display Card -->
      <NuxtLink
        :to="localePath('/dashboard/qrcodedisplay')"
        class="group block rounded-lg bg-gray-800 p-8 shadow-lg transition-transform duration-300 md:w-1/2">
        <div class="text-center">
          <div class="mb-4 flex justify-center">
            <Icon name="mdi:qrcode" class="h-16 w-16 text-green-500" />
          </div>
          <h2 class="mb-2 text-2xl font-semibold text-white">
            {{ $t('dashboard.modeSelect.qrCodeDisplay') }}
          </h2>
          <p class="text-gray-300">
            {{ $t('dashboard.modeSelect.qrCodeDisplayDesc') }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})
const localePath = useLocalePath()
</script>
