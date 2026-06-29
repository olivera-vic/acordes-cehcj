import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.png",
        "icon-192.png",
        "icon-512.png",
        "logo-cehcj.png",
      ],

      manifest: {
        name: "Acordes CEHCJ",
        short_name: "Acordes CEHCJ",
        description: "Letras y acordes de canciones CEHCJ",

        theme_color: "#0c055c",
        background_color: "#ffffff",

        display: "standalone",
        orientation: "portrait",
        start_url: "/",

        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: [
          "**/*.{js,css,html,png,svg,ico,json}"
        ],

        navigateFallback: "index.html",

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*supabase\.co\/.*/,

            handler: "NetworkFirst",

            options: {
              cacheName: "supabase-cache",

              networkTimeoutSeconds: 3,

              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
    }),
  ],
});