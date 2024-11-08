<template>
  <SectionHeader class="mt-16" />
  <div class="p-28 space-y-28">
    <SectionMemeVote :memeProcess="dataStore.memeProcess" />
    <SectionIMO :memeProcess="dataStore.memeProcess" />
    <SectionMemeraising :memeMinted="dataStore.memeMinted" />
  </div>
</template>

<script setup>
import { useDataStore } from "../stores/data/store.js";
const dataStore = useDataStore();
</script>

<style lang="scss" scoped></style>
