<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores';
import NavBar from '@/components/Layout/NavBar.vue';
import Menu from '@/components/Layout/Menu.vue';

const authStore = useAuthStore();

let showMenu = ref(false);

onMounted(() => {
  authStore.init()
});

function changeShowMenu() {
  showMenu.value = !showMenu.value;
}
function closeMenu() {
  console.log('3')
  showMenu.value = false;
}
</script>

<template>
  <div class="flex flex-col bg-gray-50 text-slate-700 h-screen">
    <NavBar @changeShowMenu="changeShowMenu" class="z-50" />
    <!-- <NavBar @changeShowMenu="changeShowMenu" class="sticky top-0 z-50" /> -->

    <!-- <div class="flex-1 flex flex-row"> -->
    <div class="flex-1 overflow-y-auto flex flex-row">
      <!-- <Menu @closeMenu="closeMenu" class="fixed h-full md:relative w-1/2 min-w-fit max-w-full md:w-3/12 md:min-w-fit md:max-w-xs transition duration-300 ease-out" :class="showMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'" /> -->
      <Menu @closeMenu="closeMenu"
        class="h-full fixed md:relative overflow-y-auto w-1/2 min-w-fit max-w-full md:w-3/12 md:min-w-fit md:max-w-xs transition duration-300 ease-out"
        :class="showMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'" />

      <!-- <main class="w-full"> -->
      <main class="w-full overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>