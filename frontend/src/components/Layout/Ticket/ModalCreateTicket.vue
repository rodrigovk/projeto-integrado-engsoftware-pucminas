<script setup>

  import { ref, onMounted, onUnmounted } from 'vue';
  import { useAuthStore } from '@/stores';
  import { useTicketsStore } from '@/stores/tickets.store';
  import { Form, Field } from 'vee-validate';
  import * as Yup from 'yup';
  import { useRouter } from 'vue-router'

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

    // function p() {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(10);
    //     }, 1000);
    //   });};

    // store.p().then((result) => {
    //     console.log(result);
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve(result * 2);
    //         }, 2000);
    //     });
    // }).then((result) => {
    //     console.log(result);
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve(result * 3);
    //         }, 2000);
    //     });
    // }).then(result => console.log(result));

    await store.postTicket(dados)
      .then(_res => {
        router.go();
      })
      .catch(error => setErrors({ apiError: error }));
  }

</script>

<template>
  <div class="modal is-active p-6">
    <div class="modal-background"></div>
    <div
      class="modal-card"
    >
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="form-group flex flex-col mb-2">
          <label>Assunto</label>
          <Field name="assunto" type="text" class="form-control" :class="{ 'border-2 border-rose-500': errors.assunto }" />
          <div class="text-red-500">{{ errors.assunto }}</div>
        </div>

        <div class="form-group flex flex-col mb-2">
          <label>Descrição</label>
          <Field name="descricao" type="text" class="form-control" :class="{ 'border-2 border-rose-500': errors.descricao }" />
          <div class="text-red-500">{{ errors.descricao }}</div>
        </div>

        <Button :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Enviar
        </Button>

        <div v-if="errors.apiError" class="text-red-700 mt-3 mb-0">{{ errors.apiError }}</div>
      </Form>
    </div>
  </div>
</template>