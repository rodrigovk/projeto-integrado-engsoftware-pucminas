<script setup>
import { useAuthStore } from '@/stores/auth.store'
import MenuItem from './MenuItem.vue';

const authStore = useAuthStore();
</script>

<template>
  <div class="bg-slate-500 text-gray-100" v-if="authStore.user.idUsuario">
    <MenuItem caption="Assinaturas" :to="{ name: 'assinaturas' }" v-if="authStore.user.isAdministrador" />
    <MenuItem caption="Clientes" :to="{ name: 'clientes' }" v-if="authStore.user.isAdministrador" />
    <MenuItem caption="Administradores" :to="{ name: 'administradores' }" v-if="authStore.user.isAdministrador" />
    <MenuItem caption="Tickets de suporte" :to="{ name: 'tickets' }" />
  </div>
</template>