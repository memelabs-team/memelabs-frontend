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
      class="flex-shrink-0 w-24 sm:w-36 h-24 sm:h-36 rounded-[68px] overflow-hidden flex items-center justify-center bg-gray-100 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
    >
      <img
        :src="memeDetail.logo || 'https://via.placeholder.com/160'"
        alt="Mascot"
        class="w-full h-auto object-cover"
        @error="
          (event) => (event.target.src = 'https://via.placeholder.com/160')
        "
      />

      <button
        class="absolute bottom-0 h-7 bg-black text-white text-xs font-semibold rounded-full px-4 py-1 -translate-y-2/4 transform"
        @click="voteNow(memeDetail, daysLeft)"
      >
        Vote Now
      </button>
    </div>

    <!-- Card Text Content -->
    <div class="flex-1">
      <h3 class="text-xl font-semibold text-gray-800">
        {{ memeDetail.name }}
      </h3>
      <p class="text-gray-600 text-sm mt-2 line-clamp-2">
        {{ memeDetail.memeStory }}
      </p>

      <!-- Voting Info -->
      <div
        class="voting-info flex justify-between text-sm font-medium text-gray-700 mt-4"
      >
        <span class="text-gray-800 font-semibold"
          >{{ memeDetail.voteYes }}/100 Vote</span
        >
        <span class="text-gray-800 font-semibold">{{ daysLeft }}</span>
      </div>

      <!-- Progress Bar -->
      <div class="progress-bar w-full h-2 bg-gray-200 rounded-full mt-2">
        <div
          class="progress h-full bg-blue-500 rounded-full"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  memeDetail: { type: Object, required: true },
  daysLeft: { type: String, required: true },
});

const router = useRouter();

const progressPercentage = computed(
  () => (props.memeDetail.voteYes / 100) * 100
);

const voteNow = (memeDetail, daysLeft) => {
  router.push({
    path: `/vote-detail/vote[${memeDetail.id}]`,
    query: { memeDetail: JSON.stringify({ ...memeDetail, daysLeft }) },
  });
};
</script>
<style scoped>
.meme-vote-card {
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* Limits the text to 2 lines */
  line-clamp: 2; /* Standard property for compatibility */
}
</style>
