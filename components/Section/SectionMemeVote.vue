<template>
  <div>
    <div class="header-box">
      <div class="header-title">Meme Vote</div>
      <div class="view-all-button">
        <Button
          label="View All"
          severity="secondary"
          @click="navigateTo(`/meme-vote`)"
        />
      </div>
    </div>
    <Divider />
    <div class="meme-container">
      <MemeVoteCard
        v-for="meme in filteredMemeProcess"
        :memeDetail="meme"
        :daysLeft="meme.countdown"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { defineProps } from "vue";

// Declare memeProcess as a prop
const props = defineProps({
  memeProcess: {
    type: Array,
    required: true,
  },
});

const countdowns = ref([]);

// Function to navigate when View All button is clicked
function handleClickViewAll() {
  navigateTo("/meme-vote");
}

// Function to calculate the countdown time
function calculateCountdown(startVestingAt) {
  const now = new Date();
  const endDate = new Date(startVestingAt);
  const timeDiff = endDate - now;

  if (timeDiff <= 0) return "0d: 0h: 0m: 0s";

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `${days}d: ${hours}h: ${minutes}m: ${seconds}s`;
}

// Update countdowns and filter out entries with "0d: 0h: 0m: 0s"
function updateCountdowns() {
  countdowns.value = props.memeProcess.map((meme) => ({
    ...meme,
    countdown: calculateCountdown(meme.startVestingAt),
  }));
}

// Computed property to filter out memes with "0d: 0h: 0m: 0s"
const filteredMemeProcess = computed(() =>
  countdowns.value.filter((meme) => meme.countdown !== "0d: 0h: 0m: 0s")
);

// Set up the interval to update countdowns every second
onMounted(() => {
  updateCountdowns(); // Initial call
  const interval = setInterval(updateCountdowns, 1000); // Update every second

  onUnmounted(() => {
    clearInterval(interval); // Clear the interval when the component is unmounted
  });
});
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
