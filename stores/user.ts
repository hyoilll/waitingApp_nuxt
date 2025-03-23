import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import type { User } from "~/composables/types/Admin";

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>({
    id: '',
    email: '',
    // queueId: '',
    shop_name: '',
  });

  // const session = 

  const isLogin = computed(() => {
    return user.email.length > 0;
  })

  const setUser = (newUser: User) => {
    Object.assign(user, newUser);
  };

  const clearUser = () => {
    user.email = ''
  }

  return {
    user,
    isLogin,

    setUser,
    clearUser
  }; 
})