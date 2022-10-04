<script setup>
const props = defineProps({
  to: {
    type: Object, //String,
    required: true
  },
  customColor: {
    type: String,
    default: 'slate',
  },
});

const emit = defineEmits(['closeMenu']);

const doCloseMenu = () => {
  emit('closeMenu');
}

const getCores = computed(() => {
  const cores = {
    'amber': 'bg-amber-500 hover:bg-amber-600 focus:bg-amber-600 active:bg-amber-700',
    'blue': 'bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700',
    'green': 'bg-green-500 hover:bg-green-600 focus:bg-green-600 active:bg-green-700',
    'orange': 'bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 active:bg-orange-700',
    'red': 'bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-700',
    'teal': 'bg-teal-500 hover:bg-teal-600 focus:bg-teal-600 active:bg-teal-700',
    'slate': 'bg-slate-500 hover:bg-slate-600 focus:bg-slate-600 active:bg-slate-700',
  }
  return cores[props.customColor];
});
</script>

<template>
  <div class="block mb-3 rounded-lg shadow-lg text-slate-100" :class="[getCores]">
    <RouterLink :to="to" @click="doCloseMenu">
      <div class="mx-0 my-0 p-2">
        <h3 class="text-xl font-medium leading-9 tracking-tight">
          <slot />
        </h3>
      </div>
    </RouterLink>
  </div>
</template>