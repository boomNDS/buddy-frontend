import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  image: {
    inject: true,
    format: ["avif", "webp"],
    dir: "assets/images",
  },
  app: {
    head: {
      title: "Pet Care App",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
    },
  },
  modules: [
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/image",
    "@vueuse/nuxt",
    "shadcn-nuxt",
    "dayjs-nuxt",
  ],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  icon: {
    mode: "css",
    cssLayer: "base",
    serverBundle: {
      collections: ["mdi", "basil", "fluent", "heroicons"],
    },
  },
  // https://nuxt.com/modules/dayjs
});
