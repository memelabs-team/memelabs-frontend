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

      <!-- Meme Listed Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
      >
        <MemeListedCard
          v-for="(meme, index) in memeFromSearch"
          :memeDetail="meme"
        />
      </div>

      <!-- Loading Spinner -->
      <div v-if="isLoadingVisible" class="flex justify-center my-8">
        <span
          class="text-[#DFDFDF] text-center font-inter text-xl font-semibold"
        >
          Loading...
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import Fuse from "fuse.js";
import { useDataStore } from "../stores/data/store.js";

const dataStore = useDataStore();
const searchInput = ref("");
const loading = ref(false);
const memeData = ref([]);
const itemsToLoad = 6;
const selectedMemeOwnership = ref("Created");
const selectedUserAction = ref("Pending");
const memeOwnershipOptions = ["Created", "Vote", "Invested", "Claimed"];
const userActionOptions = ["Pending", "Complete"];

const fuse = ref(null);

// Fetch user meme list on component mount
onMounted(async () => {
  window.addEventListener("scroll", handleScroll);

  // Initialize Fuse search with the fetched data
  fuse.value = new Fuse(dataStore.memeMinted, {
    threshold: 0.3,
    keys: ["name"],
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Watch for changes in memeMinted to update Fuse search
watch(
  () => dataStore.memeMinted,
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
  return dataStore.memeMinted;
});

const isLoadingVisible = computed(() => {
  return loading.value;
});

function loadMoreItems() {
  if (loading.value) return;

  loading.value = true;

  setTimeout(() => {
    const start = dataStore.memeMinted.length;
    const end = start + itemsToLoad;

    dataStore.memeMinted = [
      ...dataStore.memeMinted,
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
