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

const user = ref(null);

onMounted(() => {
  // Ensure Telegram is available and get user data
  if (typeof window !== "undefined" && window.Telegram) {
    window.Telegram.WebApp.ready();
    user.value = window.Telegram.WebApp.initDataUnsafe?.user;

    console.log("User info:", user.value); // Display user info in console for debugging
  } else {
    console.error("Telegram Web App API is not available.");
  }
});

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
