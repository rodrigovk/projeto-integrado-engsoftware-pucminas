import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router';
import './tailwind.css';
import VueNumberFormat from 'vue-number-format';
import Notifications from 'notiwind';
import VueTheMask from 'vue-the-mask';

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(VueNumberFormat, { prefix: 'R$ ', precision: 2, decimal: ',', thousand: '.' })
  .use(Notifications)
  .use(VueTheMask)
  .mount('#app');