<template>
  <HomeHeader class="mt-16" />
  <div class="sm:p-4 md:p-8 2xl:p-28 space-y-8 md:space-y-12 xl:space-y-28">
    <HomeMemeVote :memeProcess="dataStore.memeVotes" />
    <HomeIMO :memeProcess="dataStore.memeIMO" />
    <HomeMemeraising :memeMinted="dataStore.memeMint" />
  </div>
</template>

<script setup>
import { useDataStore } from "../stores/data/store";
const dataStore = useDataStore();
</script>

<style lang="scss" scoped></style>
