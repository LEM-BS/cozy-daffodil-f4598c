import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: 'src/main.js',
      output: {
        assetFileNames: 'tailwind[extname]',
        entryFileNames: 'assets/[name].js',
      },
    },
  },
});
