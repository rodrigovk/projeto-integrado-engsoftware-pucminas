<script setup>
import { nextTick, onMounted } from 'vue';
import { useAuthStore } from '@/stores';
import { useTicketsStore } from '@/stores';
import SpinLoading from '@/components/layout/SpinLoading.vue';
import Ticket from '@/components/Ticket/Ticket.vue';
import ModalCreateTicket from '@/components/Ticket/ModalCreateTicket.vue';

const authStore = useAuthStore();
const ticketsStore = useTicketsStore();

//const filtroSituacao = ref('todos');

onMounted(() => {
  ticketsStore.init();
})

async function onChangeFiltroSituacao(event) {
  console.log(event.target.value);

  let situacao = null;
  switch (event.target.value) {
    case 'abertos':
      situacao = 0;
      break;
    case 'encerrados':
      situacao = 1;
      break;
  }

  nextTick(() => {
    ticketsStore.getTickets(situacao);
  });
}

const modals = reactive({
  createTicket: true
});
</script>

<template>
  <div class="h-full">
    
    <div class="flex pt-6 pl-6 pr-6" :class="{'bg-white': !authStore.user.isAdministrador}">
      <div class="text-2xl">
        Tickets de suporte
      </div>
      <div class="ml-auto">
        <SelectInput :disabled="!ticketsStore.ticketsLoaded" name="filtroSituacao" label="Situação" initialValue="todos" @change="onChangeFiltroSituacao">
          <option value="todos">Todos</option>
          <option value="abertos">Abertos</option>
          <option value="encerrados">Encerrados</option>
        </SelectInput>
      </div>
    </div>
    
    <div v-if="!ticketsStore.ticketsLoaded" class="h-full flex flex-row justify-center items-center">
      <div class="flex items-center">
        <SpinLoading :height="8" :width="8" color="text-teal-600" class="mr-3" />
        <p class="text-xl text-teal-600">
          Carregando...
        </p>
      </div>
    </div>
    
    <template v-else>
      <div class="mb-0" v-if="!authStore.user.isAdministrador">
        <ModalCreateTicket v-if="modals.createTicket" v-model="modals.createTicket" />
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