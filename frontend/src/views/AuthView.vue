<route lang="json">{
  "meta": {
    "title": "Login"
  }
}</route>

<script setup>
  import { Form, Field } from 'vee-validate';
  import * as Yup from 'yup';
  import { useAuthStore } from '@/stores';
  import Button from '@/components/layout/Button.vue';
  import logoSVG from '@/assets/images/logo.svg';

  const schema = Yup.object().shape({
    username: Yup.string().required('E-mail não informado'),
    password: Yup.string().required('Senha não informada')
  });

  function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { username, password } = values;

    return authStore.login(username, password)
      .catch(error => setErrors({ apiError: error }));
  }
</script>

<template>
  <div class="flex flex-col items-center content-center align-middle place-content-center h-screen bg-slate-600 text-gray-700">
    <div class="bg-slate-200 p-8 drop-shadow-md">
      <div class="navbar-brand flex flex-row items-center content-between text-gray-500 mb-8">
        <img class="w-20 h-20 mr-4 drop-shadow-sm" :src="logoSVG" alt="my-logo" />
        <div class="flex flex-col items-center">
          <div class="text-5xl font-normal tracking-wide">
            Global Soft
          </div>
          <div class="text-xl font-light">
            SISTEMAS E CONSULTORIA
          </div>
        </div>
      </div>

      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="form-group flex flex-col mb-2">
          <label>E-mail</label>
          <Field name="username" type="text" class="form-control" :class="{ 'border-2 border-rose-500': errors.username }" />
          <div class="text-red-500">{{ errors.username }}</div>
        </div>

        <div class="form-group flex flex-col mb-2">
          <label>Senha</label>
          <Field name="password" type="password" class="form-control" :class="{ 'border-2 border-rose-500': errors.password }" />
          <div class="text-red-500">{{ errors.password }}</div>
        </div>

        <div class="form-group">
          <Button :disabled="isSubmitting">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Login
          </Button>
          <!-- <button class="btn btn-primary" :disabled="isSubmitting">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Login
          </button> -->
        </div>
        <div v-if="errors.apiError" class="text-red-700 mt-3 mb-0">{{ errors.apiError }}</div>
      </Form>
    </div>
  </div>
</template>
