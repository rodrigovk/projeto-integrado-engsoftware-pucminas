<script setup>
import { onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useAuthStore } from './stores';
import NavBar from '@/components/Layout/NavBar.vue';
import Menu from '@/components/Layout/Menu.vue';
import { extractIdentifiers } from '@vue/compiler-core';

const authStore = useAuthStore();

const showMenu = ref(false);
const navBarRef = ref(null);
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
  ignore: [navBarRef]
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
            <div class="flex items-center justify-center ml-2 w-12">
              <svg class="w-6 h-6 text-slate-50 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z">
                </path>
              </svg>
            </div>

            <div class="py-2">
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

  <NotificationGroup group="info">
    <div class="fixed inset-0 flex items-end justify-end p-6 px-4 py-6 pointer-events-none z-50">
      <div class="w-full max-w-sm">
        <Notification v-slot="{ notifications }" enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-500"
          leave-from="opacity-100" leave-to="opacity-0" move="transition duration-500 ease-in" move-delay="delay-300">
          <div class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-blue-500 rounded-lg shadow-md"
            v-for="notification in notifications" :key="notification.id">
            <div class="flex items-center justify-center ml-2 w-12">
              <svg class="w-6 h-6 text-slate-50 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path
                  d="M24 5C22.458334 5 21.112148 5.6321334 20.253906 6.5976562C19.395664 7.5631791 19 8.7916668 19 10C19 11.208333 19.395664 12.436821 20.253906 13.402344C21.112148 14.367867 22.458334 15 24 15C25.541666 15 26.887852 14.367867 27.746094 13.402344C28.604336 12.436821 29 11.208333 29 10C29 8.7916668 28.604336 7.5631792 27.746094 6.5976562C26.887852 5.6321334 25.541666 5 24 5 z M 24 8C24.791666 8 25.195482 8.2428665 25.503906 8.5898438C25.81233 8.9368209 26 9.4583332 26 10C26 10.541667 25.81233 11.063179 25.503906 11.410156C25.195482 11.757133 24.791666 12 24 12C23.208334 12 22.804518 11.757133 22.496094 11.410156C22.18767 11.063179 22 10.541667 22 10C22 9.4583332 22.18767 8.9368209 22.496094 8.5898438C22.804518 8.2428665 23.208334 8 24 8 z M 20.476562 16.978516 A 1.50015 1.50015 0 0 0 20.259766 17L16 17 A 1.50015 1.50015 0 1 0 16 20L19 20L19 40L16 40 A 1.50015 1.50015 0 1 0 16 43L20.253906 43 A 1.50015 1.50015 0 0 0 20.740234 43L27.253906 43 A 1.50015 1.50015 0 0 0 27.740234 43L32.5 43 A 1.50015 1.50015 0 1 0 32.5 40L29 40L29 22.5C29 19.480226 26.519774 17 23.5 17L20.746094 17 A 1.50015 1.50015 0 0 0 20.476562 16.978516 z M 22 20L23.5 20C24.898226 20 26 21.101774 26 22.5L26 40L22 40L22 20 z" />
              </svg>
            </div>

            <div class="py-2">
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
            <div class="flex items-center justify-center ml-2 w-12">
              <svg class="w-6 h-6 text-slate-50 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z">
                </path>
              </svg>
            </div>

            <div class="py-2">
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
    <NavBar @changeShowMenu="changeShowMenu" class="z-40" ref="navBarRef" />

    <div class="flex-1 overflow-y-hidden flex flex-row">
      <Menu @closeMenu="closeMenu"
        class="h-full fixed md:relative overflow-y-auto w-1/2 min-w-fit max-w-full md:w-3/12 md:min-w-fit md:max-w-xs transition duration-300 ease-out"
        :class="showMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'" ref="menuRef" />

      <main class="w-full" id="main">
        <router-view v-slot="{ Component }" @closeMenu="closeMenu" class="overflow-y-auto">
          <Transition name="fade">
            <component :is="Component" />
          </Transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scroped>
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active {
  transition: all 0.5s ease-in-out;
}
</style>