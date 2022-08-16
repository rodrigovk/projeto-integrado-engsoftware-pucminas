import { defineStore } from 'pinia';
// import { fetchWrapper } from '@/helpers'; //?
import { requestWrapper } from '@/helpers';
// import axios from 'axios'; //?

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
      // console.log(axios.post(`${baseUrl}/auth`, { email, senha }));
      // console.log(await axios.post(`${baseUrl}/auth`, { email, senha }));
      // return;
      const dados = await requestWrapper.post(`${baseUrl}/auth`, { email, senha });
      // const dados = await fetchWrapper.post(`${baseUrl}/auth`, { email, senha });
      this.user = {
        idUsuario: dados.idUsuario,
        idAdministrador: dados.idAdministrador,
        idCliente: dados.idCliente,
        email,
        senha,
        nome: dados.nome,
        isAdministrador: dados.isAdministrador
      };
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