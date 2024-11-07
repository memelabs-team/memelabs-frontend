<template>
  <div class="page-container">
    <h1 class="page-header">Create Meme</h1>

    <FormCreate @create="handleClickCreate" @getData="handleClickData" />
  </div>
</template>

<script setup>
import { fetchGetTransaction, fetchSendTransaction } from "../services/meme.js";

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
  margin: 40px 60px;
}

.page-header {
  font-size: 40px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 40px;
}
</style>
