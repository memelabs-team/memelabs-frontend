<template>
  <div class="section">
    <div class="header-box">
      <div class="header-title">Meme Vote</div>
      <div class="view-all-button">
        <Button
          label="View All"
          severity="secondary"
          @click="handleClickViewAll"
        />
      </div>
    </div>
    <Divider />
    <div class="meme-container">
      <MemeVoteCard
        v-for="(meme, index) in memeData"
        :key="index"
        :title="meme.title"
        :description="meme.description"
        :mascotImage="meme.mascotImage"
        :votes="meme.votes"
        :daysLeft="meme.daysLeft"
      />
    </div>
  </div>
</template>

<script setup>
const memeData = [
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
];

function handleClickViewAll() {
  navigateTo("/meme-vote");
}
</script>

<style lang="scss" scoped>
.section {
  padding: 80px 80px 40px 80px;
}

.header-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header-title {
  font-weight: bold;
  font-size: 30px;
}

.meme-container {
  margin: 40px 0 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 10px;
}
</style>
