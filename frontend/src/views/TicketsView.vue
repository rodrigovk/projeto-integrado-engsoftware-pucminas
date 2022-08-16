<route lang="json">{
  "meta": {
    "title": "Tickets"
  }
}</route>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useAuthStore } from '@/stores';
  import { useTicketsStore } from '@/stores';
  import Ticket from '@/components/Layout/Ticket/Ticket.vue';
  import ModalCreateTicket from '@/components/Layout/Ticket/ModalCreateTicket.vue';

  const authStore = useAuthStore();
  const ticketsStore = useTicketsStore();

  onMounted(() => {
    ticketsStore.init();
  })

  const modals = reactive({
    createTicket: true
  });
</script>

<template>
  <div class="">
    <div v-if="!ticketsStore.ticketsLoaded" class="my-3 mx-3">
      <div class="ml-3 inline-flex rounded-md shadow">
        <button type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-500 px-5 py-3 text-base font-medium leading-6 text-white"
          disabled>
          <div
            class="h-6 w-6 border-4 border-l-teal-300 border-r-teal-300 border-b-teal-300 border-t-white animate-spin ease-linear rounded-full mr-2">
          </div>
          Carregando...
        </button>
      </div>
    </div>

    <template v-else>
      <div class="mb-3" v-if="!authStore.user.isAdministrador">
        <ModalCreateTicket
          v-if="modals.createTicket"
          v-model="modals.createTicket"
        />
      </div>

      <div class="flex flex-col justify-center p-6">
        <Ticket v-for="ticket in ticketsStore.tickets" :key="ticket.idTicket" :ticket="ticket" />
      </div>

      <div v-if="!ticketsStore.tickets.length" class="text-xl px-6 py-6">
        Não há nenhum ticket de suporte.
      </div>
    </template>
  </div>
</template>