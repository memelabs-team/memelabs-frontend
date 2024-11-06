<template>
  <div class="container">
    <h1>Create Meme</h1>
    <Button label="Connect Wallet" @click="handleClickConnectWallet" />
  </div>
  <div>
    <FormCreate @create="handleClickCreate" @getData="handleClickData" />
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
