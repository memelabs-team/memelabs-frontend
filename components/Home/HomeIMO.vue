<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:justify-between p-4 gap-4">
      <div class="flex items-center justify-between lg:justify-start gap-4">
        <div class="text-2xl lg:text-4xl font-bold">Initial Meme Offering</div>
        <Button
          label="View All"
          severity="secondary"
          @click="navigateTo(`/initial-meme-offering`)"
        />
      </div>

      <SearchBar />
    </div>

    <Divider class="my-4" />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-4">
      <CardIMOCard
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
