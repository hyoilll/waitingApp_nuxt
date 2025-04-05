import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import type { Shop, User } from "~/composables/types/Admin";

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>({
    id: '',
    email: '',
    shop_name: '',
  });

  const shop = reactive<Shop>({
    id: '',
    user_id: '',
    current_number: 1,
  })

  // const session = 

  const isLogin = computed(() => {
    return !!user.id;
  })

  const setUser = (newUser: User, newShop: Shop) => {
    Object.assign(user, newUser);
    Object.assign(shop, newShop);
  };

  const clearUser = () => {
    user.id = '';
    user.email = '';
    user.shop_name = '';

    shop.user_id = '';
    shop.id = '';
    shop.current_number = 1;
  }

  return {
    user,
    shop,
    isLogin,

    setUser,
    clearUser
  }; 
})