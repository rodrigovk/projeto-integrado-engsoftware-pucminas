<script setup>
import { useAuthStore } from '@/stores/auth.store'
import getTextInitials from '@/helpers/get-text-initials.js';

const authStore = useAuthStore();

const logout = () => {
  //showMobileNav.value = false;
  authStore.logout();
}

const getUserInitials = () => {
  return getTextInitials(authStore.user.nome);
}
</script>

<template>
  <div class="flex flex-row items-center content-between">
    <div
      class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-slate-500 rounded-full mr-2">
      <span class="font-medium text-gray-200">{{ getUserInitials() }}</span>
    </div>

    <div class="flex flex-col items-start content-around">
      <span>
        {{ authStore.user.nome }}
      </span>
      <span>
        {{ authStore.user.email }}
      </span>
      <button @click="logout">
        Logout
      </button>
    </div>
  </div>
</template>