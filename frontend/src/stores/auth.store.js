import { defineStore } from 'pinia';
import { requestData } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || {},
    returnUrl: null //?
  }),
  actions: {
    init() {

    },
    async login(email, senha) {
      await requestData.post(`${baseUrl}/auth`, { email, senha })
        .then(res => {
          const dados = res.data;
          this.user = {
            idUsuario: dados.idUsuario,
            idAdministrador: dados.idAdministrador,
            idCliente: dados.idCliente,
            email,
            senha,
            nome: dados.nome,
            isAdministrador: dados.isAdministrador
          };
        });

      localStorage.setItem('user', JSON.stringify(this.user));

      this.router.push(this.returnUrl || '/');
    },
    logout() {
      this.user = {};
      localStorage.removeItem('user');

      this.router.push('/auth');
    }
  }
});