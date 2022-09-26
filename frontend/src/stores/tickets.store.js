import { defineStore } from 'pinia';
import { requestData } from '@/helpers';
import { useAuthStore } from '@/stores/auth.store';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useTicketsStore = defineStore('ticketsStore', {
  state: () => {
    return {
      tickets: [
        // {
        //   idTicket: 1,
        //   assunto: "Assunto do ticket 1",
        //   situacao: 0,
        //   descricao: "Teste de mensagem do ticket",
        // },
        // {
        //   idTicket: 2,
        //   assunto: "Assunto do ticket 2",
        //   situacao: 1,
        //   descricao: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem ipsa commodi sint ut ullam culpa nulla molestiae sunt quia qui maxime.",
        // },
      ],
      ticketsLoaded: false
    }
  },
  actions: {
    init(situacao, assunto) {
      this.getTickets(situacao, assunto);
    },

    async getTickets(situacao, assunto) {
      this.ticketsLoaded = false;

      const authStore = useAuthStore();
      const url = baseUrl + '/tickets';

      requestData.get(url, null, { situacao, assunto })
        .then(res => {
          this.tickets = res.data;
          this.ticketsLoaded = true;
        })
        .catch(err => {
          throw err;
        });
    },

    clearTickets() {
      this.tickets = [];
    },

    async getTicket(idTicket) {
      return requestData.get(`${baseUrl}/tickets/${idTicket}`)
        .catch(err => {
          throw err;
        });
    },

    async postTicket(data) {
      return requestData.post(`${baseUrl}/tickets`, data)
        .catch(err => {
          throw err;
        });
    },

    async putTicketSituacao(idTicket, situacao) {
      return requestData.put(`${baseUrl}/tickets/${idTicket}/situacao`, { situacao })
        .catch(err => {
          throw err;
        });
    },

    async postResposta(data) {
      return requestData.post(`${baseUrl}/tickets/${data.idTicket}/respostas`, data)
        .catch(err => {
          throw err;
        });
    },
  },
  getters: {
    getTicketContent: (state) => {
      return (id) => {
        return state.tickets.filter(ticket => ticket.id === id)[0].content;
      }
    },

    totalTicketsCount: (state) => {
      return state.tickets.length
    },
  }
})