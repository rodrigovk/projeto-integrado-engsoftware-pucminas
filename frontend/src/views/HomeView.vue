<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore, useUsuariosStore } from '@/stores';
import HomeChart from '@/components/HomeChart.vue'
import HomeInfo from '@/components/layout/HomeInfo.vue';
import AssinaturaIcon from '@/Components/Icons/AssinaturaIcon.vue';
import ContaReceberIcon from '@/Components/Icons/ContaReceberIcon.vue';
import TicketIcon from '@/Components/Icons/TicketIcon.vue';

const emit = defineEmits(['closeMenu']);
const authStore = useAuthStore();
const usuariosStore = useUsuariosStore();

const isLoading = ref(true);
const dashInfo = ref({});
const chartData = {
  labels: [],
  datasets: [
    {
      label: 'Tickets respondidos',
      backgroundColor: '#0ea5e9',
      data: [],
    }
  ]
}

onMounted(() => {
  usuariosStore.getDashInfo()
    .then(response => {
      dashInfo.value = response.data;

      const quantidadePorData = dashInfo.value.tickets.quantidadePorData;
      chartData.labels = quantidadePorData.map((dia) => {
        return new Date(dia.data).getUTCDate();
      });
      chartData.datasets[0].data = quantidadePorData.map((dia) => {
        return dia.count;
      });

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
    <div class="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-6 flex flex-col">
      <h2 class="text-2xl font-extrabold leading-9 tracking-tight mb-4">
        Olá, {{ authStore.user.nome }}.
      </h2>

      <div v-if="authStore.user.idAdministrador">
        <HomeInfo :to="{ name: 'assinaturas' }" @closeMenu="doCloseMenu"
          :customColor="dashInfo.assinaturas.quantidade > 0 ? 'amber' : 'teal'">
          <div class="flex items-center">
            <AssinaturaIcon class="w-10 h-10 fill-slate-100 mr-2" />
            {{ dashInfo.assinaturas.quantidade }} assinaturas aguardam geração da mensalidade
          </div>
        </HomeInfo>
        <HomeInfo :to="{ name: 'contas' }" @closeMenu="doCloseMenu"
          :customColor="dashInfo.contas.quantidade > 0 ? 'amber' : 'teal'">
          <div class="flex items-center">
            <ContaReceberIcon class="w-10 h-10 fill-slate-100 mr-2" />
            {{ dashInfo.contas.quantidade }} contas a receber vencidas ({{ vueNumberFormat(dashInfo.contas.valor, {})
            }})
          </div>
        </HomeInfo>
        <HomeInfo :to="{ name: 'tickets' }" @closeMenu="doCloseMenu"
          :customColor="dashInfo.tickets.quantidade > 0 ? 'amber' : 'teal'">
          <div class="flex items-center">
            <TicketIcon class="w-10 h-10 fill-slate-100 mr-2" />
            {{ dashInfo.tickets.quantidade }} tickets de suporte aguardam resposta
          </div>
        </HomeInfo>
      </div>
      <div v-else>
        <HomeInfo :to="{ name: 'tickets' }" @closeMenu="doCloseMenu">
          <div class="flex items-center">
            <TicketIcon class="w-10 h-10 fill-slate-100 mr-2" />
            {{ dashInfo.tickets.quantidade }} tickets de suporte foram respondidos
          </div>
        </HomeInfo>
      </div>

      <div class="mt-4">
        <h2 class="text-xl font-extrabold mb-4">Tickets de suporte respondidos por dia</h2>
        <HomeChart :chartData="chartData" :height="100" />
      </div>
    </div>
  </div>
</template>
