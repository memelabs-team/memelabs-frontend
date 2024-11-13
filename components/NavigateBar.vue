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

          <Button
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
import { useDataStore } from "~/stores/data/store.js";
import { ref, computed } from "vue";
import privy from "@/utils/privy"; // Import your Privy instance

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

async function handleClickConnectWallet() {
  try {
    // Step 1: Prompt the user to enter their email address
    const email = prompt("Enter your email to receive a 6-digit code:");

    // Validate email format (basic validation)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Step 2: Send the code to the provided email address
    await privy.auth.email.sendCode(email);
    alert("A 6-digit code has been sent to your email.");

    // Step 3: Prompt the user to enter the 6-digit code they received
    const code = prompt("Enter the 6-digit code you received in your email:");

    // Ensure the code is 6 digits
    if (!/^\d{6}$/.test(code)) {
      alert("The code must be exactly 6 digits.");
      return;
    }

    // Step 4: Use the code to verify and log in the user
    const user = await privy.auth.email.loginWithCode(email, code);
    if (user) {
      console.log("User authenticated:", user);
      // Here you could update your data store or UI with the user's information
      dataStore.contract.address = user.walletAddress || ""; // Example update
      alert("Login successful!");
    }
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    alert("There was an error connecting your wallet. Please try again.");
  }
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function handleLogout() {
  // Add logout logic here if needed
  privy.auth.logout(); // Logout from Privy
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
