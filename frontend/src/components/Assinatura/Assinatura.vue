<script setup>
import { ref } from 'vue';
import { useAuthStore, useAssinaturasStore } from '@/stores';
import { useDateFormat } from '@vueuse/core';
import { notify } from 'notiwind';
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

const isInativando = ref(false);
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

const excluirModalActive = ref(null);
const toggleExcluirModal = () => {
  excluirModalActive.value = !excluirModalActive.value;
};
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
      if (toggleExcluirModal.value)
        toggleExcluirModal.value = false;
    });
}

const gerarContaModalActive = ref(null);
const toggleGerarContaModal = () => {
  gerarContaModalActive.value = !gerarContaModalActive.value;
}
const isGerandoConta = ref(false);
const gerarConta = () => {
  isGerandoConta.value = true;
  assinaturasStore.generateContaAssinatura(props.assinatura.idAssinatura)
    .then(response => {
      notify({
        group: 'ok',
        title: 'Conta gerada com sucesso.',
      });
      assinaturasStore.init();
    })
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => {
      isGerandoConta.value = false;
      if (gerarContaModalActive.value)
        gerarContaModalActive.value = false;
    });
}

const dataVencimentoFormatada = computed(() => {
  const formattedDate = useDateFormat(props.assinatura.dataVencimento, 'DD/MM/YYYY')
  return formattedDate.value
})

const dataProximoVencimentoFormatada = computed(() => {
  const formattedDate = useDateFormat(props.assinatura.dataProximoVencimento, 'DD/MM/YYYY')
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

      <div class="flex md:flex-row flex-col">
        <p class="text-base break-words mb-1 md:mb-0 md:mr-4">
          Data vencimento: {{ dataVencimentoFormatada }}
        </p>
        <p class="text-base break-words">
          Próximo vencimento: {{ dataProximoVencimentoFormatada }}
        </p>
      </div>
    </div>

    <div v-show="authStore.user.isAdministrador" class="flex flex-wrap mt-2">
      <RouterLink :to="{
        name: 'assinatura',
        params: {
          id: assinatura.idAssinatura
        }
      }" class="mr-2">
        <Button>
          Editar
        </Button>
      </RouterLink>

      <Button v-if="assinatura.situacao === 1" customColor="teal" @click="toggleGerarContaModal" class="mr-2">
        <div class="flex items-center">
          <SpinLoading v-show="isGerandoConta" class="mr-3" />
          Gerar conta
        </div>
      </Button>

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

      <Button customColor="red" @click="toggleExcluirModal" class="sm:ml-auto">
        <div class="flex items-center">
          <SpinLoading v-show="isExcluindo" class="mr-3" />
          Excluir
        </div>
      </Button>
    </div>
  </div>

  <BaseModal :modalActive="gerarContaModalActive" :closeButtonVisible="false" @close-modal="toggleGerarContaModal">
    <div>
      <h2 class="text-2xl mb-1">Geração de conta da assinatura</h2>
      <p class="mb-4">
        Confirma a geração de conta da assinatura de <b>{{ assinatura.cliente.nome }}</b>?
      </p>
    </div>
    <div class="mt-4">
      <Button @click="gerarConta" class="mr-2">
        Gerar conta
      </Button>
      <Button @click="toggleGerarContaModal">
        Não
      </Button>
    </div>
  </BaseModal>

  <BaseModal :modalActive="excluirModalActive" :closeButtonVisible="false" @close-modal="toggleExcluirModal">
    <div>
      <h2 class="text-2xl mb-1">Exclusão da assinatura</h2>
      <p class="mb-4">
        Confirma a exclusão desta assinatura de <b>{{ assinatura.cliente.nome }}</b>?
      </p>
    </div>
    <div class="mt-4">
      <Button @click="excluir" customColor="red" class="mr-2">
        Excluir
      </Button>
      <Button @click="toggleExcluirModal">
        Não
      </Button>
    </div>
  </BaseModal>
</template>