import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      includesAssets: ['**/*'],
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /\/api\/hospitals/,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /\/api\/medicine/,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /\/api\/shelters/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'shelters-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7
              }
            }
          },
          {
            urlPattern: /\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache'
            }
          },
          {
            urlPattern: /https:\/\/.*\.basemaps\.cartocdn\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles-cache',
              expiration: {
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://webproject-nova.onrender.com',
        changeOrigin: true,
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      }
    }
  },
  preview: {
    proxy: {
      '/api': {
        target: 'https://webproject-nova.onrender.com',
        changeOrigin: true,
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      }
    }
  }
})
