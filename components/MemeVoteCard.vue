<template>
  <div
    class="meme-vote-card p-4 bg-white rounded-lg shadow-md relative flex max-w-lg mx-auto gap-4"
  >
    <!-- Binance Logo in Top Right Corner -->
    <div class="absolute top-4 right-4">
      <img src="@/assets/icon_binance.svg" alt="Binance Logo" class="w-8 h-8" />
    </div>

    <!-- Mascot Image and Content -->
    <div
      class="flex-shrink-0 w-24 sm:w-36 h-24 sm:h-36 bg-yellow-200 rounded-full overflow-hidden flex items-center justify-center"
    >
      <img :src="mascotImage" alt="Mascot" class="w-full h-auto object-cover" />
      <button
        class="absolute bottom-0 h-7 bg-black text-white text-xs font-semibold rounded-full px-4 py-1 -translate-y-2/4 transform"
        @click="voteNow"
      >
        Vote Now
      </button>
    </div>

    <!-- Card Text Content -->
    <div class="flex-1">
      <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
      <p class="text-gray-600 text-sm mt-2 line-clamp-2">{{ description }}</p>

      <!-- Voting Info -->
      <div
        class="voting-info flex justify-between text-sm font-medium text-gray-700 mt-4"
      >
        <span class="text-gray-800 font-semibold">{{ votes }}/100 Vote</span>
        <span class="text-gray-800 font-semibold"
          >{{ daysLeft }} Days Left</span
        >
      </div>

      <!-- Progress Bar -->
      <div class="progress-bar w-full h-2 bg-gray-200 rounded-full mt-2">
        <div
          class="progress h-full bg-green-500 rounded-full"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mascotImage: { type: String, required: true },
  votes: { type: Number, required: true },
  daysLeft: { type: Number, required: true },
});

const progressPercentage = computed(() => (props.votes / 100) * 100);

const voteNow = () => {
  alert(`You voted for ${props.title}!`);
};
</script>

<style scoped>
.meme-vote-card {
  border-radius: 10px;
  border: 1px solid #dfdfdf;
  background: #fff;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* Limits the text to 2 lines */
}
</style>
