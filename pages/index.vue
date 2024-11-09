<template>
  <SectionHeader class="mt-16" />
  <div class="sm:p-4 md:p-8 xl:p-28 space-y-8 md:space-y-12 xl:space-y-28">
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
