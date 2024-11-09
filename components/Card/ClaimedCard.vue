<template>
  <div
    class="meme-vote-card p-6 bg-white rounded-lg border border-gray-300 shadow-md flex flex-col gap-4 cursor-pointer"
  >
    <!-- Top Section with Logo and Symbol -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <img
          :src="memeDetail.logo || 'https://via.placeholder.com/160'"
          alt="Mascot"
          class="w-full h-full object-cover max-w-20 max-h-20 rounded-full"
        />
        <h3 class="text-2xl font-semibold text-gray-800">
          {{ memeDetail.symbol }}
        </h3>
      </div>

      <div class="text-left">
        <p class="text-gray-500">Vesting Round</p>
        <p class="text-green-500 font-semibold">4/9</p>
      </div>
    </div>

    <!-- Vesting Info Section -->
    <div class="grid grid-cols-2 gap-4 text-gray-600">
      <div>
        <p class="text-sm">Vesting Start</p>
        <p class="font-semibold text-gray-800">04/01/23 09:09 UTC</p>
      </div>
      <div>
        <p class="text-sm">Vesting End</p>
        <p class="font-semibold text-gray-800">04/01/23 09:09 UTC</p>
      </div>
    </div>

    <!-- Amount and Claim Button -->
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <img
          :src="memeDetail.logo || 'https://via.placeholder.com/160'"
          alt="Token Icon"
          class="w-10 h-10 object-cover rounded-full"
        />
        <span class="text-3xl font-semibold text-gray-800">3000</span>
      </div>
      <button
        class="ml-auto bg-green-100 text-green-600 font-semibold py-2 px-4 rounded-md border border-green-300 hover:bg-green-200 transition duration-200"
      >
        Claim
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  memeDetail: { type: Object, required: true },
});
</script>
