<template>
  <Carousel :value="filteredMemeDetails" :numVisible="3" :numScroll="1">
    <template #item="slotProps">
      <div
        class="p-4 bg-white border rounded-lg shadow-md items-center relative flex gap-4 cursor-pointer mx-2 my-1"
        @click="voteNow(slotProps.data)"
      >
        <!-- Mascot Image and Content -->
        <div
          class="flex-shrink-0 w-24 sm:w-36 h-24 sm:h-36 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        >
          <img
            :src="slotProps.data.logo || 'https://via.placeholder.com/160'"
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
            {{ slotProps.data.name }}
          </h3>
          <p class="text-gray-600 text-sm mt-2 line-clamp-2">
            {{ slotProps.data.memeStory }}
          </p>

          <!-- Voting Info -->
          <div
            class="voting-info flex justify-between text-sm font-medium text-gray-700 mt-4"
          >
            <span class="text-gray-800 font-semibold">
              {{ slotProps.data.voteYes || 0 }}/100 Vote
            </span>
            <span class="text-gray-800 font-semibold">
              {{ calculateCountdown(slotProps.data.startInvestmentAt) }}
            </span>
          </div>

          <!-- Progress Bar -->
          <div class="progress-bar w-full h-2 bg-gray-200 rounded-full mt-2">
            <div
              class="progress h-full bg-blue-500 rounded-full"
              :style="{
                width: calculateProgress(slotProps.data.voteYes) + '%',
              }"
            ></div>
          </div>
        </div>
      </div>
    </template>
  </Carousel>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";
import { formatTime } from "@/utils/timeUtils"; // Import the utility function

const props = defineProps({
  memeDetails: { type: Array, required: true },
});

const router = useRouter();

// Computed property to filter memeDetails where timeLeft > 0
const filteredMemeDetails = computed(() => {
  return props.memeDetails.filter(
    (meme) => calculateTimeLeft(meme.startInvestmentAt) > 0
  );
});

// Function to calculate progress percentage
const calculateProgress = (voteYes) => {
  return ((voteYes || 0) / 100) * 100;
};

// Function to calculate countdown for each item
const calculateCountdown = (startInvestmentAt) => {
  const timeLeft = calculateTimeLeft(startInvestmentAt);
  return timeLeft > 0 ? formatTime(timeLeft) : "Voting started!";
};

// Function to calculate time left until voting starts
const calculateTimeLeft = (startInvestmentAt) => {
  const startTime = new Date(startInvestmentAt).getTime();
  return startTime - Date.now();
};

const voteNow = (memeDetail) => {
  router.push({
    path: `/detail/vote-detail[${memeDetail.id}]`,
    query: { memeDetail: JSON.stringify(memeDetail) },
  });
};
</script>

<style scoped></style>
