<template>
  <NavigateBar />
  <div class="page">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 20px 40px;
  width: 100vw;
}
</style>
