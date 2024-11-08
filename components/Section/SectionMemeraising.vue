<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:justify-between p-4 gap-4">
      <div class="flex items-center justify-between lg:justify-start gap-4">
        <div class="text-2xl lg:text-4xl font-bold">Meme Raising</div>

        <Button
          label="View All"
          severity="secondary"
          @click="navigateTo(`/meme-listed`)"
        />
      </div>

      <SearchBar />
    </div>

    <Divider class="my-4" />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-4">
      <MemeListedCard
        v-for="(meme, index) in memeMinted"
        :key="index"
        :memeDetail="meme"
        :daysLeft="calculateCountdown(meme.startVestingAt)"
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
function calculateCountdown(startVotingAt) {
  const now = new Date();
  const endDate = new Date(startVotingAt);
  const timeDiff = endDate - now;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}
</script>
