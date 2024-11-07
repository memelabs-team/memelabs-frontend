<template>
  <div class="section">
    <div class="header-title">Meme Labs</div>
    <div class="subtitile">
      Jumpstart Your Meme with IMO(Initial Meme Offering): Secure, Simple, and
      <br />
      Community-Powered from Day One!
    </div>
    <div class="create-button">
      <Button
        class="button-item"
        label="Create Meme"
        @click="handleClickCreate"
        rounded
      />
    </div>
  </div>
</template>

<script setup>
function handleClickCreate() {
  navigateTo("/create");
}
</script>

<style lang="scss" scoped>
.section {
  padding: 60px;
  text-align: center;
}

.header-title {
  font-weight: bold;
  font-size: 120px;
}

.subtitile {
  font-size: 16px;
  color: #5f5f5f;
  margin: 20px 0 40px 0;
}

.create-button {
  margin-top: 60px;
}

.button-item {
  min-width: 260px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}
</style>
