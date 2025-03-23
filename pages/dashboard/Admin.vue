<template>
  <div>admin</div>
</template>

<script setup lang="ts">
import { getWaitingList } from '~/composables/apis/Admin';


onBeforeMount(() => {
  Promise.all([

  ])
})

const fetchWaitingQueue = async () => {
  const { waitngList: waitings, error } = await getWaitingList(queueId);
  if (error) {
    console.error('エラー:', error);
    waitingErrMsg.value = error
    return
  }

  waitingList.value = waitings;
};
</script>