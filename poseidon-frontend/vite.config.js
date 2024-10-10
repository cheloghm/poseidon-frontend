// vite.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Export Vite configuration
export default defineConfig({
  plugins: [vue()], // Use Vue plugin
  resolve: {
    alias: {
      '@': '/src', // Create an alias for the src directory
    },
  },
});
