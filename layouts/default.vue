<template>
  <NavigateBar />
  <div>
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
    dataStore.memeProcess = await fetchGetMemeProposal("IN-PROCESS");
    dataStore.memeMinted = await fetchGetMemeProposal("MINTED");

    console.log("Meme Process :", dataStore.memeProcess);
    console.log("Meme Minted :", dataStore.memeMinted);
  } catch (error) {}
});
</script>

<style lang="scss" scoped></style>
