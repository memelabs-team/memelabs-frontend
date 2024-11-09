<template>
  <div class="page-container">
    <h1 class="page-header">Create Meme</h1>

    <FormCreate @create="handleClickCreate" @getData="handleClickData" />
  </div>
</template>

<script setup>
import { useDataStore } from "~/stores/data/store.js";
import { fetchGetTransaction } from "../services/meme.js";

const dataStore = useDataStore();

async function handleClickCreate(memeData) {
  const response = await dataStore.createMeme(memeData);
  console.log("Created meme:", response);
}

function handleClickData() {
  // Logic to fetch data goes here
  const status = "MINTED";

  fetchGetTransaction(status);
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page-header {
  font-size: 40px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .page-container {
    padding: 20px 0;
  }
}
</style>
