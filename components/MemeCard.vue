<template>
  <div
    class="meme-vote-card p-4 bg-white rounded-lg shadow-md relative flex gap-4"
  >
    <!-- Binance Logo in Top Right Corner -->
    <div class="absolute top-4 right-4">
      <img src="/images/icon_binance.svg" alt="Binance Logo" class="w-8 h-8" />
    </div>

    <!-- Mascot Image and Content -->
    <div
      class="flex-shrink-0 w-24 sm:w-36 h-24 sm:h-36 bg-yellow-200 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
    >
      <img :src="mascotImage" alt="Mascot" class="w-full h-auto object-cover" />
      <button
        :class="percentageClass"
        class="absolute bottom-4 text-white text-xs font-semibold rounded-full px-4 py-1 -translate-y-2/4 transform"
      >
        {{ displayPercentage }}%
      </button>
    </div>

    <!-- Card Text Content -->
    <div class="flex-1">
      <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
      <p class="text-gray-600 text-sm mt-2 line-clamp-2">{{ description }}</p>

      <!-- Market Cap Info -->
      <div class="flex justify-between text-sm font-medium text-gray-700 mt-4">
        <span class="text-gray-800 font-semibold"
          >Market Cap ${{ formattedMarketCap }}</span
        >
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
  percentage: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  daysLeft: { type: Number, required: true },
});

const displayPercentage = computed(() => {
  if (props.percentage > 0) {
    return `+${props.percentage}`;
  } else if (props.percentage < 0) {
    return `${props.percentage}`;
  } else {
    return `${props.percentage}`;
  }
});

const percentageClass = computed(() => {
  return props.percentage > 0 ? "bg-green-500" : "bg-red-500";
});

const formattedMarketCap = computed(() => {
  return props.marketCap >= 1000
    ? `${(props.marketCap / 1000).toFixed(1)}k`
    : props.marketCap;
});
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
  line-clamp: 2; /* Standard property for compatibility */
}
</style>
