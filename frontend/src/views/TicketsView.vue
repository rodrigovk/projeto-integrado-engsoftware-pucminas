<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { useAuthStore } from '@/stores';
import { useTicketsStore } from '@/stores';
import SpinLoading from '@/components/layout/SpinLoading.vue';
import Ticket from '@/components/Ticket/Ticket.vue';
import ModalCreateTicket from '@/components/Ticket/ModalCreateTicket.vue';

const authStore = useAuthStore();
const ticketsStore = useTicketsStore();

onMounted(() => {
  ticketsStore.init();
})

let filtroSituacao = null;
let filtroAssunto = null;

async function onChangeFiltroAssunto(event) {
  filtroAssunto = event.target.value;

  nextTick(() => {
    ticketsStore.getTickets(filtroSituacao, filtroAssunto);
  });
}
async function onChangeFiltroSituacao(event) {
  switch (event.target.value) {
    case 'abertos':
      filtroSituacao = 0;
      break;
    case 'encerrados':
      filtroSituacao = 1;
      break;
    default:
      filtroSituacao = null;
  }

  nextTick(() => {
    ticketsStore.getTickets(filtroSituacao, filtroAssunto);
  });
}

const modals = reactive({
  createTicket: true
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="p-6">
      <div class="flex flex-col sm:flex-row">
        <div class="mr-4 text-2xl font-semibold">
          Tickets de suporte
        </div>

        <div class="flex flex-wrap sm:flex-nowrap gap-x-4 gap-y-2 sm:ml-auto">
          <TextInput :disabled="!ticketsStore.ticketsLoaded" name="filtroAssunto" label="Filtrar por assunto"
            @change="onChangeFiltroAssunto" class="shrink" />

          <SelectInput :disabled="!ticketsStore.ticketsLoaded" name="filtroSituacao" label="Situação"
            initialValue="todos" @change="onChangeFiltroSituacao">
            <option value="todos">Todos</option>
            <option value="abertos">Abertos</option>
            <option value="encerrados">Encerrados</option>
          </SelectInput>
        </div>
      </div>

      <div v-if="!ticketsStore.ticketsLoaded" class="flex-1 flex flex-row justify-center items-center">
        <div class="flex items-center">
          <SpinLoading :height="8" :width="8" color="text-teal-600" class="mr-3" />
          <p class="text-xl text-teal-600">
            Carregando...
          </p>
        </div>
      </div>

      <template v-else>
        <div class="mb-0 mt-4" v-if="!authStore.user.isAdministrador">
          <ModalCreateTicket v-if="modals.createTicket" v-model="modals.createTicket" class="p-6" />
        </div>

        <div class="flex flex-col justify-center pt-6">
          <TransitionGroup name="ticket">
            <Ticket v-for="ticket in ticketsStore.tickets" :key="ticket.idTicket" :ticket="ticket" />
          </TransitionGroup>
        </div>

        <div v-if="!ticketsStore.tickets.length" class="text-xl px-6">
          Não há nenhum ticket de suporte.
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.ticket-enter-active,
.ticket-leave-active {
  transition: opacity 0.7s ease, transform 0.7s ease, background-color 3s ease-in;
}

.ticket-enter-from,
.ticket-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.ticket-enter-from.novo,
.ticket-leave-to.novo {
  background-color: theme('colors.yellow.500');
}
</style>