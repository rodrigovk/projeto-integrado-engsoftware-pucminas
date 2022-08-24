<script setup>
//import { defineEmits } from 'vue';
// import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth.store'
import logoSVG from '@/assets/images/logo.svg';
import UserPanel from '@/components/Layout/UserPanel.vue'

const emit = defineEmits(['changeShowMenu']);

const changeShowMenu = () => {
  emit('changeShowMenu');
}

const authStore = useAuthStore();

// const showMobileNav = ref(false);

// const navbarMenuRef = ref(null);
// const navbarBurgerRef = ref(null);

// onClickOutside(navbarMenuRef, () => {
//   showMobileNav.value = false;
// }, {
//   ignore: [navbarBurgerRef]
// })
</script>

<template>
  <nav class="bg-teal-500 drop-shadow-md" aria-label="main navigation" role="navigation"
    v-if="authStore.user.idUsuario">
    <div class="flex flex-wrap justify-between items-center py-2 text-gray-100">
      <div class="flex p-3 md:invisible">
        <!-- <div class="space-y-1.5">
          <div class="w-6 h-0.5 bg-gray-100"></div>
          <div class="w-6 h-0.5 bg-gray-100"></div>
          <div class="w-6 h-0.5 bg-gray-100"></div>
        </div> -->
        <button @click="changeShowMenu">
          <svg viewBox="0 0 24 24" class="w-8 h-8 fill-current">
            <path fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
            </path>
          </svg>
        </button>
      </div>

      <router-link to="/">
        <div class="navbar-brand flex flex-row items-center content-between">
          <img class="w-14 h-14 mr-2 drop-shadow-sm" :src="logoSVG" alt="my-logo" />
          <div class="flex flex-col items-center">
            <div class="text-4xl md:text-5xl leading-none font-normal tracking-wide">
              Global Soft
            </div>
            <div class="text-sm md:text-base font-light tracking-wide leading-tight">
              SISTEMAS E CONSULTORIA
            </div>
          </div>
        </div>
      </router-link>

      <UserPanel />
    </div>
  </nav>
</template>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>