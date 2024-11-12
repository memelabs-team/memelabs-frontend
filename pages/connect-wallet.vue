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
import { useDataStore } from "~/stores/data";

const { $uxuy } = useNuxtApp();
const dataStore = useDataStore();

const user = ref(null);

onMounted(() => {
  // Ensure Telegram WebApp object is available
  if (typeof window !== "undefined" && window.Telegram) {
    // Initialize Telegram Web App
    const tg = window.Telegram.WebApp;

    tg.ready(); // Tells Telegram that the app is ready

    // Expand the Web App to full height
    tg.expand();

    // Get `initData` from the URL
    const initData = tg.initData;
    console.log("initData", initData);

    dataStore.setTelegramInitData(initData);

    // Retrieve and store user info
    user.value = tg.initDataUnsafe?.user;
    dataStore.setTelegramUserInformation(user.value);

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
