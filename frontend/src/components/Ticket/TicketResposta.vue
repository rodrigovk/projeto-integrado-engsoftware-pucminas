<script setup>
import Tag from '@/components/layout/Tag.vue';
import { useDateFormat } from '@vueuse/core';

const props = defineProps({
  resposta: {
    type: Object,
    required: true
  }
})

const dataCriacaoFormatada = computed(() => {
  if (!props.resposta) {
    return '';
  }

  let formattedDate = useDateFormat(props.resposta.dataCriacao, 'DD/MM/YYYY HH:mm')
  return formattedDate.value;
});
</script>

<template>
  <div class="block p-6 mb-3 rounded-lg shadow-lg bg-white" :class="{ nova: resposta.nova }">
    <h5 class="flex flex-row items-center text-gray-900 text-xl leading-tight font-medium mb-2">
      {{ resposta.administrador ? resposta.administrador.nome : resposta.cliente.nome }}
      <Tag v-if="resposta.administrador" customColor="amber" class="ml-2">
        Administrador
      </Tag>
      <Tag v-if="resposta.cliente" customColor="purple" class="ml-2">
        Cliente
      </Tag>
    </h5>
    <p class="text-sm">
      {{ dataCriacaoFormatada }}
    </p>
    <p class="text-gray-700 text-base break-words">
      {{ resposta.mensagem }}
    </p>
  </div>
</template>