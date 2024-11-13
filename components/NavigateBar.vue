<template>
  <div class="bg-white shadow-md">
    <Menubar :model="items">
      <template #start>
        <div class="flex items-center space-x-2" @click="handleClickHome">
          <IconMemeLabIcon />
          <span class="text-xl font-bold cursor-pointer">MemeLabs</span>
        </div>
      </template>

      <template #item="{ item, props, hasSubmenu, root }">
        <a
          v-ripple
          class="flex items-center text-gray-800 hover:text-blue-600"
          v-bind="props.action"
        >
          <span>{{ item.label }}</span>
          <span
            v-if="item.shortcut"
            class="ml-auto border border-gray-300 rounded bg-gray-100 text-gray-500 text-xs px-2 py-0.5"
          >
            {{ item.shortcut }}
          </span>
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down ml-auto transition-transform duration-300',
              { 'pi-angle-down': root, 'pi-angle-right': !root },
            ]"
          ></i>
        </a>
      </template>

      <template #end>
        <div class="flex items-center gap-2">
          <!-- Apply the custom hide-on-mobile class -->
          <Button
            class="hide-on-mobile rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
            label="Create Meme"
            @click="handleClickCreate"
          />
          {{dataStore.isConnected}}xx
          <div v-if="dataStore.isConnected" class="relative">
            <button
              class="bg-gray-100 rounded-md px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-200"
              @click="toggleMenu"
            >
              {{ formattedAddress }}
              <i class="pi pi-angle-down"></i>
            </button>
            <div
              v-if="showMenu"
              class="absolute bg-white border border-gray-300 rounded-lg p-2 shadow-lg z-10 right-0 mt-1"
            >
              <button
                @click="handleLogout"
                class="w-full text-center text-gray-800 hover:bg-gray-100 rounded-md py-2"
              >
                Log Out
              </button>
            </div>
          </div>

          <Button
            v-else
            class="rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
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
// import { useWalletStore } from '~/stores/wallet';
import { useDataStore } from '~/stores/data/store'
import { ref, computed } from "vue";

const dataStore = useDataStore();
const showMenu = ref(false);

const items = ref([
  {
    label: "Home",
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
    label: "Offering",
    command: () => {
      navigateTo("/initial-meme-offering");
    },
  },
  {
    label: "Listed",
    command: () => {
      navigateTo("/meme-listed");
    },
  },
  {
    label: "Portfolio",
    command: () => {
      navigateTo("/portfolio");
    },
  },
  {
    label: "UXUY Wallet",
    command: () => {
      navigateTo("/connect-wallet");
    },
  },
]);

const formattedAddress = computed(() =>
  dataStore.walletAddress
    ? `${dataStore.walletAddress.slice(
        0,
        6
      )}...${dataStore.walletAddress.slice(-4)}`
    : ""
);

function handleClickCreate() {
  navigateTo("/create");
}

async function handleClickConnectWallet() {
  await dataStore.startConnectWallet();
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

async function handleLogout() {
  await  dataStore.disconnectUser();
}

function handleClickHome() {
  navigateTo("/");
}
</script>

<style scoped>
/* Custom class to hide the button on mobile screens */
.hide-on-mobile {
  display: none;
}

@media (min-width: 768px) {
  .hide-on-mobile {
    display: flex; /* Or inline-flex if needed */
  }
}
</style>
