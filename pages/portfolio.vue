<template>
  <div
    class="flex flex-col justify-center mb-12 bg-[#ECECEC] gap-12 py-20 px-4 sm:px-6 md:px-8"
  >
    <h2
      class="text-center font-inter text-5xl font-semibold tracking-tight mb-4"
    >
      Profile
    </h2>

    <!-- Centered Selection Button -->
    <div class="flex justify-center">
      <div class="flex bg-white h-14 rounded-full max-w-[600px] w-full mx-auto">
        <button
          v-for="option in memeOwnershipOptions"
          :key="option"
          :class="[
            'flex-1 h-full font-semibold text-xs sm:text-lg sm:px-4 sm:py-3 w-full rounded-full transition-colors duration-300',
            selectedMemeOwnership === option
              ? 'bg-black text-white'
              : 'bg-white text-black',
          ]"
          @click="selectedMemeOwnership = option"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>

  <!-- Card Grid Container -->
  <div class="px-4 md:mx-12 lg:mx-16 xl:mx-24">
    <ProfileCreated v-if="selectedMemeOwnership === 'Created'" />
    <ProfileVoted v-if="selectedMemeOwnership === 'Vote'" />
    <ProfileInvested v-if="selectedMemeOwnership === 'Invested'" />
    <ProfileClaimed v-if="selectedMemeOwnership === 'Claimed'" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedMemeOwnership = ref("Created");
const memeOwnershipOptions = ["Created", "Vote", "Invested", "Claimed"];
</script>
