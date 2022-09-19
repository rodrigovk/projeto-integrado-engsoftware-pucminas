<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router'
import { useClientesStore } from '@/stores';
import { notify } from 'notiwind';
import { Form } from 'vee-validate';
import Button from '@/components/Layout/Button.vue';
import Tag from '@/components/Layout/Tag.vue';
import TextInput from '@/components/layout/TextInput.vue';
import SelectInput from '@/components/layout/SelectInput.vue';

const store = useClientesStore();
const route = useRoute();
const router = useRouter();

const cliente = ref({});
const form = ref(null);

const isLoading = ref(true);
const isCreating = computed(() => {
  return (route.params.id === undefined);
});

onMounted(async () => {
  load();
});

watch(
  () => route.params,
  (_current, _previous) => {
    load();
  },
  {
    deep: true
  }
);

async function load() {
  isLoading.value = true;
  if (route.params.id) {
    store.getCliente(route.params.id)
      .then(res => {
        const dados = res.data;
        cliente.value = { idCliente: dados.idCliente, nome: dados.nome, tipo: dados.tipo, cnpjCpf: dados.cnpjCpf, email: dados.usuario.email, senha: '' };
        isLoading.value = false;
      });
  } else {
    cliente.value = { tipo: 1, usuario: {} };
    nextTick(() => {
      if (form.value) {
        form.value.resetForm();
      }
    });
    isLoading.value = false;
  }
}

let isSubmitting = ref(false);

function onSubmit(values, { setFieldError, setErrors, resetForm }) {
  setErrors({});
  
  const store = useClientesStore();

  const { nome, tipo, cnpjCpf, email, senha } = values;
  const cnpjCpfLimpo = cnpjCpf.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '');

  let errors = 0;
  if (nome.length === 0) {
    setFieldError('nome', 'Nome não informado.');
    errors++;
  }

  if (email.length === 0) {
    setFieldError('email', 'E-mail não informado.');
    errors++;
  }

  if (isCreating.value) {
    if (senha.length === 0) {
      setFieldError('senha', 'Senha não informada.');
      errors++;
    }
  } else {
    if (senha.length !== 0 && senha.length < 8) {
      setFieldError('senha', 'Senha deve ter pelo menos 8 caractéres.');
      errors++;
    }
  }

  if (errors > 0)
    return;

  isSubmitting.value = true;
  if (isCreating.value) {
    return store.postCliente(nome, tipo, cnpjCpfLimpo, email, senha)
      .then(response => {
        notify({
          group: 'ok',
          title: 'Cliente criado com sucesso.',
        });
        router.push(`/clientes/${response.data.idCliente}`);
      })
      .catch(error => setErrors({ apiError: error }))
      .finally(() => isSubmitting.value = false);
  } else {
    return store.putCliente(cliente.value.idCliente, nome, tipo, cnpjCpfLimpo, email, senha)
      .then(data => {
        notify({
          group: 'ok',
          title: 'Cliente alterado com sucesso.',
        })
      })
      .catch(error => setErrors({ apiError: error }))
      .finally(() => isSubmitting.value = false);
  }
}
</script>
  
<template>
  <div v-if="!isLoading" class="block p-6 shadow-lg bg-white">
    <div class="mb-5">
      <RouterLink to="/clientes">
        <Button class="mr-2">
          &lt; Voltar
        </Button>
      </RouterLink>

      <RouterLink :to="{ name: 'cliente_novo' }" v-show="!isCreating">
        <Button class="">
          Criar cliente
        </Button>
      </RouterLink>
    </div>

    <!-- :validation-schema="isCreating ? schemaCreate : schemaAlter" -->
    <Form @submit="onSubmit" v-slot="{ errors }" :initial-values="cliente" ref="form">
      <TextInput name="nome" type="text" label="Nome" placeholder="Nome" class="mb-2" />

      <div class="mb-2" v-show="!isCreating">
        <Tag customColor="green" v-if="cliente.situacao === 1">
          Ativo
        </Tag>
        <Tag customColor="orange" v-if="cliente.situacao === 0">
          Inativo
        </Tag>
      </div>

      <TextInput name="email" type="email" label="E-mail" placeholder="Endereço de e-mail" class="mb-2" />
      
      <SelectInput name="tipo" label="Tipo" class="mb-2">
        <option value="0">Físico</option>
        <option value="1">Jurídico</option>
      </SelectInput>
      
      <TextInput name="cnpjCpf" type="text" label="CNPJ/CPF" placeholder="CNPJ/CPF" v-mask="['###.###.###-##', '##.###.###/####-##']" class="mb-2" />

      <TextInput name="senha" type="password"
        :label="isCreating ? 'Senha' : 'Senha (preencher apenas caso deseje trocar a senha)'"
        autocomplete="new-password" placeholder="Senha" class="mb-4" />

      <div class="">
        <Button :disabled="isSubmitting">
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
      </div>

      <div v-if="errors.apiError" class="text-red-700 mt-3 mb-0">{{ errors.apiError }}</div>
    </Form>
  </div>
</template>