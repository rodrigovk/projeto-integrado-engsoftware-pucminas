<script setup>
import { ref } from 'vue';
import { useAuthStore, useContasStore } from '@/stores';
import { useDateFormat } from '@vueuse/core';
import Button from '@/components/layout/Button.vue';
import Tag from '@/components/layout/Tag.vue';
import SpinLoading from '../Layout/SpinLoading.vue';

const props = defineProps({
  conta: {
    type: Object,
    required: true
  }
})

// const emit = defineEmits(['removerConta']);
const authStore = useAuthStore();
const contasStore = useContasStore();

const pagarModalActive = ref(null);
const togglePagarModal = () => {
  pagarModalActive.value = !pagarModalActive.value;
};
const isPagando = ref(false);
const pagar = () => {
  isPagando.value = true;
  contasStore.encloseConta(props.conta.idConta)
    .then(response => {
      props.conta.situacao = 1;
    })
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => {
      isPagando.value = false;
      if (pagarModalActive.value)
        pagarModalActive.value = false;
    });
}

const dataVencimentoFormatada = computed(() => {
  let formattedDate = useDateFormat(props.conta.dataVencimento, 'DD/MM/YYYY')
  return formattedDate.value
})
</script>
    
<template>
  <div class="block p-6 mb-3 rounded-lg shadow-lg bg-white">
    <h5 class="flex flex-row items-center text-gray-900 text-xl leading-tight font-medium break-words mb-2">
      {{ conta.cliente.nome }}
      <Tag customColor="red" v-if="conta.situacao === 0" class="ml-2">
        Aberta
      </Tag>
      <Tag customColor="green" v-if="conta.situacao === 1" class="ml-2">
        Paga
      </Tag>
    </h5>

    <div class="text-gray-700">
      <p class="text-base break-words">
        Valor: {{ vueNumberFormat(conta.valor, {}) }}
      </p>

      <p class="text-base break-words mt-1">
        Data vencimento: {{ dataVencimentoFormatada }}
      </p>
    </div>

    <div v-show="authStore.user.isAdministrador && (conta.situacao === 0)" class="flex flex-wrap mt-2">
      <Button customColor="green" @click="togglePagarModal">
        <div class="flex items-center">
          <SpinLoading v-show="isPagando" class="mr-3" />
          Pagar
        </div>
      </Button>
    </div>
  </div>

  <BaseModal :modalActive="pagarModalActive" :closeButtonVisible="false" @close-modal="togglePagarModal">
    <div>
      <h2 class="text-2xl mb-1">Pagamento da conta</h2>
      <p class="mb-4">
        Confirma o pagamento desta conta de <b>{{ conta.cliente.nome }}</b>?
      </p>
    </div>
    <div class="mt-4">
      <Button @click="pagar" customColor="green" class="mr-2">
        Pagar
      </Button>
      <Button @click="togglePagarModal">
        Não
      </Button>
    </div>
  </BaseModal>
</template>