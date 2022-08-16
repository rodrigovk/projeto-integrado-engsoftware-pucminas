<script setup>
  const props = defineProps({
    caption: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  });
</script>

<template>
  <div class="mx-0 my-0 py-8">
    <h3 class="text-2xl font-extrabold leading-9 tracking-tight">
      {{ caption }}
    </h3>
  </div>
</template>