<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore, useUsuariosStore } from '@/stores';
import HomeInfo from '@/components/layout/HomeInfo.vue';
import AssinaturaIcon from '@/Components/Icons/AssinaturaIcon.vue';
import ContaReceberIcon from '@/Components/Icons/ContaReceberIcon.vue';
import TicketIcon from '@/Components/Icons/TicketIcon.vue';

const emit = defineEmits(['closeMenu']);
const authStore = useAuthStore();
const usuariosStore = useUsuariosStore();

let isLoading = ref(true);
let dashInfo = ref({});

onMounted(() => {
  usuariosStore.getDashInfo()
    .then(response => {
      dashInfo.value = response.data;
      isLoading.value = false;
    });
});

const doCloseMenu = () => {
  emit('closeMenu');
}
</script>

<template>
  <div v-if="isLoading" class="h-full flex flex-row justify-center items-center">
    <div class="flex items-center">
      <SpinLoading :height="8" :width="8" color="text-teal-600" class="mr-3" />
      <p class="text-xl text-teal-600">
        Carregando...
      </p>
    </div>
  </div>

  <div v-else class="">
    <div class="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-6 flex flex-col divide-y-4">
      <h2 class="text-2xl font-extrabold leading-9 tracking-tight">
        Olá, {{ authStore.user.nome }}.</h2>

      <div v-if="authStore.user.idAdministrador">
        <HomeInfo :to="{ name: 'assinaturas' }" @closeMenu="doCloseMenu">
          <div class="flex items-center">
            <AssinaturaIcon class="fill-slate-700 mr-2" />
            {{ dashInfo.assinaturas.quantidade }} assinaturas aguardam geração da mensalidade.
          </div>
        </HomeInfo>
        <!-- <HomeInfo to="/" @closeMenu="doCloseMenu">
          <div class="flex items-center">
            <ContaReceberIcon class="fill-slate-700 mr-2" />
            {{ dashInfo.contas.quantidade }} contas a receber vencidas ({{ vueNumberFormat(dashInfo.contas.valor, {})
            }}).
          </div>
        </HomeInfo> -->
        <HomeInfo :to="{ name: 'tickets' }" @closeMenu="doCloseMenu">
          <div class="flex items-center">
            <TicketIcon class="fill-slate-700 mr-2" />
            {{ dashInfo.tickets.quantidade }} tickets de suporte aguardam resposta.
          </div>
        </HomeInfo>
      </div>
      <div v-else>
        <HomeInfo :to="{ name: 'tickets' }" @closeMenu="doCloseMenu">
          <div class="flex items-center">
            <TicketIcon class="fill-slate-700 mr-2" />
            {{ dashInfo.tickets.quantidade }} tickets de suporte foram respondidos.
          </div>
        </HomeInfo>
      </div>
    </div>
  </div>
</template>
