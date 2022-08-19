<!-- <script>
// declare additional options
export default {
  inheritAttrs: false, // para que a tag base (no caso a div) não receba a class
}
</script> -->

<template>
  <!-- <div class="mr-2 h-5 w-5"></div> -->
  <svg class="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
    </path>
  </svg>

  <!-- <div
    class="h-6 w-6 border-4 border-l-teal-300 border-r-teal-300 border-b-teal-300 border-t-white animate-spin ease-linear rounded-full mr-2">
  </div> -->
</template>