import { defineStore } from 'pinia';
import { requestData } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAdministradoresStore = defineStore('administradoresStore', {
  state: () => {
    return {
      administradores: [],
      administradoresLoaded: false,
    }
  },
  actions: {
    init() {
      this.getAdministradores();
    },

    async getAdministradores() {
      this.administradoresLoaded = false;

      const url = baseUrl + '/administradores';

      requestData.get(url, null, { includeUsuario: true })
        .then(res => {
          this.administradores = res.data;
          this.administradoresLoaded = true;
        })
        .catch(err => {
          throw err;
        });
    },

    clearAdministradores() {
      this.administradores = [];
    },

    async getAdministrador(idAdministrador) {
      return requestData.get(`${baseUrl}/administradores/${idAdministrador}`)
        .catch(err => {
          throw err;
        });
    },

    async postAdministrador(nome, email, senha) {
      const data = {
        nome,
        email,
        senha
      }

      return requestData.post(`${baseUrl}/administradores`, data)
        .catch(err => {
          throw err;
        });
    },
    
    async putAdministrador(idAdministrador, nome, email, senha) {
      const data = {
        nome,
        email
      }

      if (senha != null && senha !== '') {
        data.senha = senha;
      }

      return requestData.put(`${baseUrl}/administradores/${idAdministrador}`, data)
        .catch(err => {
          throw err;
        });
    },
    
    async deleteAdministrador(idAdministrador) {
      return requestData.delete(`${baseUrl}/administradores/${idAdministrador}`)
        .catch(err => {
          throw err;
        });
    },

    async putAdministradorSituacao(idAdministrador, situacao) {
      return requestData.put(`${baseUrl}/administradores/${idAdministrador}/situacao`, { situacao })
        .catch(err => {
          throw err;
        });
    },
  },
  getters: {}
})