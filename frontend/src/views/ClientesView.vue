<script setup>
  import { onMounted } from 'vue';
  import { useClientesStore } from '@/stores';
  import SpinLoading from '@/components/layout/SpinLoading.vue';
  import Cliente from '@/components/Cliente/Cliente.vue';
  
  const clientesStore = useClientesStore();
  
  onMounted(() => {
    clientesStore.init();
  })
  
  function removerCliente(idCliente) {
    const index = clientesStore.clientes.findIndex(cliente => {
      return (cliente.idCliente === idCliente);
    });
    clientesStore.clientes.splice(index, 1);
  }
  </script>
  
  <template>
    <div class="h-full">
      <div class="flex items-center text-2xl font-semibold pt-6 pl-6">
        Clientes
      </div>
      
      <div v-if="!clientesStore.clientesLoaded" class="h-full flex flex-row justify-center items-center">
        <div class="flex items-center">
          <SpinLoading :height="8" :width="8" color="text-teal-600" class="mr-3" />
          <p class="text-xl text-teal-600">
            Carregando...
          </p>
        </div>
      </div>
  
      <template v-else>
        <RouterLink :to="{ name: 'cliente_novo' }">
          <Button class="mt-2 ml-6">
            Criar cliente
          </Button>
        </RouterLink>
  
        <div class="flex flex-col justify-center p-6">
          <Cliente v-for="cliente in clientesStore.clientes"
            :key="cliente.idCliente" :cliente="cliente" @removerCliente="removerCliente" />
        </div>
  
        <div v-if="!clientesStore.clientes.length" class="text-xl px-6 py-6">
          Não há nenhum cliente.
        </div>
      </template>
    </div>
  </template>