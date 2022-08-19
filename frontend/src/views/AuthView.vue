<script setup>
import { ref } from 'vue';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores';
import TextInput from '@/components/layout/TextInput.vue';
import Button from '@/components/layout/Button.vue';
import logoSVG from '@/assets/images/logo.svg';

const schema = Yup.object().shape({
  username: Yup.string().required('E-mail não informado'),
  password: Yup.string().required('Senha não informada')
});

let isSubmitting = ref(false);

function onSubmit(values, { setErrors }) {
  isSubmitting.value = true;

  const authStore = useAuthStore();
  const { username, password } = values;

  return authStore.login(username, password)
    .catch(error => setErrors({ apiError: error }))
    .finally(() => isSubmitting.value = false);
}
</script>

<template>
  <div class="flex flex-col items-center content-center align-middle place-content-center h-screen bg-slate-600 text-gray-700">
    <div class="bg-slate-50 p-8 drop-shadow-md">
      <div class="flex flex-row items-center content-between text-gray-500 mb-8">
        <img class="w-20 h-20 mr-4 drop-shadow-sm" :src="logoSVG" alt="my-logo" />
        <div class="flex flex-col items-center">
          <div class="text-6xl leading-none font-normal tracking-wide">
            Global Soft
          </div>
          <div class="text-xl font-light leading-tight">
            SISTEMAS E CONSULTORIA
          </div>
        </div>
      </div>

      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">

        <TextInput name="username" type="email" label="E-mail" placeholder="Endereço de e-mail" class="mb-2" />
        <TextInput name="password" type="password" label="Senha" placeholder="Senha" class="mb-4" />

        <div class="">
          <Button :disabled="isSubmitting" customTextSize="lg">
            <div v-show="isSubmitting" class="flex">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Entrando...
            </div>
            <div v-show="!isSubmitting">
              Entrar
            </div>
          </Button>
        </div>
        <div v-if="errors.apiError" class="text-red-700 mt-3 mb-0">{{ errors.apiError }}</div>
      </Form>
    </div>
  </div>
</template>