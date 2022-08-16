<script setup>
//? import { UserIcon } from '@heroicons/vue/solid'

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
  <div class="mx-0 my-0 hover:bg-slate-600">
    <router-link :to="to">
      <!-- <UserIcon class="h-5 w-5 text-blue-500"/> -->
      <div class="px-2 py-4">
        {{ caption }}
      </div>
    </router-link>
  </div>
</template>