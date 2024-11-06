<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <IconMemeLabIcon />
        <span class="home-title">MemeLabs</span>
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
            label="Create"
            @click="handleClickCreate"
          />
          <Button
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
import { ref } from "vue";

const items = ref([
  {
    label: "Board",
    command: () => {
      navigateTo("/board");
    },
  },
  {
    label: "Meme Vote",
    command: () => {
      navigateTo("/vote");
    },
  },
  {
    label: "Portfolio",
    command: () => {
      navigateTo("/portfolio");
    },
  },
]);

function handleClickCreate() {
  navigateTo("/create");
}

function handleClickConnectWallet() {
  // Implement wallet connection logic here
}
</script>

<style lang="scss" scoped>
.home-title {
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
}

.nav-button {
  border-radius: 8px;
}
</style>
