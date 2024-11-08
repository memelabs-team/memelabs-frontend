<template>
  <div class="flex h-36 mb-4 flex-col justify-center">
    <h2 class="text-center font-inter text-5xl font-semibold tracking-tight">
      Meme Listed
    </h2>
  </div>
  <div class="p-5 md:p-10 flex flex-col w-full mx-auto">
    <div
      class="border border-gray-200 rounded-lg p-6 md:p-14 flex flex-col md:flex-row gap-6 md:gap-12"
    >
      <!-- Left Section -->
      <div class="flex flex-col items-center md:w-1/3">
        <div class="flex justify-center mb-5 md:mb-7">
          <img
            class="w-36 h-36 md:w-48 md:h-48 rounded-full"
            :src="memeDetail.logo || 'https://via.placeholder.com/160'"
            alt="meme-image"
          />
        </div>
        <div class="w-full flex flex-col">
          <div class="mb-4">
            <div class="flex justify-between mb-2 text-sm">
              <div class="font-bold">
                {{ parseInt(memeDetail.memeRequirement.amount).toFixed(0) }}/
                {{ parseInt(memeDetail.memeRequirement.amount).toFixed(0) }}
                Vote
              </div>
              <span>Complete</span>
            </div>
            <ProgressBar :value="100" :showValue="false" />
          </div>

          <div class="flex justify-between mt-4 gap-2">
            <Button
              class="h-10 md:h-12 rounded-lg bg-blue-600 text-white font-bold"
            >
              Trade Now
            </Button>
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex-1 space-y-4 md:space-y-5">
        <!-- Token Information -->
        <div class="grid grid-cols-2 gap-5">
          <div>
            <div class="text-gray-600 font-semibold text-sm">Token Name</div>
            <div
              class="truncate overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {{ memeDetail.name }}
            </div>
          </div>
          <div>
            <div class="text-gray-600 font-semibold text-sm">Ticker Symbol</div>
            <div
              class="truncate overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {{ memeDetail.symbol }}
            </div>
          </div>
        </div>

        <!-- Meme Story -->
        <div>
          <div class="text-gray-600 font-semibold text-sm">Meme Story</div>
          <div class="truncate overflow-hidden text-ellipsis whitespace-nowrap">
            {{ memeDetail.memeStory }}
          </div>
        </div>

        <!-- Financial Information -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <div>
            <div class="text-gray-600 font-semibold text-sm">Raised Token</div>
            <div
              class="truncate overflow-hidden text-ellipsis whitespace-nowrap"
            >
              USDT
            </div>
          </div>
          <div>
            <div class="text-gray-600 font-semibold text-sm">Raised Amount</div>
            <div
              class="truncate overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {{ parseInt(memeDetail.memeRequirement.amount).toFixed(0) }}
            </div>
          </div>
          <div>
            <div class="text-gray-600 font-semibold text-sm">Max Supply</div>
            <div
              class="truncate overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {{ memeDetail.supply }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { voteMemeProposal } from "../services/meme.js";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const memeDetail = ref(
  route.query.memeDetail ? JSON.parse(route.query.memeDetail) : {}
);

// Function to handle voting Yes
async function voteYes(id, status) {
  try {
    await voteMemeProposal(id, status);
  } catch (error) {
    console.error("Error voting Yes:", error);
  }
}

// Function to handle voting No
async function voteNo(id, status) {
  try {
    await voteMemeProposal(id, status);
  } catch (error) {
    console.error("Error voting No:", error);
  }
}
</script>
