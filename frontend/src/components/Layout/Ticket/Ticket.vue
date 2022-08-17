<script setup>
import { useRouter } from 'vue-router'
import { useDateFormat } from '@vueuse/core';
import { useTicketsStore } from '@/stores';

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const router = useRouter();
const store = useTicketsStore();

const dataCriacaoFormatada = computed(() => {
  let formattedDate = useDateFormat(props.ticket.dataCriacao, 'DD-MM-YYYY HH:mm')
  return formattedDate.value
})

const encerrar = () => {
  store.putTicketSituacao(props.ticket.idTicket, 1)
    .then(data => router.go())
    .catch(error => setErrors({ apiError: error }));
}
</script>

<template>
  <div class="block p-6 mb-3 rounded-lg shadow-lg bg-white">
    <h5 class="flex flex-row items-center text-gray-900 text-xl leading-tight font-medium mb-2">
      {{ ticket.assunto }}
      <button type="button"
        class="inline-block px-6 py-1.5 ml-2 bg-green-600 text-white font-medium text-xs leading-tight rounded-full ease-in-out"
        disabled v-if="ticket.situacao === 1">Encerrado</button>
      <button type="button"
        class="inline-block px-6 py-1.5 ml-2 bg-blue-600 text-white font-medium text-xs leading-tight rounded-full ease-in-out"
        disabled v-if="ticket.situacao === 0">Em aberto</button>
    </h5>

    <p class="text-sm">
      {{ dataCriacaoFormatada }}
    </p>

    <p class="text-gray-700 text-base mb-4">
      {{ ticket.descricao }}
    </p>

    <RouterLink :to="`/ticket/${ticket.idTicket}`" class="card-footer-item" href="#">
      <button type="button"
        class=" inline-block px-6 py-2.5 mr-2 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out">
        Abrir
      </button>
    </RouterLink>

    <!-- <button type="button"
      class=" inline-block px-6 py-2.5 mr-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
      Excluir
    </button> -->

    <button type="button" v-if="ticket.situacao === 0" @click="encerrar"
      class=" inline-block px-6 py-2.5 mr-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">
      Encerrar
    </button>
  </div>
</template>