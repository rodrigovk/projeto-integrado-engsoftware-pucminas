<script setup>
import { onMounted } from 'vue';
import { useAdministradoresStore } from '@/stores';
import SpinLoading from '@/components/layout/SpinLoading.vue';
import Administrador from '@/components/Administrador/Administrador.vue';

const administradoresStore = useAdministradoresStore();

onMounted(() => {
  administradoresStore.init();
})

function removerAdministrador(idAdministrador) {
  const index = administradoresStore.administradores.findIndex(administrador => {
    return (administrador.idAdministrador === idAdministrador);
  });
  administradoresStore.administradores.splice(index, 1);
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="p-6">
      <div class="text-2xl font-semibold">
        Administradores
      </div>

      <div v-if="!administradoresStore.administradoresLoaded" class="flex-1 flex flex-row justify-center items-center">
        <div class="flex items-center">
          <SpinLoading :height="8" :width="8" color="text-teal-600" class="mr-3" />
          <p class="text-xl text-teal-600">
            Carregando...
          </p>
        </div>
      </div>

      <template v-else>
        <RouterLink :to="{ name: 'administrador_novo' }">
          <Button class="mt-2">
            Criar administrador
          </Button>
        </RouterLink>

        <div class="flex flex-col justify-center pt-6">
          <Administrador v-for="administrador in administradoresStore.administradores"
            :key="administrador.idAdministrador" :administrador="administrador"
            @removerAdministrador="removerAdministrador" />
        </div>

        <div v-if="!administradoresStore.administradores.length" class="text-xl px-6">
          Não há nenhum administrador.
        </div>
      </template>
    </div>
  </div>
</template>