<script setup>
  import { useDateFormat } from '@vueuse/core';
  import { useTicketsStore } from '@/stores';

  const props = defineProps({
    resposta: {
      type: Object,
      required: true
    }
  })

  const store = useTicketsStore();
</script>

<template>
  <div class="block p-6 mb-3 rounded-lg shadow-lg bg-white">
    <h5 class="flex flex-row items-center text-gray-900 text-xl leading-tight font-medium mb-2">
      {{ resposta.administrador ? resposta.administrador.nome : resposta.cliente.nome }}
      <button type="button" class="inline-block px-2 py-1.5 ml-2 bg-amber-600 text-white font-medium text-xs leading-tight rounded-full ease-in-out" disabled v-if="resposta.administrador">Administrador</button>
      <button type="button" class="inline-block px-2 py-1.5 ml-2 bg-purple-600 text-white font-medium text-xs leading-tight rounded-full ease-in-out" disabled v-if="resposta.cliente">Cliente</button>
    </h5>
    <p class="text-gray-700 text-base">
      {{ resposta.mensagem }}
    </p>
  </div>
</template>