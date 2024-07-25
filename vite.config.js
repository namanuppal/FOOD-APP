import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'The Food App',
        short_name: 'Food App',
        description: 'Your App Description',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'https://static.vecteezy.com/system/resources/previews/008/687/818/non_2x/food-delivery-logo-free-vector.jpg',
            sizes: '192x192',
            type: 'image/jpg'
          },
          {
            src: 'https://static.vecteezy.com/system/resources/previews/008/687/818/non_2x/food-delivery-logo-free-vector.jpg',
            sizes: '512x512',
            type: 'image/jpg'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style' || request.destination === 'image' || request.destination === 'font',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
    })
  ]
});
