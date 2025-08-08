import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ESM-only library build
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'sb-hooks',
      fileName: 'index',
      formats: ['es'], 
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});
