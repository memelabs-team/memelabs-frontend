<template>
  <div
    v-if="timeLeft > 0"
    class="meme-vote-card p-4 bg-white rounded-lg shadow-md relative flex gap-4 cursor-pointer"
    @click="voteNow(memeDetail)"
  >
    <!-- Mascot Image and Content -->
    <div
      class="flex-shrink-0 rounded-[68px] w-full h-full max-w-32 max-h-32 overflow-hidden flex items-center justify-center bg-gray-100 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
    >
      <img
        :src="memeDetail.logo || 'https://via.placeholder.com/160'"
        alt="Mascot"
        class="object-cover w-full h-full"
        @error="
          (event) => (event.target.src = 'https://via.placeholder.com/160')
        "
      />

      <button
        class="absolute bottom-0 h-7 bg-black text-white text-xs font-semibold rounded-full px-4 py-1 -translate-y-2/4 transform"
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
        <span class="text-gray-800 font-semibold">
          {{ memeDetail.voteYes || 0 }}/100 Vote
        </span>
        <span class="text-gray-800 font-semibold">
          {{ countdown }}
        </span>
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
import { computed, defineProps, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { formatTime } from "@/utils/timeUtils"; // Import the utility function

const props = defineProps({
  memeDetail: { type: Object, required: true },
});

const router = useRouter();

// Calculate percentage progress
const progressPercentage = computed(
  () => ((props.memeDetail.voteYes || 0) / 100) * 100
);

// Countdown until voting starts
const countdown = ref("");
const timeLeft = ref(0);

const updateCountdown = () => {
  const startInvestmentAt = new Date(
    props.memeDetail.startInvestmentAt
  ).getTime();

  timeLeft.value = startInvestmentAt - Date.now();
  countdown.value =
    timeLeft.value > 0 ? formatTime(timeLeft.value) : "Voting started!";
};

onMounted(() => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

const voteNow = (memeDetail) => {
  router.push({
    path: `/detail/vote-detail[${memeDetail.id}]`,
    query: { memeDetail: JSON.stringify(memeDetail) },
  });
};
</script>

<style scoped>
.meme-vote-card {
  border-radius: 10px;
  border: 1px solid #dfdfdf;
  background: #fff;
}
</style>
