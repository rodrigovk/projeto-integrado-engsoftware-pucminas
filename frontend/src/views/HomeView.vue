<route lang="json">{
  "meta": {
    "title": "Home"
  }
}</route>

<script setup>
import { useAuthStore } from '@/stores';
import HomeInfo from '@/components/layout/HomeInfo.vue';

const authStore = useAuthStore();

function onLogout() {
  const authStore = useAuthStore();
  return authStore.logout();
}
</script>

<template>
  <div class="">
    <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 flex flex-col divide-y-4">
      <h2 class="text-2xl font-extrabold leading-9 tracking-tight">
        Olá, {{ authStore.user.nome }}.</h2>

      <div>
        <HomeInfo caption="X assinaturas aguardam geração da mensalidade." to="/" />
        <HomeInfo caption="Y contas a receber vencidas (R$ 888.888,88)." to="/" />
        <HomeInfo caption="Z tickets de suporte aguardam resposta." to="/" />
      </div>
    </div>
  </div>
</template>
