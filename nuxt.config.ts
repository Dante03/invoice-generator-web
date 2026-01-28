
import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api'
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: [resolve(__dirname, 'assets/css/main.css')],
  nitro: {
    preset: 'vercel'
  }
})