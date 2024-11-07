<template>
  <div class="px-4">
    <div class="flex h-36 mb-4 flex-col justify-center">
      <h2 class="text-center font-inter text-5xl font-semibold tracking-tight">
        Meme Vote
      </h2>
    </div>
    <SearchBar class="flex items-center justify-center space-x-4" />

    <!-- Meme Vote Card Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 my-16 md:mx-12 lg:mx-16 xl:mx-24"
    >
      <MemeVoteCard
        v-for="(meme, index) in displayedMemeData"
        :key="index"
        :title="meme.title"
        :description="meme.description"
        :mascotImage="meme.mascotImage"
        :votes="meme.votes"
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
</template>

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
          votes: 25,
          daysLeft: 12,
        },
        {
          title: "Noodle Coin",
          description:
            "Noodle Coin is here to “stretch” your gains. Inspired by the endless noodle bowl memes, it’s a long and winding path to riches.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 45,
          daysLeft: 9,
        },
        {
          title: "Astro Toast",
          description:
            "A toast to the stars! Launched for space lovers and breakfast enthusiasts, Astro Toast is for those who dare to dream…and eat carbs.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 30,
          daysLeft: 5,
        },
        {
          title: "Meme-saur",
          description:
            "The ancient meme currency that’s making a comeback. Fossil-fueled with pure meme energy.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 15,
          daysLeft: 7,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
        {
          title: "Feline Finance",
          description:
            "Cat memes and crypto collide! Feline Finance aims to claw its way to the top of the meme food chain.",
          mascotImage: "https://via.placeholder.com/160",
          votes: 65,
          daysLeft: 2,
        },
      ],
      displayedMemeData: [], // Holds the memes currently displayed
      itemsToLoad: 6, // Number of items to load at a time
      initialLoad: 18, // Number of items to load initially
      loading: false, // Loading state
    };
  },
  created() {
    this.displayedMemeData = this.memeData.slice(0, this.initialLoad);

    if (process.client) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
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
      if (this.loading || this.displayedMemeData.length >= this.memeData.length)
        return;

      this.loading = true;

      setTimeout(() => {
        const start = this.displayedMemeData.length;
        const end = start + this.itemsToLoad;

        this.displayedMemeData = this.displayedMemeData.concat(
          this.memeData.slice(start, end)
        );

        this.loading = false;
      }, 1000);
    },
    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        this.loadMoreItems();
      }
    },
  },
};
</script>
