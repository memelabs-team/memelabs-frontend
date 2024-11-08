<template>
  <div>
    <div class="header-box">
      <div class="header-title">Meme Raising</div>
      <div class="search-box">
        <SearchBar />
      </div>
    </div>
    <Divider />
    <div class="meme-container">
      <MemeListedCard
        v-for="(meme, index) in memeMinted"
        :key="index"
        :title="meme.name"
        :description="meme.memeStory"
        :mascotImage="meme.logo"
        :percentage="10"
        :marketCap="10000"
        :daysLeft="calculateDaysLeft(meme.startVotingAt)"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  memeMinted: {
    type: Array,
    required: true,
  },
});

// Function to calculate days left based on startVotingAt date
function calculateDaysLeft(startVotingAt) {
  const now = new Date();
  const endDate = new Date(startVotingAt);
  const timeDiff = endDate - now;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}
</script>

<style lang="scss" scoped>
.header-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header-title {
  font-weight: bold;
  font-size: 30px;
}

.meme-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 36px;
}
</style>
