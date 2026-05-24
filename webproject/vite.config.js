import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includesAssets: ['**/*'],
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
        maximumFileSizeToCaCheInBytes: 8 * 1024 * 1024,
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://jere-trispermous-festively.ngrok-free.dev',
        changeOrigin: true,
      }
    }
  }
})
