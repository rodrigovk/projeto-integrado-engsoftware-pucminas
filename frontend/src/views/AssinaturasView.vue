<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, useAssinaturasStore, useClientesStore } from '@/stores';
import { notify } from 'notiwind';
import { Form } from 'vee-validate';
import { formatDateToISOString } from '@/helpers';
import SpinLoading from '@/components/layout/SpinLoading.vue';
import Assinatura from '@/components/Assinatura/Assinatura.vue';

defineEmits(['closeMenu']);

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const assinaturasStore = useAssinaturasStore();
const clientesStore = useClientesStore();

onMounted(() => {
  assinaturasStore.init();
  if (route.path === '/assinaturas/novo') {
    visualizarAssinatura(0);
    return;
  }
  if (route.params.id) {
    visualizarAssinatura(route.params.id);
    return;
  }
})

watch(
  () => route,
  (current, _previous) => {
    if (current.path === '/assinaturas/novo') {
      visualizarAssinatura(0);
      return;
    }
    if (current.params.id) {
      visualizarAssinatura(current.params.id);
      return;
    }
  },
  {
    deep: true
  }
);

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

const record = ref({});
const recordModalActive = ref(null);
const toggleRecordModal = () => {
  recordModalActive.value = !recordModalActive.value;
};
const isCreatingRecord = computed(() => {
  return (route.params.id === undefined);
});
function visualizarAssinatura(idAssinatura) {
  if (idAssinatura > 0) {
    assinaturasStore.getAssinatura(idAssinatura)
      .then(response => {
        const assinatura = response.data;
        assinatura.dataVencimento = formatDateToISOString(new Date(assinatura.dataVencimento)); //.toISOString().slice(0, 10);
        assinatura.dataProximoVencimento = formatDateToISOString(new Date(assinatura.dataProximoVencimento)) //.toISOString().slice(0, 10);
        record.value = assinatura;
        recordModalActive.value = true;
      })
  } else {
    record.value = {};
    recordModalActive.value = true;
  }

  carregarClientes();
}

function removerAssinatura(idAssinatura) {
  const index = assinaturasStore.assinaturas.findIndex(assinatura => {
    return (assinatura.idAssinatura === idAssinatura);
  });
  assinaturasStore.assinaturas.splice(index, 1);
}

const isGravandoAssinatura = ref(false);
function gravarAssinatura(values, { setFieldError, setErrors, resetForm }) {
  setErrors({});

  const store = useAssinaturasStore();
  const { idCliente, descricao, valor, dataVencimento, dataProximoVencimento } = values;

  let errors = 0;
  if (idCliente === null || idCliente === '') {
    setFieldError('idCliente', 'Cliente não informado.');
    errors++;
  }

  if (descricao.length === 0) {
    setFieldError('descricao', 'Descrição não informada.');
    errors++;
  }

  if (valor === null || valor === '') {
    setFieldError('valor', 'Valor não informado.');
    errors++;
  }

  if (dataVencimento === null || dataVencimento === '') {
    setFieldError('dataVencimento', 'Data de vencimento não informada.');
    errors++;
  }

  if (dataProximoVencimento === null || dataProximoVencimento === '') {
    setFieldError('dataProximoVencimento', 'Data do próximo vencimento não informada.');
    errors++;
  }

  if (errors > 0)
    return;

  const _idCliente = parseInt(idCliente);
  const _valor = parseFloat(valor);
  const _dataVencimento = new Date(dataVencimento);
  const _dataProximoVencimento = new Date(dataProximoVencimento);

  isGravandoAssinatura.value = true;
  if (isCreatingRecord.value) {
    return store.postAssinatura(_idCliente, descricao, _valor, _dataVencimento, _dataProximoVencimento)
      .then(response => {
        notify({
          group: 'ok',
          title: 'Assinatura criada com sucesso.',
        });
        assinaturasStore.init();
        router.push(`/assinaturas/${response.data.idAssinatura}`);
      })
      .catch(error => setErrors({ apiError: error }))
      .finally(() => isGravandoAssinatura.value = false);
  } else {
    return store.putAssinatura(record.value.idAssinatura, descricao, _valor, _dataVencimento, _dataProximoVencimento)
      .then(data => {
        notify({
          group: 'ok',
          title: 'Assinatura alterada com sucesso.',
        });
        assinaturasStore.init();
      })
      .catch(error => setErrors({ apiError: error }))
      .finally(() => isGravandoAssinatura.value = false);
  }
}

