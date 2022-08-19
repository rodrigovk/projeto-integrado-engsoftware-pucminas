<script setup>
  import { useDateFormat } from '@vueuse/core';
  import { useTicketsStore } from '@/stores';
  import Tag from '@/components/layout/Tag.vue';

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
      <Tag v-if="resposta.administrador" customColor="amber">
        Administrador
      </Tag>
      <Tag v-if="resposta.cliente" customColor="purple">
        Cliente
      </Tag>
    </h5>
    <p class="text-gray-700 text-base">
      {{ resposta.mensagem }}
    </p>
  </div>
</template>