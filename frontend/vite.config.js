import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterExports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: '/projeto-integrado-engsoftware-pucminas-frontend-dist/',
  plugins: [
    vue(),
    VueRouter(),
    Components({ resolvers: [HeadlessUiResolver()] }),
    AutoImport({
      include: [/\.vue$/, /\.js$/],
      imports: ['vue', { 'vue-router/auto': VueRouterExports }],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // open: true,
  },
  build: {
    outDir: 'D:/Dev/projeto-integrado-engsoftware-pucminas-frontend-dist',
    emptyOutDir: true,
  }
})
