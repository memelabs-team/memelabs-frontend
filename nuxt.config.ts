// https://nuxt.com/docs/api/configuration/nuxt-config
import { definePreset, palette } from "@primevue/themes";
import Lara from "@primevue/themes/aura";

const MyPreset = definePreset(Lara, {
  semantic: {
    primary: palette("#000"),
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    },
  },
  modules: ["@pinia/nuxt", "@primevue/nuxt-module", "@nuxtjs/tailwindcss"],
  primevue: {
    usePrimeVue: true,
    autoImport: true,
    options: {
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: ".app-dark",
          cssLayer: false,
        },
      },
    },
  },
  css: ["primeicons/primeicons.css"],
});
