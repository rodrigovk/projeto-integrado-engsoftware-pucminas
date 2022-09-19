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
    component: { render: () => h(RouterView) },
    children: [
      {
        path: '',
        name: 'assinaturas',
        component: () => import('@/views/AssinaturasView.vue')
      },
      {
        path: '/assinaturas/novo',
        name: 'assinatura_novo',
        component: () => import('@/views/AssinaturasView.vue')
      },
      {
        path: '/assinaturas/:id',
        name: 'assinatura',
        component: () => import('@/views/AssinaturasView.vue')
      },
    ]
  },
  {
    path: '/clientes',
    component: { render: () => h(RouterView) },
    children: [
      {
        path: '',
        name: 'clientes',
        component: () => import('@/views/ClientesView.vue')
      },
      {
        path: '/clientes/novo',
        name: 'cliente_novo',
        component: () => import('@/views/ClienteView.vue')
      },
      {
        path: '/clientes/:id',
        name: 'cliente',
        component: () => import('@/views/ClienteView.vue')
      },
    ]
  },
  {
    path: '/administradores',
    component: { render: () => h(RouterView) },
    children: [
      {
        path: '',
        name: 'administradores',
        component: () => import('@/views/AdministradoresView.vue')
      },
      {
        path: '/administradores/novo',
        name: 'administrador_novo',
        component: () => import('@/views/AdministradorView.vue')
      },
      {
        path: '/administradores/:id',
        name: 'administrador',
        component: () => import('@/views/AdministradorView.vue')
      },
    ]
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
        path: '/tickets/:id',
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