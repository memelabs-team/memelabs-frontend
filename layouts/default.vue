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
  getVotingByUser,
  getInvestingByUser,
  getMyProposals,
} from "~/services/meme";

const dataStore = useDataStore();
onMounted(async () => {
  try {
    await dataStore.getUserContract();
    dataStore.memeVotes = await getVotingProposals(0, 100);
    dataStore.memeIMO = await getInvestingProposals(0, 100);
    dataStore.memeMint = await getMentedMemes(0, 100);
    dataStore.memeByUser = await getMyProposals(
      0,
      100,
      dataStore.walletAddress
    );

    // dataStore.memeByUser = [
    //   ...(await getVotingByUser(0, 100, dataStore.walletAddress)),
    //   ...(await getInvestingByUser(0, 100, dataStore.walletAddress)),
    //   ...(await getMentedMemes(0, 100)
    //   ),
    // ];
    console.log("Meme Votes :", dataStore.memeVotes);
    console.log("Meme IMO :", dataStore.memeIMO);
    console.log("Meme Mint :", dataStore.memeMint);
    console.log("Meme By User :", dataStore.memeByUser);
  } catch (error) {}
});
</script>

<style lang="scss" scoped></style>
