<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores';
import { useTicketsStore } from '@/stores/tickets.store';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import TextAreaInput from '@/components/layout/TextAreaInput.vue';

const schema = Yup.object().shape({
  mensagem: Yup.string().required('Mensagem não informada').min(20, 'Mensagem deve ter pelo menos 20 caracteres').max(500, 'Mensagem deve ter no máximo 500 caracteres.'),
});

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  idTicket: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'scrollToResposta']);

const closeModal = () => {
  emit('update:modelValue', false)
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
  isSubmitting.value = true;

  const authStore = useAuthStore();
  const store = useTicketsStore();

  const dados = {
    idTicket: props.idTicket,
    idAdministrador: authStore.user.idAdministrador,
    idCliente: authStore.user.idCliente,
    mensagem: values.mensagem
  }

  // const idResposta = 13;
  // emit('scrollToResposta', idResposta);
  // return;

  store.postResposta(dados)
    .then(res => {
        props.ticket.respostas.push(res.data);
        resetForm();
      })
    .catch(error => setErrors({ apiError: error }))
    .finally(() => isSubmitting.value = false);
}

</script>

<template>
  <div class="">
    <div class="">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <TextAreaInput name="mensagem" type="text" label="Mensagem" placeholder="Mensagem" :rows="3" class="mb-4" />

        <Button :disabled="isSubmitting">
          <div class="flex items-center">
            <SpinLoading v-show="isSubmitting" class="mr-3" />
            Enviar
          </div>
        </Button>

        <div v-if="errors.apiError" class="text-red-700 mt-3 mb-0">{{ errors.apiError }}</div>
      </Form>
    </div>
  </div>
</template>