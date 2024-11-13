<template>
  <div class="px-4">
    <div class="flex h-36 mb-4 flex-col justify-center">
      <h2 class="text-center font-inter text-5xl font-semibold tracking-tight">
        Listed Memes
      </h2>
    </div>
    <SearchBar class="flex items-center justify-center space-x-4" />

    <!-- Meme Vote Card Grid -->
    <div
      class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 my-16 md:mx-12 lg:mx-16 xl:mx-24"
    >
      <CardMemeListedCard
        v-for="(meme, index) in dataStore.memeMint"
        :memeDetail="meme"
      />
    </div>

    <!-- Loading Spinner -->
    <div v-if="isLoadingVisible" class="flex justify-center my-8">
      <span
        class="text-[#DFDFDF] text-center font-inter text-[27px] font-semibold leading-[30px]"
      >
        Loading...
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useDataStore } from "../stores/data/store";
const dataStore = useDataStore();
const displayedMemeData = ref([]);
const loading = ref(false);
const itemsToLoad = 6;
const initialLoad = 18;

// Computed properties for loading state visibility
const isLoadingVisible = computed(() => {
  return (
    loading.value && displayedMemeData.value.length < dataStore.memeMint.length
  );
});

// Load initial data
onMounted(() => {
  if (dataStore.memeMint.length > 0) {
    displayedMemeData.value = dataStore.memeMint.slice(0, initialLoad);
  }
  window.addEventListener("scroll", handleScroll);
});

watch(
  () => dataStore.memeMint,
  (newVal) => {
    if (newVal.length > 0) {
      displayedMemeData.value = newVal.slice(0, initialLoad);
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Function to load more items
function loadMoreItems() {
  if (
    loading.value ||
    displayedMemeData.value.length >= dataStore.memeMint.length
  )
    return;

  loading.value = true;

  setTimeout(() => {
    const start = displayedMemeData.value.length;
    const end = start + itemsToLoad;

    displayedMemeData.value = [
      ...displayedMemeData.value,
      ...dataStore.memeMint.slice(start, end),
    ];

    loading.value = false;
  }, 1000);
}

// Function to handle scroll event
function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    loadMoreItems();
  }
}

// Set interval to refresh countdown every second
onMounted(() => {
  const interval = setInterval(() => {
    displayedMemeData.value = [...dataStore.memeMint]; // Trigger reactivity
  }, 1000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>
