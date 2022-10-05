<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router'
import { useAdministradoresStore } from '@/stores';
import { notify } from 'notiwind';
import { Form } from 'vee-validate';
import Button from '@/components/Layout/Button.vue';
import Tag from '@/components/Layout/Tag.vue';
import TextInput from '@/components/layout/TextInput.vue';

const store = useAdministradoresStore();
const route = useRoute();
const router = useRouter();

const administrador = ref({});
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
    store.getAdministrador(route.params.id)
      .then(res => {
        const dados = res.data;
        administrador.value = { idAdministrador: dados.idAdministrador, nome: dados.nome, email: dados.usuario.email, senha: '' };
        isLoading.value = false;
      });
  } else {
    administrador.value = { usuario: {} };
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

  const store = useAdministradoresStore();

  const { nome, email, senha } = values;

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
    return store.postAdministrador(nome, email, senha)
      .then(response => {
        notify({
          group: 'ok',
          title: 'Administrador criado com sucesso.',
        });
        router.push(`/administradores/${response.data.idAdministrador}`);
      })
      .catch(error => setErrors({ apiError: error }))
      .finally(() => isSubmitting.value = false);
  } else {
    return store.putAdministrador(administrador.value.idAdministrador, nome, email, senha)
      .then(data => {
        notify({
          group: 'ok',
          title: 'Administrador alterado com sucesso.',
        })
      })
      .catch(error => setErrors({ apiError: error }))
      .finally(() => isSubmitting.value = false);
  }
}
</script>

<template>
  <div v-if="!isLoading" class="h-full block p-6 shadow-lg bg-white">
    <div class="mb-5">
      <RouterLink to="/administradores" class="mr-2">
        <Button>
          &lt; Voltar
        </Button>
      </RouterLink>

      <RouterLink :to="{ name: 'administrador_novo' }" v-show="!isCreating">
        <Button class="">
          Criar administrador
        </Button>
      </RouterLink>
    </div>

    <Form @submit="onSubmit" v-slot="{ errors }" :initial-values="administrador" ref="form">
      <TextInput name="nome" type="text" label="Nome" placeholder="Nome" class="mb-2" />

      <div class="mb-2" v-show="!isCreating">
        <Tag customColor="green" v-if="administrador.situacao === 1">
          Ativo
        </Tag>
        <Tag customColor="orange" v-if="administrador.situacao === 0">
          Inativo
        </Tag>
      </div>

      <TextInput name="email" type="email" label="E-mail" placeholder="Endereço de e-mail" class="mb-2" />

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