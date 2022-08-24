<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  }
});
</script>

<template>
  <RouterLink :to="to" @click="doCloseMenu">
    <div class="mx-0 my-0 py-8">
      <h3 class="text-2xl font-extrabold leading-9 tracking-tight">
        <slot />
      </h3>
    </div>
  </RouterLink>
</template>