<template>
  <div class="grid grid-cols-2 gap-6 h-[90%] w-[85%]">
    <div class="min-h-[250px] h-[90%] max-h-[500px] min-w-[300px] w-[100%] border p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">入店済みのお客様</h2>
      <template v-if="enteredList.length">
        <ul class="h-[calc(100%-2rem)] overflow-y-auto">
          <li v-for="entered in enteredList" :key="entered.id" class="flex items-center justify-between mb-2">
            <div class="flex gap-4">
              <span class="font-medium">No. {{ entered.entry_number }}</span>
              <span>{{ entered.visitor_count }}人</span>
              <span class="text-gray-500">入店: {{ convertToJSTDate(entered.entered_at ?? new Date(), 'HH:mm') }}</span>
            </div>
            <button type="button" class="text-white bg-red-500 px-3 py-1 rounded" @click="handleMarkAsExited(entered.entry_number, entered.id)">退室</button>
          </li>
        </ul>
      </template>
      <p v-else class="text-gray-500">現在、入店済みのお客様はいません。</p>
    </div>
    <div class="min-h-[250px] h-[90%] max-h-[500px] min-w-[300px] w-[100%] border p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">順番待ちのお客様</h2>
      <template v-if="waitingList.length">
        <ul class="h-[calc(100%-2rem)] overflow-y-auto">
          <li v-for="waiting in waitingList" :key="waiting.id" class="flex items-center justify-between mb-2">
            <div class="flex gap-4">
              <span class="font-medium">No. {{ waiting.entry_number }}</span>
              <span>/</span>
              <span>{{ waiting.visitor_count }}人</span>
            </div>
            <div class="flex gap-2">
              <button @click="handleMarkAsEntered(waiting.entry_number, waiting.id)" class="bg-green-500 text-white px-3 py-1 rounded">入店</button>
              <button
                @click="handelMarkAsCalled(waiting.entry_number, waiting.id)"
                class="px-3 py-1 rounded"
                :class="waiting.is_called ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'"
                :disabled="waiting.is_called">
                {{ waiting.is_called ? '呼出済み' : '呼出' }}
              </button>
              <button @click="handelMarkAsCanceled(waiting.entry_number, waiting.id)" class="bg-gray-500 text-white px-3 py-1 rounded">キャンセル</button>
            </div>
          </li>
        </ul>
      </template>
      <p v-else-if="waitingErrMsg.length" class="text-red-500 font-bold">{{ waitingErrMsg }}</p>
      <p v-else class="text-gray-500">現在、順番待ちのお客様はいません。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/supabase-js';
import { getEnteredList, getWaitingList, markAsCalled, markAsCanceled, markAsEntered, markAsExited, subscribeToShopInAdmin, unsubscribeFromShopInAdmin } from '~/composables/apis/Admin';
import type { Entry } from '~/composables/types/Admin';

definePageMeta({
  layout: 'dashboard',
})

const enteredList = ref<Entry[]>([]);
const enteredErrMsg = ref('');
const waitingList = ref<Entry[]>([]);
const waitingErrMsg = ref('');
const realtimeChannel = ref<RealtimeChannel>();

const { shop } = useUserStore();

const handleMarkAsExited = async (entryNumber: number, entryId: string) => {
  if (!confirm(`No.${entryNumber}を本当に退室します？`)) {
    return
  }

  const resp = await markAsExited(entryId)
  if (resp.error) {
    alert(resp.error);
  }
};

const handleMarkAsEntered = async (entryNumber: number, entryId: string) => {
  if (!confirm(`No.${entryNumber}を本当に入店します？`)) {
    return
  }

  const resp = await markAsEntered(entryId)
  if (resp.error) {
    alert(resp.error);
  }
};

const handelMarkAsCanceled = async (entryNumber: number, entryId: string) => {
  if (!confirm(`No.${entryNumber}を本当にキャンセルしますか？`)) {
    return
  }

  const resp = await markAsCanceled(entryId);
  if (resp.error) {
    alert(resp.error);
  }
};

const handelMarkAsCalled = async (entryNumber: number, entryId: string) => {
  if (!confirm(`No.${entryNumber}を本当に呼出しますか？`)) {
    return
  }

  const resp = await markAsCalled(entryId);
  if (resp.error) {
    alert(resp.error);
  }
};

const fetchWaitingCustomers = async () => {
  try {
    const resp = await getWaitingList(shop.id);
    if (resp.error) {
      waitingErrMsg.value = '順番待ちのお客様の取得に失敗しました。';
      return;
    }

    waitingList.value = resp.data;
  } catch (error) {
    waitingErrMsg.value = '順番待ちのお客様の取得に失敗しました。';
  }
};

const fetchEnteredCustomers = async () => {
  try {
    const resp = await getEnteredList(shop.id);
    if (resp.error) {
      enteredErrMsg.value = '順番待ちのお客様の取得に失敗しました。';
      return;
    }

    enteredList.value = resp.data;
  } catch (error) {
    enteredErrMsg.value = '順番待ちのお客様の取得に失敗しました。';
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