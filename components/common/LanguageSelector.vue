<template>
  <select
    v-if="locales.length"
    class="bg-indigo-600 text-white border rounded-lg py-2 px-3 focus:outline-none" @change="updateLocale($event.target as HTMLSelectElement)">
    <option v-for="loc in locales" :key="loc.code" :value="loc.code">
      {{ loc.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
type LocaleType = 'ja' | 'en' | 'ko';

const { locales, setLocale } = useI18n();

function updateLocale(target: HTMLSelectElement) {
  const selectedLocale = target.value as LocaleType
  setLocale(selectedLocale);
}

const config = useRuntimeConfig()
const defaultLocale = config.public.DEFAULT_LOCALE as LocaleType;

tryOnBeforeMount(() => setLocale(defaultLocale))
</script>