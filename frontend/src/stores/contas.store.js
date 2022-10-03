import { defineStore } from 'pinia';
import { requestData } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

function corrigirValorConta(conta) {
  conta.valor = parseFloat(conta.valor);
}

export const useContasStore = defineStore('contasStore', {
  state: () => {
    return {
      contas: [],
      contasLoaded: false,
    }
  },
  actions: {
    init() {
      this.getContas();
    },

    async getContas(idCliente, situacao) {
      this.contasLoaded = false;

      const url = baseUrl + '/contas';

      requestData.get(url, null, { idCliente, situacao, includeCliente: true })
        .then(res => {
          this.contas = res.data.map(conta => {
            corrigirValorConta(conta);
            return conta;
          });
          this.contasLoaded = true;
        })
        .catch(err => {
          throw err;
        });
    },

    clearContas() {
      this.contas = [];
    },

    async getConta(idConta) {
      return requestData.get(`${baseUrl}/contas/${idConta}`)
        .then(res => {
          corrigirValorConta(res.data);
          return res;
        })
        .catch(err => {
          throw err;
        });
    },

    async postConta(idCliente, descricao, valor, dataVencimento, dataProximoVencimento) {
      const data = {
        idCliente, descricao, valor, dataVencimento, dataProximoVencimento
      }

      return requestData.post(`${baseUrl}/contas`, data)
        .catch(err => {
          throw err;
        });
    },
    
    async encloseConta(idConta) {
      return requestData.put(`${baseUrl}/contas/${idConta}/pagar`)
        .catch(err => {
          throw err;
        });
    },

    // async putConta(idConta, descricao, valor, dataVencimento, dataProximoVencimento) {
    //   const data = {
    //     descricao, valor, dataVencimento, dataProximoVencimento
    //   }

    //   return requestData.put(`${baseUrl}/contas/${idConta}`, data)
    //     .catch(err => {
    //       throw err;
    //     });
    // },

    // async deleteConta(idConta) {
    //   return requestData.delete(`${baseUrl}/contas/${idConta}`)
    //     .catch(err => {
    //       throw err;
    //     });
    // },

    // async putContaSituacao(idConta, situacao) {
    //   return requestData.put(`${baseUrl}/contas/${idConta}/situacao`, { situacao })
    //     .catch(err => {
    //       throw err;
    //     });
    // },
  },
  getters: {}
})