<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, useAssinaturasStore, useClientesStore } from '@/stores';
import { notify } from 'notiwind';
import { Form } from 'vee-validate';
import SpinLoading from '@/components/layout/SpinLoading.vue';
import Assinatura from '@/components/Assinatura/Assinatura.vue';
import { formatDateToISOString } from '@/helpers/dateUtils';

defineEmits(['closeMenu']);

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const assinaturasStore = useAssinaturasStore();
const clientesStore = useClientesStore();

const clientes = ref([]);
const clientesLoaded = ref(false);

const record = ref({});
const recordModalActive = ref(null);
const toggleRecordModal = () => {
  recordModalActive.value = !recordModalActive.value;
};
const isCreatingRecord = computed(() => {
  return (route.params.id === undefined);
});

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

function carregarClientes() {
  clientesLoaded.value = false;
  clientesStore.getClientesSimples()
    .then(response => {
      clientes.value = response.data;
    })
    .finally(clientesLoaded.value = true)
}

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

let isSubmitting = ref(false);

function onSubmit(values, { setFieldError, setErrors, resetForm }) {
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

  isSubmitting.value = true;
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
      .finally(() => isSubmitting.value = false);
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
      .finally(() => isSubmitting.value = false);
  }
}
</script>
  
<template>
  <div>
    <div class="h-full">
      <div class="flex items-center text-2xl font-semibold pt-6 pl-6">
        Assinaturas
      </div>

      <div v-if="!assinaturasStore.assinaturasLoaded" class="h-full flex flex-row justify-center items-center">
        <div class="flex items-center">
          <SpinLoading :height="8" :width="8" color="text-teal-600" class="mr-3" />
          <p class="text-xl text-teal-600">
            Carregando...
          </p>
        </div>
      </div>

      <template v-else>
        <RouterLink :to="{ name: 'assinatura_novo' }" v-show="authStore.user.isAdministrador">
          <Button class="mt-2 ml-6">
            Criar assinatura
          </Button>
        </RouterLink>

        <div class="flex flex-col justify-center p-6">
          <Assinatura v-for="assinatura in assinaturasStore.assinaturas" :key="assinatura.idAssinatura"
            :assinatura="assinatura" @removerAssinatura="removerAssinatura" />
        </div>

        <div v-if="!assinaturasStore.assinaturas.length" class="text-xl px-6 py-6">
          Não há nenhum assinatura.
        </div>
      </template>
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

        <Form @submit="onSubmit" v-slot="{ errors }" :initial-values="record" ref="form">
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
            <Button :disabled="isSubmitting" class="mr-2">
              <div v-show="isSubmitting" class="flex">
                <div class="flex items-center">
                  <SpinLoading class="mr-2" />
                  Gravando...
                </div>
              </div>
              <div v-show="!isSubmitting">
                Gravar
              </div>
            </Button>

            <RouterLink :to="{
              name: 'assinaturas',
            }" @click.prevent="toggleRecordModal" :disable="isSubmitting" class="mr-2">
              <Button customColor="red">
                Descartar
              </Button>
            </RouterLink>
          </div>

          <div v-if="errors.apiError" class="text-red-700 mt-3 mb-0">{{ errors.apiError }}</div>
        </Form>
      </div>
    </BaseModal>
  </div>
</template>