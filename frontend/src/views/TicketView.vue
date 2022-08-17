<route lang="json">{
  "meta": {
    "title": "Ticket"
  }
}</route>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
  import { useDateFormat } from '@vueuse/core';
  import { useTicketsStore } from '@/stores';
  import TicketResposta from '@/components/Layout/Ticket/TicketResposta.vue';
  import ModalCreateResposta from '@/components/Layout/Ticket/ModalCreateResposta.vue';

  const store = useTicketsStore();
  const route = useRoute()
  const router = useRouter()

  const ticket = ref({}); 

  onMounted(async () => {
    store.getTicket(route.params.id)
      .then(res => {
        ticket.value = res.data;
      });
  })

  const dataCriacaoFormatada = computed(() => {
    let formattedDate = useDateFormat(ticket.value.dataCriacao, 'DD-MM-YYYY HH:mm')
    return formattedDate.value
  });

  const modals = reactive({
    createResposta: false
  });
</script>

<template>
  <div class="block p-6 mb-3" v-if="ticket.idTicket">
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

    <div class="inline-flex rounded-md shadow mb-2">
      <button
        class="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-3 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-teal-500 focus:outline-none"
        v-if="ticket.situacao === 0" @click.prevent="modals.createResposta = true" href="#">
        Responder
      </button>
    </div>

    <ModalCreateResposta
      v-if="modals.createResposta"
      v-model="modals.createResposta"
      :idTicket="ticket.idTicket"
    />

    <!-- <template> -->
    <div class="flex flex-col justify-center p-2">
      <TicketResposta v-for="resposta in ticket.respostas" :key="resposta.idResposta" :resposta="resposta" />
    </div>

    <!-- <div v-if="!ticketsStore.tickets.length" class="text-xl px-6 py-6">
        Não há nenhum ticket de suporte.
      </div> -->
    <!-- </template> -->
  </div>
</template>