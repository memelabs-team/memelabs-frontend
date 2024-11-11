<template>
  <div class="page-container">
    <div class="header">
      <Button
        label="Connect UXUY Wallet"
        icon="pi pi-wallet"
        @click="handleClickConnectWallet"
      />
      <div class="mt-4">telegram param : {{ user }}</div>
    </div>
  </div>
</template>

<script setup>
const { $uxuy } = useNuxtApp();

const user = ref(null);
const telegramInfo = ref();

onMounted(() => {
  // Ensure Telegram WebApp object is available
  if (typeof window !== "undefined" && window.Telegram) {
    // Initialize Telegram Web App
    const tg = window.Telegram.WebApp;

    tg.ready(); // Tells Telegram that the app is ready

    // Expand the Web App to full height
    tg.expand();
    const theme = tg.themeParams;
    console.log("Current Telegram theme:", theme);

    // Retrieve and store user info
    user.value = tg.initDataUnsafe?.user;
    console.log("Telegram user info:", user.value);
  } else {
    console.error("Telegram Web App API is not available.");
  }
});

// Define a method to expand the Web App when a button is clicked
function expandApp() {
  if (window.Telegram) {
    window.Telegram.WebApp.expand();
  }
}

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
