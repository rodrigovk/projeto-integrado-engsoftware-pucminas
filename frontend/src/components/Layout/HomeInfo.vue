<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="my-8">
    <RouterLink :to="to" @click="doCloseMenu">
      <div class="mx-0 my-0">
        <h3 class="text-2xl font-extrabold leading-9 tracking-tight">
          <slot />
        </h3>
      </div>
    </RouterLink>
  </div>
</template>