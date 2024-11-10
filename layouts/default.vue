<template>
  <NavigateBar />
  <div>
    <slot />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDataStore } from "../stores/data/store.js";
import {
  getVotingProposals,
  getInvestingProposals,
  getMentedMemes,
} from "~/services/meme";

const dataStore = useDataStore();
onMounted(async () => {
  try {
    await dataStore.getUserContract();
    dataStore.memeVotes = await getVotingProposals();
    dataStore.memeIMO = await getInvestingProposals();
    dataStore.memeMint = await getMentedMemes();

    console.log("Meme Votes :", dataStore.memeVotes);
    console.log("Meme IMO :", dataStore.memeIMO);
    console.log("Meme Mint :", dataStore.memeMint);
  } catch (error) {}
});
</script>

<style lang="scss" scoped></style>
