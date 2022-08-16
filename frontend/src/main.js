import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
// import { createRouter, createWebHistory } from 'vue-router/auto'
import router from '@/router'
import './tailwind.css'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

// const router = createRouter({
//   history: createWebHistory(),
// })

const app = createApp(App)
// app.use(createPinia());
  .use(pinia)
  .use(router)

  .mount('#app');