/// <reference types="vitest" />
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      ...checker({
        vueTsc: true,
        eslint: {
          lintCommand: 'eslint frontend --ext .vue,.ts,.js',
        },
      }),
      apply: 'build',
    },
  ],
  build: {
    lib: {
      // what to build
      name: 'OsisHistory',
      entry: 'frontend/main.ts',
      formats: ['umd'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into library
      external: ['vue', 'vue-i18n'],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: 'Vue',
          'vue-i18n': 'VueI18n',
        },
        assetFileNames: "osis-history.[ext]",
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['frontend/test.setup.ts'],
    coverage: {
      provider: 'istanbul',
      all: true,
      enabled: true,
      perFile: true,
      branches: 100,
      statements: 100,
      include: ['frontend'],
      exclude: [
        "frontend/node_modules/",
        "frontend/.storybook",
        "frontend/**/*.stories.{ts,js}",
      ],
    },
  },
});
