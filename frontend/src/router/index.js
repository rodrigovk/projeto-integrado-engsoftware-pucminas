import { createRouter, createWebHistory, createWebHashHistory, RouterView } from 'vue-router';
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
  // para que a propriedade isActive do RouterLink/router-link funcione corretamente, preciso declarar as rotas desta forma (children de uma routa "vazia")
  {
    path: '/tickets',
    component: { render: () => h(RouterView) },
    children: [
      { 
        path: '',
        name: 'tickets',
        component: () => import('@/views/TicketsView.vue') //TicketsView,
      },
      { 
        path: '/:id',
        name: 'ticket',
        component: () => import('@/views/TicketView.vue') //TicketView
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(), //createWebHistory(), 
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