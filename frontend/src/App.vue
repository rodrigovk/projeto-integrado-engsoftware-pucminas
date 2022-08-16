<script setup>
  import { onMounted } from 'vue';
  import { useAuthStore } from './stores';
  import NavBar from '@/components/Layout/NavBar.vue';
  import Menu from '@/components/Layout/Menu.vue';

  const authStore = useAuthStore();

  onMounted(() => {
    authStore.init()
  })
</script>

<template>
  <div class="bg-gray-50 text-gray-800">
    <NavBar class="" />
    <div class="flex flex-row">
      <Menu class="w-3/12 min-w-fit max-w-xs" />
  
      <main class="w-full">
        <router-view />
      </main>
    </div>
  </div>
</template>