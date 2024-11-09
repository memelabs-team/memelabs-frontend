<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:justify-between p-4 gap-4">
      <div class="flex items-center justify-between lg:justify-start gap-4">
        <div class="text-2xl lg:text-4xl font-bold">Initial Meme Offering</div>
        <Button
          label="View All"
          severity="secondary"
          @click="navigateTo(`/initial-meme-offering`)"
        />
      </div>

      <SearchBar />
    </div>

    <Divider class="my-4" />

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-4 py-4">
      <CardIMOCard
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
