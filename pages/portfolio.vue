<template>
  <div class="py-8">
    <div class="flex flex-col justify-center mb-12 bg-[#ECECEC] gap-12 p-12">
      <h2
        class="text-center font-inter text-5xl font-semibold tracking-tight mb-4"
      >
        Portfolio
      </h2>

      <!-- Centered Selection Button -->
      <div class="flex justify-center">
        <div class="select-button-container w-2/3">
          <button
            v-for="option in options"
            :key="option"
            :class="['select-button', { active: selectedOption === option }]"
            @click="selectedOption = option"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <!-- Card Grid Container -->
    <div
      class="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:mx-12 lg:mx-16 xl:mx-24"
    >
      <div v-for="(item, index) in tokenData" :key="index">
        <TokenCard :title="item.title" :amount="item.amount" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const options = ["Owned", "Created", "Claimed"];
const selectedOption = ref("Owned");

const tokenData = [
  { title: "Token Owned", amount: "$100000" },
  { title: "Token Created", amount: "25000" },
  { title: "Total Trading Value", amount: "$20000" },
];
</script>

<style scoped>
.select-button-container {
  display: flex;
  background-color: #ffffff;
  border-radius: 9999px;
  padding: 4px;
  height: 60px;
}

.select-button {
  flex: 1;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  background: white;
  color: black;
  border-radius: 9999px;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
}

.select-button.active {
  background-color: black;
  color: white;
}
</style>
