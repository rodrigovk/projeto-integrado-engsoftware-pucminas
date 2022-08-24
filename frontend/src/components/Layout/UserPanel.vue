<script setup>
  import { useAuthStore } from '@/stores/auth.store'
  import { getTextInitials } from '@/helpers';
  import Button from '@/components/layout/Button.vue';

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
  <div class="flex flex-row items-center content-between mr-4">
    <div
      class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-slate-500 rounded-full mr-2">
      <span class="font-medium text-gray-200">{{ getUserInitials() }}</span>
    </div>

    <div class="flex flex-col items-end content-around">
      <span class="mb-1 hidden md:flex">
        {{ authStore.user.nome }}
      </span>
      <!-- <span>
        {{ authStore.user.email }}
      </span> -->
      <!-- :disabled="isSubmitting" -->
      <Button :uppercase="false" :paddingY="1.5" @click="logout" customTextSize="sm">
        Logout
      </Button>
    </div>
  </div>
</template>