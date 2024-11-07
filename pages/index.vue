<template>
  <div class="page-container">
    <SectionHeader />
    <SectionMemeVote :memeProcess="dataStore.memeProcess" />
    <SectionMemeraising :memeMinted="dataStore.memeMinted" />
  </div>
</template>

<script setup>
import { useDataStore } from "../stores/data/store.js";
const dataStore = useDataStore();
</script>

<style lang="scss" scoped>
.page-container {
  margin-bottom: 10px;
}
</style>
