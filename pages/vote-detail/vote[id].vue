<template>
  <div class="p-5 md:p-10 flex flex-col w-full mx-auto">
    <div class="text-2xl md:text-4xl text-center font-semibold mb-6 md:mb-9">
      Vote Detail
    </div>
    <div
      class="border border-gray-200 rounded-lg p-6 md:p-14 flex flex-col md:flex-row gap-6 md:gap-12"
    >
      <!-- Left Section -->
      <div class="flex flex-col items-center md:w-1/3">
        <div class="flex justify-center mb-5 md:mb-7">
          <img
            class="w-36 h-36 md:w-48 md:h-48 rounded-full"
            :src="memeDetail.logo"
            alt="meme-image"
          />
        </div>
        <div class="w-full flex flex-col">
          <div class="mb-4">
            <div class="flex justify-between mb-2 text-sm">
              <div class="font-bold">{{ memeDetail.voteYes }}/100 Vote</div>
              <div class="text-xs">{{ memeDetail.daysLeft }}</div>
            </div>
            <ProgressBar :value="memeDetail.voteYes" :showValue="false" />
          </div>
          <div class="text-center font-semibold text-sm mt-4 md:mt-5">
            Vote Now
          </div>
          <div class="flex justify-between mt-4 gap-2">
            <Button
              class="w-1/2 h-10 md:h-12 rounded-lg bg-blue-600 text-white font-bold"
              @click="voteYes(memeDetail.id, 0)"
            >
              Yes
            </Button>
            <Button
              class="w-1/2 h-10 md:h-12 rounded-lg bg-gray-200 text-gray-700 font-bold"
              @click="voteNo(memeDetail.id, 1)"
            >
              No
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
            <div>{{ memeDetail.name }}</div>
          </div>
          <div>
            <div class="text-gray-600 font-semibold text-sm">Ticker Symbol</div>
            <div>{{ memeDetail.symbol }}</div>
          </div>
        </div>

        <!-- Meme Story -->
        <div>
          <div class="text-gray-600 font-semibold text-sm">Meme Story</div>
          <div>{{ memeDetail.memeStory }}</div>
        </div>

        <!-- Financial Information -->
        <div class="grid grid-cols-2 gap-5">
          <div>
            <div class="text-gray-600 font-semibold text-sm">Raised Token</div>
            <div>{{ memeDetail.memeRequirement.token }}</div>
          </div>
          <div>
            <div class="text-gray-600 font-semibold text-sm">Raised Amount</div>
            <div>${{ memeDetail.memeRequirement.amount }}</div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="grid grid-cols-2 gap-5">
          <div>
            <div class="text-gray-600 font-semibold text-sm">Website</div>
            <div>
              <a
                :href="memeDetail.socialChannel.website"
                class="text-blue-500 hover:underline"
              >
                {{ memeDetail.socialChannel.website || "-" }}
              </a>
            </div>
          </div>
          <div>
            <div class="text-gray-600 font-semibold text-sm">X</div>
            <div>
              <a
                :href="memeDetail.socialChannel.X"
                class="text-blue-500 hover:underline"
              >
                {{ memeDetail.socialChannel.X || "-" }}
              </a>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="grid grid-cols-2 gap-5">
          <div>
            <div class="text-gray-600 font-semibold text-sm">Telegram</div>
            <div>{{ memeDetail.socialChannel.telegram || "-" }}</div>
          </div>
          <div>
            <div class="text-gray-600 font-semibold text-sm">Max Supply</div>
            <div>{{ memeDetail.supply }}</div>
          </div>
        </div>

        <!-- Distribution Section -->
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div class="border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-gray-600 font-semibold text-sm">Platform Fee</div>
            <div class="text-2xl font-bold">
              {{ memeDetail.memeRequirement.platformFeeRate }}%
            </div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-gray-600 font-semibold text-sm">
              Community Drop
            </div>
            <div class="text-2xl font-bold">
              {{ memeDetail.memeRequirement.communityDropRate }}%
            </div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-gray-600 font-semibold text-sm">
              Liquidity Provider
            </div>
            <div class="text-2xl font-bold">
              {{ memeDetail.memeRequirement.liquidityRate }}%
            </div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-gray-600 font-semibold text-sm">Investor</div>
            <div class="text-2xl font-bold">
              {{ memeDetail.memeRequirement.investorRate }}%
            </div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-gray-600 font-semibold text-sm">Owner</div>
            <div class="text-2xl font-bold">
              {{ memeDetail.memeRequirement.ownerRate }}%
            </div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-gray-600 font-semibold text-sm">Treasury</div>
            <div class="text-2xl font-bold">
              {{ memeDetail.memeRequirement.communityTreasuryRate }}%
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
