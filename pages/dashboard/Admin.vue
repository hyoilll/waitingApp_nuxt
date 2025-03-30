<template>
  <div class="grid grid-cols-2 gap-6 h-[90%]">
    <div class="min-h-[250px] h-[90%] max-h-[500px] min-w-[300px] w-[100%] border p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">入店済みのお客様</h2>
      <template v-if="enteredList.length">
        <ul class="h-[calc(100%-2rem)] overflow-y-auto">
          <li v-for="entered in enteredList" :key="entered.id" class="flex items-center justify-between mb-2">
            <div class="flex gap-4">
              <span class="font-medium">No. {{ entered.entry_number }}</span>
              <span>{{ entered.visitor_count }}人</span>
              <span class="text-gray-500">入店: {{ $dayjs(entered.entered_at).format('HH:mm') }}</span>
            </div>
            <button type="button" class="text-white px-3 py-1 rounded" @click="handleMarkAsExited(entered.entry_number, entered.id)">退室</button>
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
      <p v-else class="text-gray-500">現在、順番待ちのお客様はいません。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getWaitingList } from '~/composables/apis/Admin';
import type { Entry } from '~/composables/types/Admin';

definePageMeta({
  layout: 'dashboard',
})

const enteredList = ref<Entry[]>([]);
const enteredErrMsg = ref('');
const waitingList = ref<Entry[]>([]);
const waitingErrMsg = ref('');

const handleMarkAsExited = async (entryNumber: number, entryId: string) => {

};

const handleMarkAsEntered = async (entryNumber: number, entryId: string) => {

};

const handelMarkAsCanceled = async (entryNumber: number, entryId: string) => {

};

const handelMarkAsCalled = async (entryNumber: number, entryId: string) => {

};

onBeforeMount(() => {
  Promise.all([

  ])
})
</script>