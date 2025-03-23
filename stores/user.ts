import { defineStore } from "pinia";
import { computed, reactive } from "vue";

interface User {
  email: string;
  // queueId: string;
  // shopName: string;
}

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>({
    email: '',
    // queueId: '',
    // shopName: '',
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