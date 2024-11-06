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
  flex-direction: column;
  padding: 20px 40px;
}
</style>
