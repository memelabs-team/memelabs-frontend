<template>
  <div
    class="w-full p-6 bg-[#F8F8F8] border border-[#EDEDED] rounded-lg shadow-sm mx-auto"
  >
    <h3 class="text-gray-600 text-sm font-semibold">{{ title }}</h3>
    <p class="text-black text-4xl font-bold mt-2">{{ amount }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: [String, Number],
    required: true,
  },
});
</script>
