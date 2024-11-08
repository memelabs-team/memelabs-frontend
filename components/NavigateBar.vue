<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <div class="logo-box">
          <IconMemeLabIcon />
          <span class="home-title" @click="handleClickHome">MemeLabs</span>
        </div>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span>{{ item.label }}</span>
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down ml-auto',
              { 'pi-angle-down': root, 'pi-angle-right': !root },
            ]"
          ></i>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Button
            class="nav-button"
            label="Create Meme"
            @click="handleClickCreate"
          />

          <div v-if="dataStore.contract.address" class="relative">
            <button class="wallet-button" @click="toggleMenu">
              {{ formattedAddress }}
              <i class="pi pi-angle-down"></i>
            </button>
            <div v-if="showMenu" class="menu">
              <button @click="handleLogout" class="logout-button">
                Log Out
              </button>
            </div>
          </div>

          <Button
            v-else
            class="nav-button"
            label="Connect Wallet"
            severity="secondary"
            @click="handleClickConnectWallet"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { useDataStore } from "~/stores/data/store.js";
import { ref, computed } from "vue";

const dataStore = useDataStore();
const showMenu = ref(false);

const items = ref([
  {
    label: "Board",
    command: () => {
      navigateTo("/");
    },
  },
  {
    label: "Meme Vote",
    command: () => {
      navigateTo("/meme-vote");
    },
  },
  {
    label: "Profile",
    command: () => {
      navigateTo("/profile");
    },
  },
]);

const formattedAddress = computed(() =>
  dataStore.contract.address
    ? `${dataStore.contract.address.slice(
        0,
        6
      )}...${dataStore.contract.address.slice(-4)}`
    : ""
);

function handleClickCreate() {
  navigateTo("/create");
}

function handleClickConnectWallet() {
  dataStore.getUserContract();
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function handleLogout() {
  dataStore.disconnectUser();
}

function handleClickHome() {
  navigateTo("/");
}
</script>

<style lang="scss" scoped>
.logo-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.home-title {
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
  cursor: pointer;
}

.nav-button {
  border-radius: 8px;
}

.wallet-button {
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.menu {
  position: absolute;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  padding: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  right: 0;
}

.logout-button {
  background-color: transparent;
  border: none;
  color: black;
  padding: 0px 12px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
}

.logout-button:hover {
  background-color: #f3f4f6;
}
</style>
