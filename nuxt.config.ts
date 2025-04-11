// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $development: {
    vite: {
      server: {
        allowedHosts: true,
      },
    },
  },

  srcDir: 'app/',

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxt/test-utils/module',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',

  primevue: {
    autoImport: true,
    options: {
      inputVariant: 'filled',
      theme: {
        preset: 'vela-light',
      },
    },
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        jsx: false,
        semi: true,
      },
    },
  },

  css: ['@/assets/scss/app.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/scss/helpers" as *;
          @use "sass:map";
          `,
        },
      },
    },
  },
});
