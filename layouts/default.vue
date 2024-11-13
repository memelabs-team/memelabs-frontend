<template>
  <NavigateBar />
  <div>
    <slot />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDataStore } from "~/stores/data/store";
const dataStore = useDataStore();
onMounted(async () => {
  await dataStore.initializeContracts()
  await dataStore.loadAllproposals()
});
</script>

<style lang="scss" scoped></style>
