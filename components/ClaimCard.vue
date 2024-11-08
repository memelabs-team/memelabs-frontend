<template>
  <div class="vesting-card">
    <div class="card-content">
      <div class="card-title">
        <img :src="mascotImage" alt="icon" class="avatar" />
        <span>{{ title }}</span>
      </div>

      <div class="vesting-box">
        <p>Vesting Round</p>
        <strong>0/9</strong>
      </div>

      <div class="vesting-box">
        <p>Vesting Start</p>
        <strong>04/01/23 09:09 UTC</strong>
      </div>
      <div class="vesting-box">
        <p>Vesting End</p>
        <strong>22/02/23 09:09 UTC</strong>
      </div>

      <div class="vote-box">
        <img :src="mascotImage" alt="Token" class="token-avatar" />
        <span class="vote-text">1100</span>
      </div>
      <button class="claim-button">Claim</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  mascotImage: { type: String, required: true },
});
</script>

<style lang="scss" scoped>
.vote-text {
  font-size: 22px;
  font-weight: bold;
}

.avatar {
  border-radius: 100px;
  width: 50px;
  height: 50px;
}

.vesting-card {
  max-width: 380px;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.card-title {
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
}

.vesting-box {
  font-size: 14px;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.token-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.claim-button {
  background-color: #000;
  color: #fff;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

.claim-button:hover {
  background-color: #333;
}

.vote-box {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
