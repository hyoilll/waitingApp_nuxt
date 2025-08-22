<template>
  <div class="p-6 min-h-screen flex flex-col items-center justify-center">
    <div v-if="entryNumber" class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">{{ $t('dashboard.customer.ticketNumber') }}</h2>
      <p class="text-2xl font-semibold text-gray-700 mb-4 text-center">{{ entryNumber }} {{ $t('dashboard.customer.ticketNumberSuffix') }}</p>

      <div v-if="isCalled" class="bg-green-100 border border-green-400 text-green-700 rounded-lg p-4 text-center">
        <p class="font-semibold">{{ $t('dashboard.customer.calledMessageHeader') }}</p>
        <p>{{ $t('dashboard.customer.calledMessageBody') }}</p>
      </div>
      <template v-else>
        <p class="text-lg text-gray-600 mb-4 text-center">{{ $t('dashboard.customer.waitingCount', { count: waitingCount }) }}</p>
        <div v-if="recentEntries.length" class="mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">{{ $t('dashboard.customer.recentEntries') }}</h2>
          <ul class="space-y-2">
            <li v-for="entry in recentEntries" :key="entry.entry_number" class="bg-gray-50 border border-gray-200 rounded-lg p-2">
              <span class="text-gray-700">{{ $t('dashboard.customer.recentEntryLine', { entry_number: entry.entry_number, visitor_count: entry.visitor_count, entered_at: convertToJSTDate(entry.entered_at, 'HH:mm') }) }}</span>
            </li>
          </ul>
        </div>
        <button @click="cancelWaiting" :disabled="isCancelling" class="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg md:hover:bg-red-700 disabled:opacity-50">
          {{ isCancelling ? $t('dashboard.customer.cancelling') : $t('dashboard.customer.cancelWaiting') }}
        </button>
      </template>
    </div>
    <div v-else class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">{{ $t('dashboard.customer.fetchTicketFailed') }}</h1>
      <p class="text-lg text-gray-600 mb-2">{{ $t('dashboard.customer.scanAgain') }}</p>
    </div>
  </div>

  <!-- <div class="ads mt-6 text-center">
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot="yyyyyyyyyyyyyyy"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div> -->
</template>

<script setup lang="ts">
import { getEntryDetail, getIsCalled, getRecentEntryTimes, getWaitingCount, subscribeToShop, unsubscribeFromShop, updateCancelWaiting } from '~/composables/apis/Customer';
import type { RecentEntryTimesResponse } from '~/composables/types/Customer';
import type { RealtimeChannel } from '@supabase/supabase-js';

const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({
  layout: 'dashboard',
  disableDashboardHeader: true,
})

const entryNumber = ref(0);
const isCalled = ref(false);
const recentEntries = ref<RecentEntryTimesResponse[]>([]);
const waitingCount = ref(0);
const isCancelling = ref(false);
const shopId = ref('')
const entryId = ref('');
const route = useRoute();
const router = useRouter();
const realtimeChannel = ref<RealtimeChannel>();

/**
 * 順番待ちをキャンセルする
 * @param entryId 
 */
const cancelWaiting = async () => {
  if (entryId.value) {
    isCancelling.value = true;
    const resp = await updateCancelWaiting(entryId.value)

    if (resp?.error) {
      console.error(t('dashboard.customer.cancelError'), resp.error)
      isCancelling.value = false
      return
    }

    alert(t('dashboard.customer.cancelSuccess'));
    router.push(localePath('/dashboard/canceled'));
    isCancelling.value = false;
  } else {
    console.error(t('dashboard.customer.cancelError'))
  }
}

/**
 * 直近入店した組たちの情報を返す（最大10組）
 * @param shopId 
 */
const fetchRecentEntries = async (shopId: string) => {
  if (shopId) {
    const resp = await getRecentEntryTimes(shopId)
    if (resp.error) {
      console.error(t('dashboard.customer.recentEntriesError'), resp.error)
      return
    }

    recentEntries.value = resp.entries as RecentEntryTimesResponse[];
  }
};

/**
 * 待ち組数を返す
 * @param shopId 
 * @param entryNumber 
 */
const fetchWaitingCount = async (shopId: string, entryNumber: number) => {
  if (shopId && entryNumber) {
    const resp = await getWaitingCount(shopId, entryNumber);
    if (resp.error) {
      console.error(t('dashboard.customer.waitingCountError'), resp.error)
      return
    }

    waitingCount.value = resp.count;
  }
};

const fetchIsCalled = async () => {
  isCalled.value = await getIsCalled(entryId.value)
}

/**
 * entryの詳細情報を返す
 * @param entryId 
 */
const fetchEntryDetails = async (entryId: string) => {
  const resp = await getEntryDetail(entryId);
  if (resp.error) {
    console.error(t('dashboard.customer.entryDetailsError'), resp.error)
    return
  }

  entryNumber.value = resp.entry_number
  shopId.value = resp.shop_id

  await fetchIsCalled()
  if (isCalled.value) {
    return
  }

  Promise.all([
    fetchWaitingCount(shopId.value, resp.entry_number),
    fetchRecentEntries(shopId.value)
  ])
}

onBeforeMount(async () => {
  entryId.value = route.params.entryId as string;
  if (entryId.value) {
    await fetchEntryDetails(entryId.value);

    realtimeChannel.value = await subscribeToShop(
      shopId.value,
      entryId.value,
      () => fetchRecentEntries(shopId.value),
      () => fetchWaitingCount(shopId.value, entryNumber.value),
      fetchIsCalled)
  }
})

onUnmounted(() => {
  if (realtimeChannel.value) {
    unsubscribeFromShop(realtimeChannel.value);
  }
});
</script>
