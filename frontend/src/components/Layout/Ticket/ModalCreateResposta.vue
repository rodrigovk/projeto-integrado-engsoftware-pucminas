<script setup>

  import { ref, onMounted, onUnmounted } from 'vue';
  import { useTicketsStore } from '@/stores/tickets.store';
  import { useAuthStore } from '@/stores';
  import { Form, Field } from 'vee-validate';
  import * as Yup from 'yup';
  import { useRouter } from 'vue-router'

  const schema = Yup.object().shape({
    mensagem: Yup.string().required('Mensagem não informada').min(20, 'Mensagem deve ter pelo menos 20 caracteres').max(500, 'Mensagem deve ter no máximo 500 caracteres.'),
  });

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    idTicket: {
      type: Number,
      required: true
    }
  })

  const emit = defineEmits(['update:modelValue'])
  const router = useRouter();

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

  function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const store = useTicketsStore();
    
    const dados = {
      idTicket: props.idTicket,
      idAdministrador: authStore.user.idAdministrador,
      idCliente: authStore.user.idCliente,
      mensagem: values.mensagem
    }

    store.postResposta(dados)
      .then(router.go())
      .catch(error => setErrors({ apiError: error }));
  }

</script>

<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div
      class="modal-card"
    >
      <!-- <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button
          @click="closeModal"
          class="delete"
          aria-label="close"
        >
        </button>
      </header> -->
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="form-group flex flex-col mb-2">
          <label>Mensagem</label>
          <Field name="mensagem" type="text" class="form-control" :class="{ 'border-2 border-rose-500': errors.mensagem }" />
          <div class="text-red-500">{{ errors.mensagem }}</div>
        </div>

        <Button :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Enviar
        </Button>

        <div v-if="errors.apiError" class="text-red-700 mt-3 mb-0">{{ errors.apiError }}</div>
      </Form>

      <!-- <section class="modal-card-body">
        Enviar uma nova resposta
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button
          @click="closeModal"
          class="button"
        >
          Cancel
        </button>
        <button
          class="button is-danger"
          @click="store.deleteNote(noteId)"
        >
          Delete
        </button>
      </footer> -->
    </div>
  </div>
</template>