<template>
  <div class="text-center p-4">
    <div
      class="font-bold text-4xl sm:text-6xl md:text-8xl lg:text-[120px] leading-tight"
    >
      Meme Labs
    </div>

    <div class="text-base sm:text-lg text-gray-600 my-4 sm:my-6 lg:my-8">
      Jumpstart Your Meme with IMO (Initial Meme Offering): Secure, Simple, and
      <br />
      Community-Powered from Day One!
    </div>

    <div class="mt-10 lg:mt-16">
      <Button
        class="min-w-[260px] px-6 py-3 shadow-lg"
        label="Create Meme"
        @click="handleClickCreate"
        rounded
      />
    </div>
  </div>
</template>

<script setup>
function handleClickCreate() {
  navigateTo("/create");
}
</script>
