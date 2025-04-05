<template>
  <div class="mt-20 w-[80%]">
    <template v-if="errMsg.length">
      <p>{{ errMsg }}</p>
    </template>
    <template v-else>
      <div class="flex flex-col items-center">
        <h2 class="text-2xl font-bold"><strong>{{ shopName }}</strong>へようこそ！</h2>
        <h3 class="text-sm mt-2 text-center">人数を入力した上で、<br>送信ボタンを押してください。</h3>
      </div>
      <form @submit.prevent="handleSubmit" class="mt-6 flex flex-col gap-5 p-4 border border-gray-300 rounded shadow-md bg-white">
        <div class="flex flex-col gap-2">
          <label for="visitorCount" class="font-medium text-gray-700">人数:</label>
          <div class="flex items-center gap-2">
            <input
              type="number"
              id="visitorCount"
              v-model="visitorCount"
              min="1"
              max="30"
              class="w-[80%] border border-gray-300 rounded p-2 text-black"
              required />
            <div class="flex gap-2">
              <button type="button" class="rounded-full w-10 h-10 flex items-center justify-center bg-gray-500" @click="incrementCount">↑</button>
              <button type="button" class="rounded-full w-10 h-10 flex items-center justify-center bg-gray-500" @click="decrementCount">↓</button>
            </div>
          </div>
        </div>
        <button type="submit" class="px-6 py-3 bg-gray-500 font-semibold rounded-lg shadow-md">
          送信
        </button>
      </form>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { getShopName, getTicket } from '~/composables/apis/Customer'

definePageMeta({
  layout: 'dashboard',
  disableDashboardHeader: true,
})

const visitorCount = ref(1)
const shopName = ref('')

const incrementCount = () => {
  if (visitorCount.value && visitorCount.value < 30) {
    visitorCount.value += 1
  }
}

const decrementCount = () => {
  if (visitorCount.value && visitorCount.value > 1) {
    visitorCount.value -= 1
  }
}

const route = useRoute()
const router = useRouter()
const shopId = route.params.shopId as string
const errMsg = ref('')

const handleSubmit = async () => {
  const resp = await getTicket(shopId, visitorCount.value)
  if (resp.error) {
    errMsg.value = resp.error
    return
  }

  router.push(`/dashboard/customer/${resp.id}`)
}

onBeforeMount(async () => {
  // TODO:存在しないshopIdの場合は、エラーページにリダイレクト

  const resp = await getShopName(shopId)
  if (resp.error) {
    errMsg.value = resp.error
    return
  }

  shopName.value = resp.shop_name
})
</script>