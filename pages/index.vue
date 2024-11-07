<template>
  <div class="page-container">
    <SectionHeader />
    <SectionMemeVote />
    <SectionMemeraising />
  </div>
</template>

<script setup>
import {
  fetchConnectWallet,
  fetchGetTransaction,
  fetchSendTransaction,
} from "../services/meme.js";

function handleClickConnectWallet() {
  fetchConnectWallet();
}

function handleClickCreate(memeData) {
  // Logic to create meme goes here
  console.log("Creating meme...", memeData);
  fetchSendTransaction(memeData);
}

function handleClickData() {
  // Logic to fetch data goes here
  const status = "VOTING";

  fetchGetTransaction(status);
}
</script>

<style lang="scss" scoped>
.page-container {
  margin-bottom: 10px;
}
</style>
