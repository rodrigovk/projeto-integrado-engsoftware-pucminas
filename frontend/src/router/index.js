import { createRouter, createWebHashHistory, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthView.vue')
  },
  {
    path: '/assinaturas',
    name: 'assinaturas',
    component: () => import('@/views/AssinaturasView.vue')
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: () => import('@/views/ClientesView.vue')
  },
  {
    path: '/administradores',
    name: 'administradores',
    component: () => import('@/views/AdministradoresView.vue')
  },
  // para que a propriedade isActive do RouterLink/router-link funcione corretamente, preciso declarar as rotas desta forma (children de uma routa "vazia")
  {
    path: '/tickets',
    component: { render: () => h(RouterView) },
    children: [
      { 
        path: '',
        name: 'tickets',
        component: () => import('@/views/TicketsView.vue') 
      },
      { 
        path: '/:id',
        name: 'ticket',
        component: () => import('@/views/TicketView.vue')
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