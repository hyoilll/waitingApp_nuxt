<template>
  <div id="mobile-menu-popover" popover class="m-0 p-0 border-none h-full w-72 bg-white shadow-xl inset-auto right-0">
    <!-- Menu Header -->
    <div class="p-6 border-b border-gray-200">
      <h2 class="text-xl font-bold text-indigo-600">メニュー</h2>
      <p v-if="isLogin" class="text-gray-600 mt-2 text-sm">ようこそ, {{ userEmail }} さん</p>
    </div>

    <!-- Navigation Links -->
    <nav class="flex flex-col p-6 space-y-6">
      <ul class="space-y-6">
        <li v-for="link in navLinks" :key="link.to">
          <a @click="navigate(link.to)" class="text-xl text-gray-700 hover:text-indigo-600 cursor-pointer">
            {{ $t(link.text) }}
          </a>
        </li>
      </ul>

      <div class="border-t border-gray-200 pt-6 space-y-6">
        <ul class="space-y-6">
          <template v-if="isLogin">
            <li>
              <a @click="navigate('/dashboard/modeselect', true)" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-center block cursor-pointer">
                {{ $t('header.dashboard') }}
              </a>
            </li>
            <li>
              <a @click="navigate('/logout')" class="text-xl text-red-500 md:hover:text-red-700 block text-center cursor-pointer">
                {{ $t('header.logout') }}
              </a>
            </li>
          </template>
          <template v-else>
            <li>
              <a @click="navigate('/login')" class="text-xl text-gray-700 hover:text-indigo-600 block text-center cursor-pointer">
                {{ $t('header.login') }}
              </a>
            </li>
            <li>
              <a @click="navigate('/signup')" class="text-xl text-gray-700 hover:text-indigo-600 block text-center cursor-pointer">
                {{ $t('header.signup') }}
              </a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
interface NavLink {
  to: string;
  text: string;
}

defineProps<{
  navLinks: NavLink[];
  isLogin: boolean;
  userEmail: string;
}>();

const router = useRouter();

const hidePopover = () => {
  const popover = document.getElementById('mobile-menu-popover');
  if (popover && popover.matches(':popover-open')) {
    popover.hidePopover();
  }
};

const navigate = (path: string, newTab = false) => {
  hidePopover();
  if (newTab) {
    window.open(path, '_blank');
  } else {
    router.push(path);
  }
};
</script>

<style scoped>
#mobile-menu-popover {
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}

#mobile-menu-popover:popover-open {
  transform: translateX(0);
}

/* Define the starting style for the animation */
@starting-style {
  #mobile-menu-popover:popover-open {
    transform: translateX(100%);
  }
}

/* Style the backdrop provided by the Popover API */
#mobile-menu-popover::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease-in-out;
}

@starting-style {
  #mobile-menu-popover::backdrop {
    background-color: transparent;
  }
}
</style>