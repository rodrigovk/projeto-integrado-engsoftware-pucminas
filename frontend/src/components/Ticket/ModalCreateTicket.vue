<script setup>

import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores';
import { useTicketsStore } from '@/stores/tickets.store';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import TextInput from '../Layout/TextInput.vue';
import TextAreaInput from '@/components/layout/TextAreaInput.vue';

const schema = Yup.object().shape({
  assunto: Yup.string().required('Assunto não informado').min(10, 'Assunto deve ter pelo menos 10 caracteres').max(100, 'Assunto deve ter no máximo 100 caracteres.'),
  descricao: Yup.string().required('Descrição não informada').min(20, 'Descrição deve ter pelo menos 20 caracteres').max(500, 'Descrição deve ter no máximo 500 caracteres.'),
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const router = useRouter();

const closeModal = () => {
  //emit('update:modelValue', false)
}

const handleKeyboard = e => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  document.addEventListener('keyup', handleKeyboard)
})
onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard)
})

async function onSubmit(values, { setErrors }) {
  const authStore = useAuthStore();
  const store = useTicketsStore();

  const dados = {
    assunto: values.assunto,
    descricao: values.descricao,
  }

  if (authStore.user.isAdministrador) {
    dados.idAdministrador = authStore.user.idAdministrador;
  } else {
    dados.idCliente = authStore.user.idCliente;
  }

  await store.postTicket(dados)
    .then(_res => {
      router.go();
    })
    .catch(error => setErrors({ apiError: error }));
}
</script>

<template>
  <div class="block p-6 shadow-lg bg-white">
    <div class="">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <TextInput name="assunto" type="text" label="Assunto" placeholder="Assunto" class="mb-2" />
        <TextAreaInput name="descricao" type="text" label="Descrição" placeholder="Descrição" rows="3" class="mb-4" />

        <Button :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Criar ticket
        </Button>

        <div v-if="errors.apiError" class="text-red-700 mt-3 mb-0">{{ errors.apiError }}</div>
      </Form>
    </div>
  </div>
</template>