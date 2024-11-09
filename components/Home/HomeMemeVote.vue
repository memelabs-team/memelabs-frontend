<template>
  <div>
    <div class="flex justify-between items-center p-4">
      <div class="text-2xl sm:text-4xl font-bold">Meme Vote</div>
      <div class="mt-4 sm:mt-0">
        <Button
          label="View All"
          severity="secondary"
          @click="navigateTo(`/meme-vote`)"
        />
      </div>
    </div>

    <Divider />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-4">
      <CardMemeVoteCard
        v-for="meme in filteredMemeProcess"
        :key="meme.id"
        :memeDetail="meme"
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

// Update countdowns and filter out entries with "0d: 0h: 0m: 0s"
function updateCountdowns() {
  countdowns.value = props.memeProcess.map((meme) => ({
    ...meme,
    countdown: calculateCountdown(meme.startInvestmentAt),
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
