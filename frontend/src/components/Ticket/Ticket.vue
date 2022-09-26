<script setup>
import { ref } from 'vue';
import { useDateFormat } from '@vueuse/core';
import { useAuthStore, useTicketsStore } from '@/stores';
import Button from '@/components/layout/Button.vue';
import Tag from '@/components/layout/Tag.vue';
import SpinLoading from '../Layout/SpinLoading.vue';

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const authStore = useAuthStore();
const ticketsStore = useTicketsStore();

let isEncerrando = ref(false);
let isReabrindo = ref(false);

const dataCriacaoFormatada = computed(() => {
  let formattedDate = useDateFormat(props.ticket.dataCriacao, 'DD/MM/YYYY HH:mm')
  return formattedDate.value
})

const encerrar = () => {
  isEncerrando.value = true;
  ticketsStore.putTicketSituacao(props.ticket.idTicket, 1)
    .then(data => props.ticket.situacao = 1)
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => isEncerrando.value = false);
}

const reabrir = () => {
  isReabrindo.value = true;
  ticketsStore.putTicketSituacao(props.ticket.idTicket, 0)
    .then(data => props.ticket.situacao = 0)
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => isReabrindo.value = false);
}
</script>

<template>
  <div class="block p-6 mb-3 rounded-lg shadow-lg bg-white" :class="{ novo: ticket.novo }">
    <h5 class="flex flex-row items-center text-gray-900 text-xl leading-tight font-medium break-words mb-2">
      {{ ticket.assunto }}
      <Tag customColor="green" v-if="ticket.situacao === 1" class="ml-2">
        Encerrado
      </Tag>
      <Tag customColor="blue" v-if="ticket.situacao === 0" class="ml-2">
        Em aberto
      </Tag>
    </h5>

    <p class="text-sm">
      {{ dataCriacaoFormatada }}
    </p>

    <p class="text-gray-700 text-base break-words mb-4">
      {{ ticket.descricao }}
    </p>

    <div class="flex">
      <RouterLink :to="{
        name: 'ticket',
        params: {
          id: ticket.idTicket
        }
      }" class="card-footer-item">
        <Button class="mr-2">
          Visualizar
        </Button>
      </RouterLink>

      <Button customColor="green" v-if="ticket.situacao === 0 && authStore.user.isAdministrador" @click="encerrar">
        <div class="flex items-center">
          <SpinLoading v-show="isEncerrando" class="mr-3" />
          Encerrar
        </div>
      </Button>

      <Button v-if="ticket.situacao === 1 && authStore.user.isAdministrador" customColor="blue" @click="reabrir">
        <div class="flex items-center">
          <SpinLoading v-show="isReabrindo" class="mr-3" />
          Reabrir
        </div>
      </Button>
    </div>
  </div>
</template>