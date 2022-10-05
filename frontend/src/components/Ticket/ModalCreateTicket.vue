<script setup>

import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores';
import { useTicketsStore } from '@/stores/tickets.store';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import TextInput from '../Layout/TextInput.vue';
import TextAreaInput from '@/components/layout/TextAreaInput.vue';
import SpinLoading from '@/components/layout/SpinLoading.vue';

const schema = Yup.object().shape({
  assunto: Yup.string().required('Assunto não informado').min(10, 'Assunto deve ter pelo menos 10 caracteres').max(100, 'Assunto deve ter no máximo 100 caracteres.'),
  descricao: Yup.string().required('Descrição não informada').min(20, 'Descrição deve ter pelo menos 20 caracteres').max(500, 'Descrição deve ter no máximo 500 caracteres.'),
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue'])

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

let isSubmitting = ref(false);

async function onSubmit(values, { resetForm, setErrors }) {
  setErrors({});

  isSubmitting.value = true;

  try {
    const authStore = useAuthStore();
    const ticketsStore = useTicketsStore();

    const dados = {
      assunto: values.assunto,
      descricao: values.descricao,
    }

    if (authStore.user.isAdministrador) {
      dados.idAdministrador = authStore.user.idAdministrador;
    } else {
      dados.idCliente = authStore.user.idCliente;
    }

    await ticketsStore.postTicket(dados)
      .then(res => {
        ticketsStore.tickets.unshift({ ...res.data, novo: true });
        resetForm();
      })
      .catch(error => setErrors({ apiError: error }));
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="block rounded-lg shadow-lg bg-white">
    <h2 class="text-xl font-bold mb-2">Criar ticket</h2>
    <div class="">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <TextInput name="assunto" type="text" label="Assunto" placeholder="Assunto" class="mb-2" />
        <TextAreaInput name="descricao" type="text" label="Descrição" placeholder="Descrição" :rows="3" class="mb-4" />

        <Button :disabled="isSubmitting">
          <div class="flex items-center">
            <SpinLoading v-show="isSubmitting" class="mr-3" />
            Criar ticket
          </div>
        </Button>

        <div v-if="errors.apiError" class="text-red-700 mt-3 mb-0">{{ errors.apiError }}</div>
      </Form>
    </div>
  </div>
</template>