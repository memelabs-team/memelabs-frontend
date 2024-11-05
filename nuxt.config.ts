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
  modules: ["@primevue/nuxt-module"],
  primevue: {
    usePrimeVue: true,
    autoImport: true,
    options: {
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
