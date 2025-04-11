import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.ts', 'tests/utils/**/*.test.ts'],
    setupFiles: ['./tests/utils/setup.ts'],
  },
});
