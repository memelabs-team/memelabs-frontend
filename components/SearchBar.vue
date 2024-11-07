<template>
  <div class="flex items-center justify-center space-x-4">
    <!-- Input Field -->
    <InputText
      class="search-box w-[470px] h-12 px-4"
      placeholder="Search Meme"
    />

    <!-- Icon -->
    <i
      class="pi pi-sliders-v text-gray-500 text-2xl cursor-pointer border border-gray-300 rounded-full p-2.5 hover:bg-gray-100 mr-4"
    ></i>
  </div>
</template>

<style lang="scss" scoped>
.search-box {
  border-radius: 50px;
}
</style>
