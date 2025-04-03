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

  css: ['@/assets/scss/app.scss'],

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',

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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use '@/assets/scss/helpers' as *;
          @use 'sass:math';
          @use 'sass:map';
          @use "sass:list";
          @use "sass:color";
          `,
          quietDeps: true,
          api: 'modern',
        },
      },
    },
  },
});
