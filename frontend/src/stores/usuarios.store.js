import { defineStore } from 'pinia';
import { requestData } from '@/helpers';
import { useAuthStore } from '@/stores/auth.store';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useUsuariosStore = defineStore('usuariosStore', {
  state: () => {
    return {
    }
  },
  actions: {
    async getDashInfo() {
      const authStore = useAuthStore();

      return requestData.get(`${baseUrl}/usuarios/${authStore.user.idUsuario}/dash-info`)
        .catch(err => {
          console.log('error.message: ', err);
        });
    },
  },
  getters: {
    
  }
})