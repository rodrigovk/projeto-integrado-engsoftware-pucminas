<script setup>
import { ref } from 'vue';
import { useAuthStore, useAssinaturasStore } from '@/stores';
import { useDateFormat } from '@vueuse/core';
import Button from '@/components/layout/Button.vue';
import Tag from '@/components/layout/Tag.vue';
import SpinLoading from '../Layout/SpinLoading.vue';

const props = defineProps({
  assinatura: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['removerAssinatura']);
const authStore = useAuthStore();
const assinaturasStore = useAssinaturasStore();

const isAtivando = ref(false);
const isInativando = ref(false);

const deleteModalActive = ref(null);
const toggleDeleteModal = () => {
  deleteModalActive.value = !deleteModalActive.value;
};

const ativar = () => {
  isAtivando.value = true;
  assinaturasStore.putAssinaturaSituacao(props.assinatura.idAssinatura, 1)
    .then(data => props.assinatura.situacao = 1)
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => isAtivando.value = false);
}

const inativar = () => {
  isInativando.value = true;
  assinaturasStore.putAssinaturaSituacao(props.assinatura.idAssinatura, 0)
    .then(data => props.assinatura.situacao = 0)
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => isInativando.value = false);
}

const isExcluindo = ref(false);

const excluir = () => {
  isExcluindo.value = true;
  assinaturasStore.deleteAssinatura(props.assinatura.idAssinatura)
    .then(data => emit('removerAssinatura', props.assinatura.idAssinatura))
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => {
      isExcluindo.value = false;
      if (toggleDeleteModal.value)
        toggleDeleteModal.value = false;
    });
}

const dataVencimentoFormatada = computed(() => {
  let formattedDate = useDateFormat(props.assinatura.dataVencimento, 'DD/MM/YYYY')
  return formattedDate.value
})
</script>
  
<template>
  <div class="block p-6 mb-3 rounded-lg shadow-lg bg-white">
    <h5 class="flex flex-row items-center text-gray-900 text-xl leading-tight font-medium break-words mb-2">
      {{ assinatura.cliente.nome }}
      <Tag customColor="green" v-if="assinatura.situacao === 1" class="ml-2">
        Ativa
      </Tag>
      <Tag customColor="orange" v-if="assinatura.situacao === 0" class="ml-2">
        Inativa
      </Tag>
    </h5>

    <div class="text-gray-700">
      <p class="text-base break-words mb-1">
        {{ assinatura.descricao }}
      </p>

      <p class="text-base break-words mb-1">
        Valor: {{ vueNumberFormat(assinatura.valor, {}) }}
      </p>

      <p class="text-base break-words mb-2">
        Data vencimento: {{ dataVencimentoFormatada }}
      </p>
    </div>

    <div v-show="authStore.user.isAdministrador" class="flex">
      <RouterLink :to="{
        name: 'assinatura',
        params: {
          id: assinatura.idAssinatura
        }
      }" class="mr-2">
        <Button>
          Visualizar
        </Button>
      </RouterLink>

      <Button customColor="green" v-if="assinatura.situacao === 0" @click="ativar" class="mr-2">
        <div class="flex items-center">
          <SpinLoading v-show="isAtivando" class="mr-3" />
          Ativar
        </div>
      </Button>

      <Button v-if="assinatura.situacao === 1" customColor="orange" @click="inativar" class="mr-2">
        <div class="flex items-center">
          <SpinLoading v-show="isInativando" class="mr-3" />
          Inativar
        </div>
      </Button>

      <!-- @click="excluir" -->
      <Button customColor="red" @click="toggleDeleteModal" class="ml-auto">
        <div class="flex items-center">
          <SpinLoading v-show="isExcluindo" class="mr-3" />
          Excluir
        </div>
      </Button>
    </div>
  </div>

  <BaseModal :modalActive="deleteModalActive" :closeButtonVisible="false" @close-modal="toggleDeleteModal">
    <div>
      <h2 class="text-2xl mb-1">Exclusão do assinatura</h2>
      <p class="mb-4">
        Confirma a exclusão desta assinatura de <b>{{ assinatura.cliente.nome }}</b>?
      </p>
    </div>
    <div class="mt-4">
      <Button @click="excluir" customColor="red" class="mr-2">
        Excluir
      </Button>
      <Button @click="toggleDeleteModal">
        Não
      </Button>
    </div>
  </BaseModal>
</template>