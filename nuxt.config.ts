// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  experimental: {
    appManifest: false,
  },

  modules: ["@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      // URL của Backend Django REST API
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/api/v1",
      mediaBase: process.env.NUXT_PUBLIC_MEDIA_BASE || "http://127.0.0.1:8000",
    },
  },

  app: {
    head: {
      title: "TechBuilding - Tư vấn & Xây dựng Công nghệ cao",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Doanh nghiệp tư vấn xây dựng tiên phong ứng dụng công nghệ cao và hệ sinh thái BIM.",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },

  vite: {
    optimizeDeps: {
      exclude: ["pdfjs-dist"],
    },
    build: {
      rollupOptions: {
        external: ["canvas"],
      },
    },
  },
});
