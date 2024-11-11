<template>
  <div class="page-container">
    <div class="header">
      <Button
        label="Connect UXUY Wallet"
        icon="pi pi-wallet"
        @click="handleClickConnectWallet"
      />
    </div>
  </div>
</template>

<script setup>
const { $uxuy } = useNuxtApp();

async function handleClickConnectWallet() {
  const response = await $uxuy.initializeWallet();
  const uxuyAccount = response.userAddress;
  console.log("uxuyAccount: ", uxuyAccount);
}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}
</style>
