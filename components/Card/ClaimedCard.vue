<template>
  <div
    class="p-6 bg-white rounded-lg border border-gray-300 shadow-md flex flex-col gap-4 cursor-pointer"
  >
    <!-- Top Section with Logo and Symbol -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div
          class="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-black shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        >
          <img
            :src="memeByUser.logo || 'https://via.placeholder.com/160'"
            alt="Mascot"
            class="w-full h-auto object-cover"
            @error="
              (event) => (event.target.src = 'https://via.placeholder.com/160')
            "
          />
        </div>

        <h3 class="text-2xl font-semibold text-gray-800">
          {{ memeByUser.symbol }}
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
          :src="memeByUser.logo || 'https://via.placeholder.com/160'"
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
  memeByUser: { type: Object, required: true },
});
</script>
