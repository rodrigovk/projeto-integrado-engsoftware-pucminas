<script setup>
import { ref } from 'vue';
import { useClientesStore } from '@/stores';
import Button from '@/components/layout/Button.vue';
import Tag from '@/components/layout/Tag.vue';
import SpinLoading from '../Layout/SpinLoading.vue';

const props = defineProps({
  cliente: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['removerCliente']);

const clientesStore = useClientesStore();

const isAtivando = ref(false);
const isInativando = ref(false);

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const ativar = () => {
  isAtivando.value = true;
  clientesStore.putClienteSituacao(props.cliente.idCliente, 1)
    .then(data => props.cliente.situacao = 1)
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => isAtivando.value = false);
}

const inativar = () => {
  isInativando.value = true;
  clientesStore.putClienteSituacao(props.cliente.idCliente, 0)
    .then(data => props.cliente.situacao = 0)
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => isInativando.value = false);
}

const isExcluindo = ref(false);

const excluir = () => {
  isExcluindo.value = true;
  clientesStore.deleteCliente(props.cliente.idCliente)
    .then(data => emit('removerCliente', props.cliente.idCliente))
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
      {{ cliente.nome }}
      <Tag customColor="green" v-if="cliente.situacao === 1" class="ml-2">
        Ativo
      </Tag>
      <Tag customColor="orange" v-if="cliente.situacao === 0" class="ml-2">
        Inativo
      </Tag>
    </h5>

    <p class="text-gray-700 text-base break-words mb-4">
      {{ cliente.usuario.email }}
    </p>

    <div class="flex">
      <RouterLink :to="{
        name: 'cliente',
        params: {
          id: cliente.idCliente
        }
      }" class="card-footer-item">
        <Button class="mr-2">
          Visualizar
        </Button>
      </RouterLink>

      <Button customColor="green" v-if="cliente.situacao === 0" @click="ativar" class="mr-2">
        <div class="flex items-center">
          <SpinLoading v-show="isAtivando" class="mr-3" />
          Ativar
        </div>
      </Button>

      <Button v-if="cliente.situacao === 1" customColor="orange" @click="inativar" class="mr-2">
        <div class="flex items-center">
          <SpinLoading v-show="isInativando" class="mr-3" />
          Inativar
        </div>
      </Button>

      <!-- @click="excluir" -->
      <Button customColor="red" @click="toggleModal" class="ml-auto">
        <div class="flex items-center">
          <SpinLoading v-show="isExcluindo" class="mr-3" />
          Excluir
        </div>
      </Button>
    </div>
  </div>

  <BaseModal :modalActive="modalActive" :closeButtonVisible="false" @close-modal="toggleModal">
    <div>
      <h2 class="text-2xl mb-1">Exclusão do cliente</h2>
      <p class="mb-4">
        Confirma a exclusão do cliente <b>{{ cliente.nome }}</b>?
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