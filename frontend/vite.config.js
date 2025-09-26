import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://hulutena.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

// local server = http://localhost:3000
// deployed server = https://hulutena.onrender.com