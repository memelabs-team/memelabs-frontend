<template>
  <div class="page-container">
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
.page-container {
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.page-header {
  font-size: 48px;
  text-align: center;
  font-weight: 600;
  margin: 36px;
}
</style>
