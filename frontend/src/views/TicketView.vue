<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useDateFormat } from '@vueuse/core';
import { useTicketsStore } from '@/stores';
import Button from '@/components/Layout/Button.vue';
import Tag from '@/components/Layout/Tag.vue';
import TicketResposta from '@/components/Ticket/TicketResposta.vue';
import ModalCreateResposta from '@/components/Ticket/ModalCreateResposta.vue';

const store = useTicketsStore();
const route = useRoute();

const ticket = ref({});

defineEmits(['closeMenu']);

onMounted(async () => {
  store.getTicket(route.params.id)
    .then(res => {
      ticket.value = res.data;
    });
})

function scrollToResposta(idResposta) {
  document.getElementById('ticket-resposta-' + idResposta).scrollIntoView({ behavior: "smooth" });
}

const dataCriacaoFormatada = computed(() => {
  if (!ticket.value.dataCriacao) {
    return '';
  }

  let formattedDate = useDateFormat(ticket.value.dataCriacao, 'DD/MM/YYYY HH:mm')
  return formattedDate.value;
});

const modals = reactive({
  createResposta: false
});
</script>

<template>
  <div class="block p-6 shadow-lg bg-white">
    <RouterLink to="/tickets">
      <Button class="mb-5">
        &lt; Voltar
      </Button>
    </RouterLink>

    <h5 class="flex flex-row items-center text-gray-900 text-xl leading-tight font-medium mb-2">
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

    <p class="text-gray-700 text-base mb-4">
      {{ ticket.descricao }}
    </p>

    <Button v-if="ticket.situacao === 0" @click.prevent="modals.createResposta = true" class="mb-2">
      Responder
    </Button>

  </div>

  <div v-if="modals.createResposta" class="flex flex-col justify-center p-6 pb-0">
    <ModalCreateResposta v-model="modals.createResposta" @scrollToResposta="scrollToResposta" :ticket="ticket"
      :idTicket="ticket.idTicket" />
  </div>

  <div class="flex flex-col justify-center p-6">
    <TransitionGroup name="resposta">
      <TicketResposta v-for="resposta in ticket.respostas" :key="resposta.idResposta" :resposta="resposta"
        :id="'ticket-resposta-'+resposta.idResposta"/>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.resposta-enter-active,
.resposta-leave-active {
  transition: opacity 0.7s ease, transform 0.7s ease, background-color 3s ease-in;
}

.resposta-enter-from,
.resposta-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.resposta-enter-from.nova,
.resposta-leave-to.nova {
  background-color: theme('colors.yellow.500');
}
</style>