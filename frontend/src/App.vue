<script setup>
import { onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useAuthStore } from './stores';
import NavBar from '@/components/Layout/NavBar.vue';
import Menu from '@/components/Layout/Menu.vue';
import { extractIdentifiers } from '@vue/compiler-core';

const authStore = useAuthStore();

const showMenu = ref(false);
const menuRef = ref(null);

onMounted(() => {
  authStore.init()
});

function changeShowMenu() {
  showMenu.value = !showMenu.value;
}
function closeMenu() {
  showMenu.value = false;
}
onClickOutside(menuRef, () => {
  if (!showMenu.value) return;
  closeMenu();
}, {
  ignore: []
})
</script>

<template>
  <NotificationGroup group="ok">
    <div class="fixed inset-0 flex items-end justify-end p-6 px-4 py-6 pointer-events-none z-50">
      <div class="w-full max-w-sm">
        <Notification v-slot="{ notifications }" enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-500"
          leave-from="opacity-100" leave-to="opacity-0" move="transition duration-500 ease-in" move-delay="delay-300">
          <div class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-green-500 rounded-lg shadow-md"
            v-for="notification in notifications" :key="notification.id">
            <div class="flex items-center justify-center w-12">
              <svg class="w-6 h-6 text-slate-50 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z">
                </path>
              </svg>
            </div>

            <div class="px-4 py-2 -mx-3">
              <div class="mx-3">
                <span class="font-medium text-slate-50">{{ notification.title }}</span>
                <p class="text-sm text-slate-100">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>

  <NotificationGroup group="error">
    <div class="fixed inset-0 flex items-end justify-end p-6 px-4 py-6 pointer-events-none z-50">
      <div class="w-full max-w-sm">
        <Notification v-slot="{ notifications }" enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-500"
          leave-from="opacity-100" leave-to="opacity-0" move="transition duration-500 ease-in" move-delay="delay-300">
          <div class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-red-500 rounded-lg shadow-md"
            v-for="notification in notifications" :key="notification.id">
            <div class="flex items-center justify-center w-12">
              <svg class="w-6 h-6 text-slate-50 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z">
                </path>
              </svg>
            </div>

            <div class="px-4 py-2 -mx-3">
              <div class="mx-3">
                <span class="font-medium text-slate-50">{{ notification.title }}</span>
                <p class="text-sm text-slate-100">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>

  <div class="flex flex-col bg-gray-50 text-slate-700 h-screen">
    <NavBar @changeShowMenu="changeShowMenu" class="z-40" />

    <div class="flex-1 overflow-y-hidden flex flex-row">
      <Menu @closeMenu="closeMenu"
        class="h-full fixed md:relative overflow-y-auto w-1/2 min-w-fit max-w-full md:w-3/12 md:min-w-fit md:max-w-xs transition duration-300 ease-out"
        :class="showMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'" ref="menuRef" />

      <main class="w-full overflow-y-auto">
        <router-view @closeMenu="closeMenu" />
      </main>
    </div>
  </div>
</template>