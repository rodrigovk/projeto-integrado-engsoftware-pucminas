import { defineStore } from 'pinia';
//?import { fetchWrapper } from '@/helpers';
import { requestWrapper } from '@/helpers';
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
    init() {
      this.getTickets();
    },
    async getTickets() {
      this.ticketsLoaded = false;

      const authStore = useAuthStore();

      const url = baseUrl + (authStore.user.isAdministrador ? '/tickets' : `/clientes/${authStore.user.idCliente}/tickets`); //`${baseUrl}/tickets`
      requestWrapper.get(url).then((dados) => { 
        this.tickets = dados;
        this.ticketsLoaded = true;
      }).catch(err => {
        console.log('error.message: ', err);
      });
    },
    clearTickets() {
      this.tickets = [];
    },
    async getTicket(idTicket) {
      return requestWrapper.get(`${baseUrl}/tickets/${idTicket}`).then((dados) => {
        return dados;
      }).catch(err => {
        console.log('error.message: ', err);
      });
    },
    async postTicket(dados) {
      await requestWrapper.post(`${baseUrl}/tickets`, dados)
        .catch((err) => {
          console.log('error.message: ', err);
        });
    },
    async putTicketSituacao(idTicket, situacao) {
      await requestWrapper.put(`${baseUrl}/tickets/${idTicket}/situacao`, { situacao })
        .catch((err) => {
          console.log('error.message: ', err);
        });
    },
    async postResposta(dados) {
      await requestWrapper.post(`${baseUrl}/tickets/${dados.idTicket}/respostas`, dados)
        .catch((err) => {
          console.log('error.message: ', err);
        });
    },
  },
  getters: {
    getTicketContent: (state) => {
      return (id) => {
        return state.tickets.filter(ticket => ticket.id === id )[0].content;
      }
    },
    totalTicketsCount: (state) => {
      return state.tickets.length
    },
    // totalCharactersCount: (state) => {
    //   let count = 0
    //   state.tickets.forEach(note => {
    //     count += note.content.length
    //   })
    //   return count
    // }
  }
})