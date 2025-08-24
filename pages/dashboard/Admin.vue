<template>
  <div class="grid grid-cols-2 gap-6 h-[90%] w-[90%]">
    <div class="bg-gray-800 min-h-[250px] h-[90%] max-h-[500px] min-w-[300px] w-[100%] p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">{{ $t('dashboard.admin.enteredCustomers') }}</h2>
      <template v-if="enteredList.length">
        <ul class="h-[calc(100%-2rem)] overflow-y-auto space-y-2">
          <li v-for="entered in enteredList" :key="entered.id" class="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div class="flex gap-4">
              <span class="font-medium">No. {{ entered.entry_number }}</span>
              <span>/</span>
              <span>{{ $t('dashboard.admin.visitorCount', { visitor_count: entered.visitor_count }) }}</span>
              <span class="text-gray-500">{{ $t('dashboard.admin.enteredAt', { entered_at: convertToJSTDate(entered.entered_at ?? new Date(), 'HH:mm') }) }}</span>
            </div>
            <button type="button" class="text-white bg-red-500 px-3 py-1 rounded" @click="handleMarkAsExited(entered.entry_number, entered.id)">{{ $t('dashboard.admin.exit') }}</button>
          </li>
        </ul>
      </template>
      <p v-else class="text-gray-500">{{ $t('dashboard.admin.noEnteredCustomers') }}</p>
    </div>
    <div class="bg-gray-800 min-h-[250px] h-[90%] max-h-[500px] min-w-[300px] w-[100%] p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">{{ $t('dashboard.admin.waitingCustomers') }}</h2>
      <template v-if="waitingList.length">
        <ul class="h-[calc(100%-2rem)] overflow-y-auto space-y-2">
          <li v-for="waiting in waitingList" :key="waiting.id" class="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div class="flex gap-4">
              <span class="font-medium">No. {{ waiting.entry_number }}</span>
              <span>/</span>
              <span>{{ $t('dashboard.admin.visitorCount', { visitor_count: waiting.visitor_count }) }}</span>
            </div>
            <div class="flex gap-2">
              <button
                @click="handelMarkAsCalled(waiting.entry_number, waiting.id)"
                class="px-3 py-1 rounded"
                :class="waiting.is_called ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'"
                :disabled="waiting.is_called">
                {{ waiting.is_called ? $t('dashboard.admin.called') : $t('dashboard.admin.call') }}
              </button>
              <button @click="handleMarkAsEntered(waiting.entry_number, waiting.id)" class="bg-green-500 text-white px-3 py-1 rounded">{{ $t('dashboard.admin.enter') }}</button>
              <button @click="handelMarkAsCanceled(waiting.entry_number, waiting.id)" class="bg-gray-500 text-white px-3 py-1 rounded">{{ $t('dashboard.admin.cancel') }}</button>
            </div>
          </li>
        </ul>
      </template>
      <p v-else-if="waitingErrMsg.length" class="text-red-500 font-bold">{{ waitingErrMsg }}</p>
      <p v-else class="text-gray-500">{{ $t('dashboard.admin.noWaitingCustomers') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/supabase-js';
import { getEnteredList, getWaitingList, markAsCalled, markAsCanceled, markAsEntered, markAsExited, subscribeToShopInAdmin, unsubscribeFromShopInAdmin } from '~/composables/apis/Admin';
import type { Entry } from '~/composables/types/Admin';

const { t } = useI18n()

definePageMeta({
  layout: 'dashboard',
})

const enteredList = ref<Entry[]>([]);
const waitingList = ref<Entry[]>([]);
const waitingErrMsg = ref('');
const realtimeChannel = ref<RealtimeChannel>();

const { shop } = useUserStore();

const handleMarkAsExited = async (entryNumber: number, entryId: string) => {
  if (!confirm(t('dashboard.admin.confirmExit', { entry_number: entryNumber }))) {
    return
  }

  const resp = await markAsExited(entryId)
  if (resp.error) {
    alert(t(resp.error));
  }
};

const handleMarkAsEntered = async (entryNumber: number, entryId: string) => {
  if (!confirm(t('dashboard.admin.confirmEnter', { entry_number: entryNumber }))) {
    return
  }

  const resp = await markAsEntered(entryId)
  if (resp.error) {
    alert(t(resp.error));
  }
};

const handelMarkAsCanceled = async (entryNumber: number, entryId: string) => {
  if (!confirm(t('dashboard.admin.confirmCancel', { entry_number: entryNumber }))) {
    return
  }

  const resp = await markAsCanceled(entryId);
  if (resp.error) {
    alert(t(resp.error));
  }
};

const handelMarkAsCalled = async (entryNumber: number, entryId: string) => {
  if (!confirm(t('dashboard.admin.confirmCall', { entry_number: entryNumber }))) {
    return
  }

  const resp = await markAsCalled(entryId);
  if (resp.error) {
    alert(t(resp.error));
  }
};

const fetchWaitingCustomers = async () => {
  try {
    const resp = await getWaitingList(shop.id);
    if (resp.error) {
      waitingErrMsg.value = t(resp.error);
      return;
    }

    waitingList.value = resp.data;
  } catch (error) {
    waitingErrMsg.value = t('server.error.unexpected');
  }
};

const fetchEnteredCustomers = async () => {
  try {
    const resp = await getEnteredList(shop.id);
    if (resp.error) {
      alert(resp.error);
      return;
    }

    enteredList.value = resp.data;
  } catch (error) {
    alert(t('server.error.unexpected'))
  }
};

onBeforeMount(async () => {
  Promise.all([
    fetchWaitingCustomers(),
    fetchEnteredCustomers(),
  ])

  // realtimeでwating list, entered list更新を監視
  realtimeChannel.value = await subscribeToShopInAdmin(shop.id, fetchWaitingCustomers, fetchEnteredCustomers);
})

onUnmounted(() => {
  if (realtimeChannel.value) {
    unsubscribeFromShopInAdmin(realtimeChannel.value);
  }
});
</script>