import { defineStore } from 'pinia';
import { requestData } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

function corrigirValorAssinatura(assinatura) {
  assinatura.valor = parseFloat(assinatura.valor);
}

export const useAssinaturasStore = defineStore('assinaturasStore', {
  state: () => {
    return {
      assinaturas: [],
      assinaturasLoaded: false,
    }
  },
  actions: {
    init() {
      this.getAssinaturas();
    },

    async getAssinaturas() {
      this.assinaturasLoaded = false;

      const url = baseUrl + '/assinaturas';

      requestData.get(url, null, { includeCliente: true })
        .then(res => {
          this.assinaturas = res.data.map(assinatura => {
            corrigirValorAssinatura(assinatura);
            return assinatura;
          });
          this.assinaturasLoaded = true;
        })
        .catch(err => {
          throw err;
        });
    },

    clearAssinaturas() {
      this.assinaturas = [];
    },

    async getAssinatura(idAssinatura) {
      return requestData.get(`${baseUrl}/assinaturas/${idAssinatura}`)
        .then(res => {
          corrigirValorAssinatura(res.data);
          return res;
        })
        .catch(err => {
          throw err;
        });
    },

    async postAssinatura(idCliente, descricao, valor, dataVencimento, dataProximoVencimento) {
      const data = {
        idCliente, descricao, valor, dataVencimento, dataProximoVencimento
      }

      return requestData.post(`${baseUrl}/assinaturas`, data)
        .catch(err => {
          throw err;
        });
    },

    async putAssinatura(idAssinatura, descricao, valor, dataVencimento, dataProximoVencimento) {
      const data = {
        descricao, valor, dataVencimento, dataProximoVencimento
      }

      return requestData.put(`${baseUrl}/assinaturas/${idAssinatura}`, data)
        .catch(err => {
          throw err;
        });
    },

    async deleteAssinatura(idAssinatura) {
      return requestData.delete(`${baseUrl}/assinaturas/${idAssinatura}`)
        .catch(err => {
          throw err;
        });
    },

    async putAssinaturaSituacao(idAssinatura, situacao) {
      return requestData.put(`${baseUrl}/assinaturas/${idAssinatura}/situacao`, { situacao })
        .catch(err => {
          throw err;
        });
    },
  },
  getters: {}
})