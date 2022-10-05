<script setup>
import { ref } from 'vue';
import { useAdministradoresStore } from '@/stores';
import Button from '@/components/layout/Button.vue';
import Tag from '@/components/layout/Tag.vue';
import SpinLoading from '../Layout/SpinLoading.vue';
import { notify } from 'notiwind';

const props = defineProps({
  administrador: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['removerAdministrador']);

const administradoresStore = useAdministradoresStore();

const isAtivando = ref(false);
const isInativando = ref(false);

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const ativar = () => {
  isAtivando.value = true;
  administradoresStore.putAdministradorSituacao(props.administrador.idAdministrador, 1)
    .then(data => props.administrador.situacao = 1)
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => isAtivando.value = false);
}

const inativar = () => {
  isInativando.value = true;
  administradoresStore.putAdministradorSituacao(props.administrador.idAdministrador, 0)
    .then(data => props.administrador.situacao = 0)
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => isInativando.value = false);
}

const isExcluindo = ref(false);

const excluir = () => {
  isExcluindo.value = true;
  administradoresStore.deleteAdministrador(props.administrador.idAdministrador)
    .then(data => emit('removerAdministrador', props.administrador.idAdministrador))
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => {
      isExcluindo.value = false;
      if (toggleModal.value)
        toggleModal.value = false;
    });
}
</script>

<template>
  <div class="block p-6 mb-3 rounded-lg shadow-lg bg-white">
    <h5 class="flex flex-row items-center text-gray-900 text-xl leading-tight font-medium break-words mb-2">
      {{ administrador.nome }}
      <Tag customColor="green" v-if="administrador.situacao === 1" class="ml-2">
        Ativo
      </Tag>
      <Tag customColor="orange" v-if="administrador.situacao === 0" class="ml-2">
        Inativo
      </Tag>
    </h5>

    <p class="text-gray-700 text-base break-words mb-4">
      {{ administrador.usuario.email }}
    </p>

    <div class="flex flex-wrap gap-2">
      <RouterLink :to="{
        name: 'administrador',
        params: {
          id: administrador.idAdministrador
        }
      }" class="card-footer-item">
        <Button>
          Visualizar
        </Button>
      </RouterLink>

      <Button customColor="green" v-if="administrador.situacao === 0" @click="ativar">
        <div class="flex items-center">
          <SpinLoading v-show="isAtivando" class="mr-3" />
          Ativar
        </div>
      </Button>

      <Button v-if="administrador.situacao === 1" customColor="orange" @click="inativar">
        <div class="flex items-center">
          <SpinLoading v-show="isInativando" class="mr-3" />
          Inativar
        </div>
      </Button>

      <!-- @click="excluir" -->
      <Button customColor="red" @click="toggleModal" class="sm:ml-auto">
        <div class="flex items-center">
          <SpinLoading v-show="isExcluindo" class="mr-3" />
          Excluir
        </div>
      </Button>
    </div>
  </div>

  <BaseModal :modalActive="modalActive" :closeButtonVisible="false" @close-modal="toggleModal">
    <div>
      <h2 class="text-2xl mb-1">Exclusão do administrador</h2>
      <p class="mb-4">
        Confirma a exclusão do administrador <b>{{ administrador.nome }}</b>?
      </p>
    </div>
    <div class="mt-4">
      <Button @click="excluir" customColor="red" class="mr-2">
        Excluir
      </Button>
      <Button @click="toggleModal">
        Não
      </Button>
    </div>
  </BaseModal>
</template>