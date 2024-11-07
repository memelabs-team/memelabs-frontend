<template>
  <NavigateBar />
  <div>
    <slot />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDataStore } from "../stores/data/store.js";
const dataStore = useDataStore();
// Automatically run fetchConnectWallet when App.vue is mounted
onMounted(async () => {
  try {
    await dataStore.getUserContract();
    console.log("Wallet connected on initial load");
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
});
</script>

<style lang="scss" scoped></style>
