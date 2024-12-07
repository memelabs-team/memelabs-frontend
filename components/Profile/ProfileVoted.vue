<template>
  <!-- Content Section -->
  <div class="mt-8">
    <div class="flex border-b border-gray-300">
      <button
        v-for="option in userActionOptions"
        :key="option"
        :class="[
          'px-5 py-2 text-xl font-semibold transition-colors duration-300',
          option === selectedUserAction
            ? 'text-black font-bold border-b-2 border-black'
            : 'text-gray-500',
        ]"
        @click="selectedUserAction = option"
      >
        {{ option }}
      </button>
    </div>

    <SearchBar class="my-10" v-model:modelValue="searchInput" />

    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
    >
      <CardMemeVoteCard v-for="meme in memeFromSearch" :memeDetail="meme" />
    </div>

    <!-- Loading Spinner -->
    <div v-if="isLoadingVisible" class="flex justify-center my-8">
      <span class="text-[#DFDFDF] text-center font-inter text-xl font-semibold">
        Loading...
      </span>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import Fuse from "fuse.js";
import { useDataStore } from "../stores/data/store";

const dataStore = useDataStore();
const searchInput = ref("");
const loading = ref(false);
const memeData = ref([]);
const itemsToLoad = 6;
const selectedUserAction = ref("Pending");
const userActionOptions = ["Pending", "Complete", "Failed"];

const fuse = ref(null);

// Fetch user meme list on component mount
onMounted(async () => {
  window.addEventListener("scroll", handleScroll);

  // Initialize Fuse search with the fetched data
  fuse.value = new Fuse(dataStore.memeProcess, {
    threshold: 0.3,
    keys: ["name"],
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Watch for changes in memeProcess to update Fuse search
watch(
  () => dataStore.memeProcess,
  (newList) => {
    fuse.value = new Fuse(newList, {
      threshold: 0.3,
      keys: ["name"],
    });
  },
  { immediate: true }
);

// Compute memeFromSearch based on searchInput
const memeFromSearch = computed(() => {
  if (searchInput.value.trim()) {
    return fuse.value.search(searchInput.value).map((result) => result.item);
  }
  return dataStore.memeProcess;
});

const isLoadingVisible = computed(() => {
  return loading.value;
});

function loadMoreItems() {
  if (loading.value) return;

  loading.value = true;

  setTimeout(() => {
    const start = dataStore.memeProcess.length;
    const end = start + itemsToLoad;

    dataStore.memeProcess = [
      ...dataStore.memeProcess,
      ...memeData.slice(start, end),
    ];

    loading.value = false;
  }, 1000);
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    // loadMoreItems();
  }
}
</script>
