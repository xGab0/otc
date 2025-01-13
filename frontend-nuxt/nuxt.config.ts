// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt'
  ],
  vite: {
    server: {
      proxy: {
        '/odoo': {
          target: 'http://localhost:8070/jsonrpc',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/odoo/, ''),
        },
      }
    }
  }
})
