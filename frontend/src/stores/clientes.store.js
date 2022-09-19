import { defineStore } from 'pinia';
import { requestData } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useClientesStore = defineStore('clientesStore', {
  state: () => {
    return {
      clientes: [],
      clientesLoaded: false,
    }
  },
  actions: {
    init() {
      this.getClientes();
    },

    async getClientesSimples() {
      this.clientesLoaded = false;

      const url = baseUrl + '/clientes';

      return requestData.get(url, null, { simples: true })
        // .then(res => {
        //   this.clientes = res.data;
        //   this.clientesLoaded = true;
        // })
        .catch(err => {
          throw err;
        });
    },

    async getClientes() {
      this.clientesLoaded = false;

      const url = baseUrl + '/clientes';

      requestData.get(url, null, { includeUsuario: true })
        .then(res => {
          this.clientes = res.data;
          this.clientesLoaded = true;
        })
        .catch(err => {
          throw err;
        });
    },

    clearClientes() {
      this.clientes = [];
    },

    async getCliente(idCliente) {
      return requestData.get(`${baseUrl}/clientes/${idCliente}`)
        .catch(err => {
          throw err;
        });
    },

    async postCliente(nome, tipo, cnpjCpf, email, senha) {
      const data = {
        nome,
        tipo,
        cnpjCpf,
        email,
        senha,
      }

      return requestData.post(`${baseUrl}/clientes`, data)
        .catch(err => {
          throw err;
        });
    },
    
    async putCliente(idCliente, nome, tipo, cnpjCpf, email, senha) {
      const data = {
        nome,
        tipo,
        cnpjCpf,
        email
      }

      if (senha != null && senha !== '') {
        data.senha = senha;
      }

      return requestData.put(`${baseUrl}/clientes/${idCliente}`, data)
        .catch(err => {
          throw err;
        });
    },
    
    async deleteCliente(idCliente) {
      return requestData.delete(`${baseUrl}/clientes/${idCliente}`)
        .catch(err => {
          throw err;
        });
    },

    async putClienteSituacao(idCliente, situacao) {
      return requestData.put(`${baseUrl}/clientes/${idCliente}/situacao`, { situacao })
        .catch(err => {
          throw err;
        });
    },
  },
  getters: {}
})