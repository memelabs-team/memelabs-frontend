<template>
  <div class="flex flex-col justify-center mb-12 bg-[#ECECEC] gap-12 py-20">
    <h2
      class="text-center font-inter text-5xl font-semibold tracking-tight mb-4"
    >
      Portfolio
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

      <SearchBar class="my-10" />

      <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
      >
        <MemeCard
          v-for="(meme, index) in displayedMemeData"
          :key="index"
          :title="meme.title"
          :description="meme.description"
          :mascotImage="meme.mascotImage"
          :percentage="meme.percentage"
          :marketCap="meme.marketCap"
          :daysLeft="meme.daysLeft"
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
import { ref } from "vue";

const memeOwnershipOptions = ["Owned", "Created", "Claimed"];
const userActionOptions = ["My Meme", "My Vote"];
const selectedMemeOwnership = ref("Owned");
const selectedUserAction = ref("My Meme");

const tokenData = [
  { title: "Token Owned", amount: "$100000" },
  { title: "Token Created", amount: "25000" },
  { title: "Total Trading Value", amount: "$20000" },
];
</script>

<script>
export default {
  data() {
    return {
      memeData: [
        {
          title: "Bark Bucks",
          description:
            "A coin to celebrate the ultimate loyal companion. Inspired by dog memes, it’s here to “fetch” you some laughs and profits!",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 2500,
          daysLeft: 12,
          percentage: 3000,
        },
        {
          title: "Noodle Coin",
          description:
            "Noodle Coin is here to “stretch” your gains. Inspired by the endless noodle bowl memes, it’s a long and winding path to riches.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 4500,
          daysLeft: 9,
          percentage: 450,
        },
        {
          title: "Astro Toast",
          description:
            "A toast to the stars! Launched for space lovers and breakfast enthusiasts, Astro Toast is for those who dare to dream…and eat carbs.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 3000,
          daysLeft: 5,
          percentage: 300,
        },
        {
          title: "Meme-saur",
          description:
            "The ancient meme currency that’s making a comeback. Fossil-fueled with pure meme energy.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 1500,
          daysLeft: 7,
          percentage: 15,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: 15,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: 50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: 50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: 50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: 50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: 50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -10,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -15,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -50,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          marketCap: 6500,
          daysLeft: 2,
          percentage: -50,
        },
      ],
      displayedMemeData: [], // This will hold the memes currently displayed
      itemsToLoad: 6, // Number of items to load at a time after initial load
      initialLoad: 18, // Number of items to load initially
      loading: false, // Loading state
    };
  },
  created() {
    // Load the initial set of items
    this.displayedMemeData = this.memeData.slice(0, this.initialLoad);

    // Only add event listener if in the client environment
    if (process.client) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
    // Only remove event listener if in the client environment
    if (process.client) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  computed: {
    isLoadingVisible() {
      // Hide loading if all items are loaded
      return (
        this.loading && this.displayedMemeData.length < this.memeData.length
      );
    },
  },
  methods: {
    loadMoreItems() {
      // If we're already loading or all items are loaded, skip further calls
      if (this.loading || this.displayedMemeData.length >= this.memeData.length)
        return;

      this.loading = true;

      // Simulate a delay for loading (e.g., API request delay)
      setTimeout(() => {
        const start = this.displayedMemeData.length;
        const end = start + this.itemsToLoad;

        // Add more items to displayedMemeData
        this.displayedMemeData = this.displayedMemeData.concat(
          this.memeData.slice(start, end)
        );

        this.loading = false;
      }, 1000); // Adjust delay as needed
    },
    handleScroll() {
      // Check if the user is near the bottom of the page
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        this.loadMoreItems();
      }
    },
  },
};
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
