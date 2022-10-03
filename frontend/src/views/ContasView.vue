<script setup>
import { onMounted } from 'vue';
import { useContasStore, useClientesStore } from '@/stores';
import SpinLoading from '@/components/layout/SpinLoading.vue';
import Conta from '@/components/Conta/Conta.vue';

defineEmits(['closeMenu']);

const contasStore = useContasStore();
const clientesStore = useClientesStore();

function carregarContas() {
  contasStore.getContas(filtroIdCliente, filtroSituacao);
}

onMounted(() => {
  carregarClientes();
  carregarContas();
})

const clientes = ref([]);
const clientesLoaded = ref(false);
function carregarClientes() {
  clientesLoaded.value = false;
  clientesStore.getClientesSimples()
    .then(response => {
      clientes.value = response.data;
    })
    .finally(clientesLoaded.value = true)
}

let filtroSituacao = 0;
let filtroIdCliente = null;
async function onChangeFiltroCliente(event) {
  filtroIdCliente = (event.target.value === 'todos') ? null : event.target.value;

  nextTick(() => {
    carregarContas();
  });
}
async function onChangeFiltroSituacao(event) {
  switch (event.target.value) {
    case 'abertas':
      filtroSituacao = 0;
      break;
    case 'pagas':
      filtroSituacao = 1;
      break;
    default:
      filtroSituacao = null;
  }

  nextTick(() => {
    carregarContas();
  });
}
</script>
    
<template>
  <div class="h-full">
    <div class="flex flex-col sm:flex-row pt-6 pl-6 pr-6">
      <div class="mr-4 text-2xl font-semibold">
        Contas
      </div>
      <div class="flex sm:ml-auto">
        <SelectInput name="idCliente" label="Cliente" v-show="clientes.length > 0" @change="onChangeFiltroCliente"
          initialValue="todos" class="mb-2">
          <option value="todos">Todos</option>
          <option v-for="cliente in clientes" :value="cliente.idCliente">{{ cliente.nome }}</option>
        </SelectInput>

        <SelectInput :disabled="!contasStore.contasLoaded" name="filtroSituacao" label="Situação" initialValue="abertas"
          @change="onChangeFiltroSituacao" class="ml-4">
          <option value="todas">Todas</option>
          <option value="abertas">Abertas</option>
          <option value="pagas">Pagas</option>
        </SelectInput>
      </div>
    </div>

    <div v-if="!contasStore.contasLoaded" class="h-full flex flex-row justify-center items-center">
      <div class="flex items-center">
        <SpinLoading :height="8" :width="8" color="text-teal-600" class="mr-3" />
        <p class="text-xl text-teal-600">
          Carregando...
        </p>
      </div>
    </div>

    <template v-else>
      <div class="flex flex-col justify-center p-6">
        <Conta v-for="conta in contasStore.contas" :key="conta.idConta" :conta="conta" />
      </div>

      <div v-if="!contasStore.contas.length" class="text-xl px-6 py-6">
        Não há nenhum conta.
      </div>
    </template>
  </div>
</template>