<template>
  <select
    v-if="locales.length"
    class="bg-indigo-600 text-white border rounded-lg py-2 px-3 focus:outline-none"
    v-model="localeRef"
    @change="setLocale(localeRef)">
    <option v-for="loc in locales" :key="loc.code" :value="loc.code">
      {{ loc.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
export type LocaleType = 'ja' | 'en' | 'ko';

const { locale, locales, setLocale } = useI18n();
const localeRef = ref<LocaleType>(locale.value);
</script>