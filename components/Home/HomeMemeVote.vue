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

    <Carousel
      :key="carouselKey"
      :showNavigators="false"
      :value="filteredMemeProcess"
      :numVisible="numVisible"
      :numScroll="1"
      class="px-4"
    >
      <template #item="slotProps">
        <CardMemeVoteCard
          :memeDetail="slotProps.data"
          @updateTimeLeft="handleTimeLeft"
        />
      </template>
      ></Carousel
    >
  </div>
</template>

<script setup>
import { defineProps, ref, computed, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  memeProcess: {
    type: Array,
    required: true,
  },
});

const numVisible = ref(3);
const carouselKey = computed(() => `carousel-${numVisible.value}`);
const filteredMemeProcess = ref([]);

// Watch for changes to memeProcess and update filteredMemeProcess once it has data
watch(
  () => props.memeProcess,
  (newMemeProcess) => {
    if (newMemeProcess && newMemeProcess.length > 0) {
      filteredMemeProcess.value = newMemeProcess.filter(
        (meme) => new Date(meme.startInvestmentAt).getTime() - Date.now() > 0
      );
    }
  },
  { immediate: true } // Run the watch immediately in case memeProcess already has data
);

const adjustNumVisible = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) {
    numVisible.value = 3;
  } else if (screenWidth >= 768) {
    numVisible.value = 2;
  } else {
    numVisible.value = 1;
  }
};

onMounted(() => {
  adjustNumVisible();
  window.addEventListener("resize", adjustNumVisible);
});

onUnmounted(() => {
  window.removeEventListener("resize", adjustNumVisible);
});

const handleTimeLeft = ({ timeLeft, memeDetail }) => {
  if (timeLeft > 0) {
    if (!filteredMemeProcess.value.some((item) => item.id === memeDetail.id)) {
      filteredMemeProcess.value.push(memeDetail);
    }
  } else {
    filteredMemeProcess.value = filteredMemeProcess.value.filter(
      (item) => item.id !== memeDetail.id
    );
  }
};
</script>
