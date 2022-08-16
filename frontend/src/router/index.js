import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import HomeView from '@/views/HomeView.vue';
import AuthView from '@/views/AuthView.vue';
import TicketsView from '@/views/TicketsView.vue';
import ClientesView from '@/views/ClientesView.vue';
import AdministradoresView from '@/views/AdministradoresView.vue';
import AssinaturasView from '@/views/AssinaturasView.vue';
import TicketView from '@/views/TicketView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/assinaturas',
    name: 'assinaturas',
    component: AssinaturasView
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: ClientesView
  },
  {
    path: '/administradores',
    name: 'administradores',
    component: AdministradoresView
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: TicketsView
  },
  {
    path: '/ticket/:id',
    name: 'ticket',
    component: TicketView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// navigation guards
router.beforeEach(async (to, from) => {
  const storeAuth = useAuthStore();
  if (!storeAuth.user.email && to.name !== 'auth') {
    return { name: 'auth' }
  }
  if (storeAuth.user.email && to.name === 'auth') {
    return false
  }
})

export default router;