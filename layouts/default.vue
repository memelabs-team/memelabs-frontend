<template>
  <NavigateBar />
  <div class="page-layout">
    <slot />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDataStore } from "../stores/data/store.js";
import { fetchGetMemeProposal } from "~/services/meme";

const dataStore = useDataStore();
onMounted(async () => {
  try {
    await dataStore.getUserContract();
    await fetchGetMemeProposal("IN-PROCESS");
  } catch (error) {}
});
</script>

<style lang="scss" scoped>
.page-layout {
  height: 100vh;
}
</style>
