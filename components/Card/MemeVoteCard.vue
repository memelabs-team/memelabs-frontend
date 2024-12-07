<template>
  <div
    v-if="timeLeft > 0"
    class="border p-4 bg-white rounded-lg shadow-md items-center relative flex gap-4 cursor-pointer"
    @click="voteNow(memeDetail)"
  >
    <!-- Mascot Image and Content -->
    <div
      class="flex-shrink-0 w-24 sm:w-36 h-24 sm:h-36 rounded-full overflow-hidden flex items-center justify-center bg-black shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
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
        class="absolute text-white text-xs font-semibold h-7 bg-black rounded-full px-4 py-1 -translate-y-2/4 transform bottom-0"
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
import { computed, defineProps, defineEmits, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { formatTime } from "@/utils/timeUtils";

const props = defineProps({
  memeDetail: { type: Object, required: true },
});

const emit = defineEmits(["updateTimeLeft"]);
const router = useRouter();

const progressPercentage = computed(
  () => ((props.memeDetail.voteYes || 0) / 100) * 100
);

const countdown = ref("");
const timeLeft = ref(0);

const updateCountdown = () => {
  const startInvestmentAt = new Date(
    props.memeDetail.startInvestmentAt
  ).getTime();

  timeLeft.value = startInvestmentAt - Date.now();
  countdown.value =
    timeLeft.value > 0 ? formatTime(timeLeft.value) : "Voting started!";

  emit("updateTimeLeft", {
    timeLeft: timeLeft.value,
    memeDetail: props.memeDetail,
  });
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
.progress {
  transition: width 0.3s ease-in-out;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* Limits the text to 2 lines */
  line-clamp: 2; /* Standard property for compatibility */
}
</style>
