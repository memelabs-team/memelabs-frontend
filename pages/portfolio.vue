<template>
  <div class="flex flex-col justify-center mb-12 bg-[#ECECEC] gap-12 py-20">
    <h2
      class="text-center font-inter text-5xl font-semibold tracking-tight mb-4"
    >
      Profile
    </h2>

    <!-- Centered Selection Button -->
    <div class="flex justify-center">
      <div class="select-button-container w-2/3">
        <button
          v-for="option in memeOwnershipOptions"
          :key="option"
          :class="[
            'select-button',
            { active: selectedMemeOwnership === option },
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
    <!-- Token Cards -->
    <div class="grid gap-4 lg:gap-10 grid-cols-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(item, index) in tokenData"
        :key="index"
        :class="
          index === 0
            ? 'col-span-4 sm:col-span-1'
            : 'col-span-2 sm:col-span-1 lg:col-span-1'
        "
      >
        <TokenCard :title="item.title" :amount="item.amount" />
      </div>
    </div>

    <!-- Content Section -->
    <div class="mt-8">
      <div class="action-button-container">
        <button
          v-for="option in userActionOptions"
          :key="option"
          :class="[
            'custom-button',
            { selected: option === selectedUserAction },
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
        <MemeListedCard
          v-for="(meme, index) in memeFromSearch"
          :memeDetail="meme"
          :daysLeft="calculateCountdown(meme.startVestingAt)"
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
  </div>
</template>

<script setup>
import Fuse from "fuse.js";
import { useDataStore } from "~/stores/data";
const dataStore = useDataStore();

const searchInput = ref("");
const displayedMemeData = ref();

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  const userAddress = dataStore.contract.address
    ? dataStore.contract.address.toLowerCase()
    : "";

  dataStore.getMemeListByUser(userAddress);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const fuse = new Fuse(dataStore.myMemeList, {
  threshold: 0.3,
  keys: ["name"],
});

// Compute `memeFromSearch` based on `searchInput`
const memeFromSearch = computed(() => {
  if (searchInput.value.trim()) {
    return fuse.search(searchInput.value).map((result) => result.item); // Retrieve matched items
  }

  return dataStore.myMemeList;
});

const memeOwnershipOptions = ["Created", "Vote", "Invested", "Claimed"];
const userActionOptions = ["Pending", "Complete"];
const selectedMemeOwnership = ref("Created");
const selectedUserAction = ref("Pending");

const tokenData = [
  { title: "Token Owned", amount: "$100000" },
  { title: "Token Created", amount: "25000" },
  { title: "Total Trading Value", amount: "$20000" },
];

const loading = ref(false);

const memeData = ref([]);

const itemsToLoad = 6;

const isLoadingVisible = computed(() => {
  return loading.value;
});

// Function to calculate days left based on startVotingAt date
function calculateCountdown(startVotingAt) {
  const now = new Date();
  const endDate = new Date(startVotingAt);
  const timeDiff = endDate - now;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

function loadMoreItems() {
  if (loading.value) return;

  loading.value = true;

  setTimeout(() => {
    const start = dataStore.myMemeList.length;
    const end = start + itemsToLoad;

    dataStore.myMemeList = [
      ...dataStore.myMemeList,
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

<style scoped>
.select-button-container {
  display: flex;
  background-color: #ffffff;
  border-radius: 9999px;
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

.action-button-container {
  display: flex;
  border-bottom: 1px solid #e0e0e0; /* เส้นบางๆ ใต้กลุ่มปุ่ม */
}

.custom-button {
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 26px;
  font-weight: 600;
  color: #888;
  cursor: pointer;
  outline: none;
  transition: color 0.3s ease;
  position: relative;
}

.custom-button.selected {
  color: black;
  font-weight: bold;
}

.custom-button.selected::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: black; /* สีของเส้นใต้ */
}
</style>
