<template>
  <div>
    <div class="flex justify-between items-center p-4">
      <div class="text-2xl sm:text-4xl font-bold">Meme Vote</div>
      <div class="mt-4 sm:mt-0">
        <Button
          label="View All"
          severity="secondary"
          @click="navigateTo(`/meme-vote`)"
        />
      </div>
    </div>

    <Divider />

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-4 py-4">
      <CardMemeVoteCard
        v-for="meme in memeProcess"
        :key="meme.id"
        :memeDetail="meme"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { defineProps } from "vue";

// Declare memeProcess as a prop
const props = defineProps({
  memeProcess: {
    type: Array,
    required: true,
  },
});

// Function to navigate when View All button is clicked
function handleClickViewAll() {
  navigateTo("/meme-vote");
}
</script>
