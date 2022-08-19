<script setup>
// import { ref } from 'vue'
// import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth.store'
import logoSVG from '@/assets/images/logo.svg';
import UserPanel from '@/components/Layout/UserPanel.vue'

const authStore = useAuthStore();

// const showMobileNav = ref(false);

// const navbarMenuRef = ref(null);
// const navbarBurgerRef = ref(null);

// onClickOutside(navbarMenuRef, () => {
//   showMobileNav.value = false;
// }, {
//   ignore: [navbarBurgerRef]
// })

const logout = () => {
  //showMobileNav.value = false;
  authStore.logout();
}
</script>

<template>
  <nav class="navbar bg-teal-500 drop-shadow-md" aria-label="main navigation" role="navigation" v-if="authStore.user.idUsuario">
    <div class="flex flex-wrap justify-between items-center py-2 text-gray-100">
      <div>
      </div>

      <router-link to="/">
        <div class="navbar-brand flex flex-row items-center content-between">
          <img class="w-14 h-14 mr-2 drop-shadow-sm" :src="logoSVG" alt="my-logo" />
          <div class="flex flex-col items-center">
            <div class="text-4xl font-normal tracking-wide">
              Global Soft
            </div>
            <div class="text-base font-light">
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