const gerarContasModalActive = ref(null);
const toggleGerarContasModal = () => {
  gerarContasModalActive.value = !gerarContasModalActive.value;
}
const isGerandoContas = ref(false);
function gerarContasAssinatura() {
  isGerandoContas.value = true;
  assinaturasStore.generateContasAssinaturaProximoVencimento()
    .then(response => {
      if (response.data.length > 0) {
        notify({
          group: 'ok',
          title: 'Contas geradas com sucesso.',
        });
        assinaturasStore.init();
      } else {
        notify({
          group: 'info',
          title: 'Nenhuma assinatura está próxima do vencimento.',
        });
      }
    })
    .catch(error => notify({
      group: 'error',
      title: error.message || error,
    }))
    .finally(() => {
      isGerandoContas.value = false;
      if (gerarContasModalActive.value)
        gerarContasModalActive.value = false;
    });
}
</script>
  
<template>
  <div class="h-full">
    <div class="p-6">
      <div class="flex flex-col h-full">
        <div class="flex items-center text-2xl font-semibold">
          Assinaturas
        </div>

        <div v-if="!assinaturasStore.assinaturasLoaded" class="flex-1 flex flex-row justify-center items-center">
          <div class="flex items-center">
            <SpinLoading :height="8" :width="8" color="text-teal-600" class="mr-3" />
            <p class="text-xl text-teal-600">
              Carregando...
            </p>
          </div>
        </div>

        <template v-else>
          <div class="flex flex-wrap gap-2 mt-2" v-show="authStore.user.isAdministrador">
            <RouterLink :to="{ name: 'assinatura_novo' }">
              <Button>
                Criar assinatura
              </Button>
            </RouterLink>

            <Button @click="toggleGerarContasModal">
              <SpinLoading v-show="isGerandoContas" class="mr-3" />
              Gerar contas
            </Button>
          </div>

          <div class="flex flex-col justify-center pt-6">
            <Assinatura v-for="assinatura in assinaturasStore.assinaturas" :key="assinatura.idAssinatura"
              :assinatura="assinatura" @removerAssinatura="removerAssinatura" />
          </div>

          <div v-if="!assinaturasStore.assinaturas.length" class="text-xl px-6">
            Não há nenhuma assinatura.
          </div>
        </template>
      </div>
    </div>

    <BaseModal :modalActive="recordModalActive" :closeButtonVisible="false" @close-modal="toggleRecordModal"
      classPanel="w-full sm:w-5/6 md:w-4/6 lg:w-3/6">
      <div class="">
        <div>
          <h2 class="text-2xl mb-1">Assinatura</h2>
          <div class="mb-2" v-show="!isCreatingRecord">
            <Tag customColor="green" v-if="record.situacao === 1">
              Ativa
            </Tag>
            <Tag customColor="orange" v-if="record.situacao === 0">
              Inativa
            </Tag>
          </div>
        </div>

        <Form @submit="gravarAssinatura" v-slot="{ errors }" :initial-values="record" ref="form">
          <SelectInput name="idCliente" label="Cliente" v-show="clientes.length > 0" :disabled="!isCreatingRecord"
            class="mb-2">
            <option v-for="cliente in clientes" :value="cliente.idCliente">{{ cliente.nome }}</option>
          </SelectInput>

          <TextInput name="descricao" type="text" label="Descrição" placeholder="Descrição" class="mb-2" />

          <TextInput name="valor" type="number" step="1" label="Valor" placeholder="Valor" class="mb-2" />

          <TextInput name="dataVencimento" type="date" label="Data de vencimento" placeholder="Data de vencimento"
            class="mb-2" />

          <TextInput name="dataProximoVencimento" type="date" label="Data do próximo vencimento"
            placeholder="Data de vencimento" class="mb-2" />

          <div class="mt-4">
            <Button :disabled="isGravandoAssinatura" class="mr-2">
              <div v-show="isGravandoAssinatura" class="flex">
                <div class="flex items-center">
                  <SpinLoading class="mr-2" />
                  Gravando...
                </div>
              </div>
              <div v-show="!isGravandoAssinatura">
                Gravar
              </div>
            </Button>

            <RouterLink :to="{
              name: 'assinaturas',
            }" @click.prevent="toggleRecordModal" :disable="isGravandoAssinatura" class="mr-2">
              <Button customColor="red">
                Descartar
              </Button>
            </RouterLink>
          </div>

          <div v-if="errors.apiError" class="text-red-700 mt-3 mb-0">{{ errors.apiError }}</div>
        </Form>
      </div>
    </BaseModal>

    <BaseModal :modalActive="gerarContasModalActive" :closeButtonVisible="false" @close-modal="toggleGerarContasModal">
      <div>
        <h2 class="text-2xl mb-1">Geração de contas das assinaturas</h2>
        <p class="mb-4">
          Confirma a geração de contas das assinaturas com vencimento próximo?
        </p>
      </div>
      <div class="mt-4">
        <Button @click="gerarContasAssinatura" class="mr-2">
          Gerar contas
        </Button>
        <Button @click="toggleGerarContasModal">
          Não
        </Button>
      </div>
    </BaseModal>
  </div>
</template>