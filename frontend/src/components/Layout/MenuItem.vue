<script setup>
const props = defineProps({
  to: {
    type: Object,
    required: true
  },
});

const emit = defineEmits(['closeMenu']);

const doCloseMenu = () => {
  emit('closeMenu');
}
</script>

<template>
  <RouterLink :to="to" v-slot="{ href, route, navigate, isActive, isExactActive }" @click="doCloseMenu">
    <div class="flex content-center mx-0 my-0 hover:bg-slate-600 transform ease-out duration-300 transition"
      :class="{ 'bg-teal-500 hover:bg-teal-600 focus:bg-teal-600 active:bg-teal-700': isActive }">
      <div class="flex flex-row items-center px-3 py-4">
        <slot />
      </div>
    </div>
  </RouterLink>
</template>