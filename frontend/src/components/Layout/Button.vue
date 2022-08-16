<script setup>
// const props = defineProps({
  // type: {
  //   type: String,
  //   required: true
  // },
// });
</script>

<template>
  <div class="inline-flex rounded-md shadow">
    <button
      class="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-3 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-teal-500 focus:outline-none">
      <slot />
    </button>
  </div>
</template>