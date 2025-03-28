// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

	modules: [
		'@nuxt/content',
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/scripts',
		'@nuxt/test-utils',
		'@nuxt/ui',
	],
	devtools: { enabled: true },
	compatibilityDate: '2024-11-01',

	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
				quotes: 'single',
			},
		},
	},
});
