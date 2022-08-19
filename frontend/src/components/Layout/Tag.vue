<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps({
  customColor: {
    type: String,
    default: 'teal',
  },
  customTextSize: {
    type: String,
    default: 'xs',
  },
  uppercase: {
    type: Boolean,
    default: false,
  },
});

const getCores = computed(() => {
  const cores = {
    'amber': 'bg-amber-600 hover:bg-amber-700',
    'blue': 'bg-blue-600 hover:bg-blue-700',
    'green': 'bg-green-600 hover:bg-green-700',
    'purple': 'bg-purple-600 hover:bg-purple-700',
  }
  return cores[props.customColor];
});

const getTextSize = computed(() => {
  let textSize = `text-${props.customTextSize}`;
  return textSize;
});

const getUppercase = computed(() => {
  return props.uppercase ? 'uppercase' : '';
});
</script>

<template>
  <button disabled 
    class="inline-block px-3 py-1.5 ml-2 text-white font-medium text-xs leading-tight rounded-full ease-in-out"
    :class="[
        getCores,
        getTextSize,
        getUppercase,
      ]">
    <slot />
  </button>
</template>