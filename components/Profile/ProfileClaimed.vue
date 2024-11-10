<template>
  <!-- Content Section -->
  <div class="mt-8">
    <SearchBar class="my-10" v-model:modelValue="searchInput" />

    <!-- Meme Listed Cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
    >
      <CardClaimedCard
        v-for="(meme, index) in memeFromSearch"
        :memeByUser="meme"
      />
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
import { defineProps } from "vue";

const searchInput = ref("");
const loading = ref(false);
const memeData = ref([]);
const itemsToLoad = 6;

const fuse = ref(null);

const props = defineProps({
  memeByUser: { type: Array, required: true },
});

// Fetch user meme list on component mount
onMounted(async () => {
  window.addEventListener("scroll", handleScroll);

  // Initialize Fuse search with the fetched data
  fuse.value = new Fuse(props.memeByUser, {
    threshold: 0.3,
    keys: ["name"],
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Watch for changes in memeByUser to update Fuse search
watch(
  () => props.memeByUser,
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
  return props.memeByUser;
});

const isLoadingVisible = computed(() => {
  return loading.value;
});

function loadMoreItems() {
  if (loading.value) return;

  loading.value = true;

  setTimeout(() => {
    const start = props.memeByUser.length;
    const end = start + itemsToLoad;

    props.memeByUser = [...props.memeByUser, ...memeData.slice(start, end)];

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
