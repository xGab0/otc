// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue()],
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
});
