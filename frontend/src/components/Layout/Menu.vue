<script setup>
import { useAuthStore } from '@/stores/auth.store'
import HomeIcon from '@/Components/Icons/HomeIcon.vue';
import AssinaturaIcon from '@/Components/Icons/AssinaturaIcon.vue';
import ClienteIcon from '@/Components/Icons/ClienteIcon.vue';
import AdministradorIcon from '@/Components/Icons/AdministradorIcon.vue';
import TicketIcon from '@/Components/Icons/TicketIcon.vue';
import MenuItem from './MenuItem.vue';

const authStore = useAuthStore();

const emit = defineEmits(['closeMenu']);

const doCloseMenu = () => {
  console.log('2')
  emit('closeMenu');
}
</script>

<template>
  <div class="bg-slate-500 text-slate-100" v-if="authStore.user.idUsuario">
    <MenuItem :to="{ name: 'home' }" @closeMenu="doCloseMenu">
      <HomeIcon class="w-8 h-8 fill-slate-100 mr-1" />
      Início
    </MenuItem>
    <MenuItem :to="{ name: 'assinaturas' }" @closeMenu="doCloseMenu" v-if="authStore.user.isAdministrador">
      <AssinaturaIcon class="w-8 h-8 fill-slate-100 mr-1" />
      Assinaturas
    </MenuItem>
    <MenuItem :to="{ name: 'clientes' }" @closeMenu="doCloseMenu" v-if="authStore.user.isAdministrador">
      <ClienteIcon class="w-8 h-8 fill-slate-100 mr-1" />
      Clientes
    </MenuItem>
    <MenuItem :to="{ name: 'administradores' }" @closeMenu="doCloseMenu" v-if="authStore.user.isAdministrador">
      <AdministradorIcon class="w-8 h-8 fill-slate-100 mr-1" />
      Administradores
    </MenuItem>
    <MenuItem :to="{ name: 'tickets' }" @closeMenu="doCloseMenu">
      <TicketIcon class="w-8 h-8 fill-slate-100 mr-1" />
      Tickets de suporte
    </MenuItem>
  </div>
</template>