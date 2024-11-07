<template>
  <div class="section">
    <div class="header-box">
      <div class="header-title">Meme Raising</div>
      <div class="search-box">
        <SearchBar />
      </div>
    </div>
    <Divider />
    <div class="meme-container">
      <MemeVoteCard
        v-for="(meme, index) in memes"
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
import memeData from "../../public/data/meme-mockup.js";
const memes = ref();

onMounted(() => {
  console.log(memeData);
  memes.value = memeData;
});

function handleClickViewAll() {
  navigateTo("/meme-vote");
}
</script>

<style lang="scss" scoped>
.section {
  padding: 80px;
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
  margin: 40px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px 15px;
}
</style>
