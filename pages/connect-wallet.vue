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
  Telegram.WebApp.ready();

  user.value = Telegram.WebApp.initDataUnsafeM.user;

  console.log("telegram user:", user.value);

  if (user.value) {
    console.log("User is already logged in: ", user);
  } else {
    console.log("User is not logged in yet.");
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
