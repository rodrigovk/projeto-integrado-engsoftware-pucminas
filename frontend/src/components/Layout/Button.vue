<!-- <script>
// declare additional options
export default {
  inheritAttrs: false, // para que a tag base (no caso a div) não receba a class
}
</script> -->

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
  disabled: {
    type: Boolean,
    default: false,
  },
  uppercase: {
    type: Boolean,
    default: true,
  },
  paddingY: {
    type: Number,
    default: 3,
  }
});

const getCores = computed(() => {
  const cores = {
    'blue': 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800',
    'green': 'bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-800',
    'orange': 'bg-orange-600 hover:bg-orange-700 focus:bg-orange-700 active:bg-orange-800',
    'red': 'bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800',
    'teal': 'bg-teal-600 hover:bg-teal-700 focus:bg-teal-700 active:bg-teal-800',
  }
  return cores[props.customColor];
});

const getTextSize = computed(() => {
  let textSize = `text-${props.customTextSize}`;
  return textSize;
});

const getPaddingX = computed(() => {
  const paddingX = {
    'xs': 'px-3',
    'sm': 'px-3',
    'base': 'px-4',
    'md': 'px-4',
    'lg': 'px-5',
  }
  return paddingX[props.customTextSize];
});

const getPaddingY = computed(() => {
  const paddingY = {
    '0.5': 'py-0.5',
    '1': 'py-1',
    '1.5': 'py-1.5',
    '2': 'py-2',
    '2.5': 'py-2.5',
    '3': 'py-3',
  }
  return paddingY[props.paddingY];
});

const getUppercase = computed(() => {
  return props.uppercase ? 'uppercase' : '';
});
</script>

<template>
  <div class="inline-flex rounded-md shadow">
    <button :disabled="props.disabled === true"
      class="inline-block rounded-md font-medium leading-tight text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0"
      :class="[
        getCores,
        getTextSize,
        getPaddingX,
        getPaddingY,
        getUppercase,
      ]">
      <slot />
    </button>
  </div>
</template>