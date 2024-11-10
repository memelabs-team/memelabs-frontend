<template>
  <div>
    <!-- Header with Meme Vote title and View All button -->
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

    <CardMemeVoteCard :memeDetails="memeProcess" />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  memeProcess: {
    type: Array,
    required: true,
  },
});
</script>
