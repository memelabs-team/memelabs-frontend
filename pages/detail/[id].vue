<template>
  <div class="container">
    <div class="page-header">Vote Detail</div>
    <VoteDetail @create="handleClickCreate" @getData="handleClickData" />
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
.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
}

.page-header {
  font-size: 48px;
  text-align: center;
  font-weight: 600;
  margin: 36px;
}
</style>
