<template>
  <div class="flex items-center space-x-4">
    <!-- Input Field -->
    <InputText
      :value="modelValue"
      class="w-full max-w-[470px] h-12 px-4"
      style="border-radius: 25px"
      placeholder="Search Meme"
      @input="handleInput"
    />

    <!-- Icon -->
    <i
      class="pi pi-sliders-v text-gray-500 text-2xl cursor-pointer border border-gray-300 rounded-full p-2.5 hover:bg-gray-100 mr-4"
    ></i>
  </div>
</template>

<script setup>
// Define the props that the component accepts
const props = defineProps({
  modelValue: String, // This prop is used to bind the value
});

// Define the emit function to emit events
const emit = defineEmits(["update:modelValue"]);

// Emit the updated value when the input changes
function handleInput(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<style lang="scss" scoped>
.search-box {
  border-radius: 50px;
}
</style>
