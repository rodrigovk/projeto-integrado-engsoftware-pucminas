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
  let cores = `bg-${props.customColor}-600 hover:bg-${props.customColor}-700`;
  return cores;
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

  <!-- <div class="inline-flex rounded-md shadow">
    <button :disabled="props.disabled === true"
      class="inline-block rounded font-medium leading-tight text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0"
      :class="[
        getCores,
        getTextSize,
        getPaddingX,
        getPaddingY,
        getUppercase,
      ]">
      <slot />
    </button>
  </div> -->
</template>