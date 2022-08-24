import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router';
import './tailwind.css';
import VueNumberFormat from 'vue-number-format';

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(VueNumberFormat, {prefix: 'R$ ', decimal: ',', thousand: '.'})
  .mount('#app');