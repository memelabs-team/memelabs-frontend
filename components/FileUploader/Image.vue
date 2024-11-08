<template>
  <div class="upload-image">
    <div class="choose" v-if="model.url === ''" @click="imageUploadRef.choose">
      <i class="pi pi-camera"></i>
      <div class="label">Upload Image</div>
      <div class="max-file-label">jpeg/png/webp/gif( < 15MB )</div>
    </div>

    <div class="preview" v-if="model.url" @click="handleClickClear">
      <img :src="model.url" />
      <div class="overlay">
        <div class="close">
          <i class="pi pi-trash"></i>
        </div>
      </div>
    </div>

    <FileUpload
      ref="imageUploadRef"
      mode="basic"
      @select="handleSelectedFiles"
      customUpload
      auto
      accept=".png,.jpg,.jpeg"
      :maxFileSize="props.maxFileSize"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const imageUploadRef = ref();

const props = withDefaults(defineProps(), {
  maxFileSize: 1048576, // 1MB
  accept: ".png,.jpg,.jpeg",
  imageUrl: "",
  chooseFileLabel: "Choose Image",
});

const model = defineModel({
  default: () =>
    reactive({
      file: null,
      url: "",
    }),
});

const emits = defineEmits(["selectImage"]);

async function handleSelectedFiles(data) {
  model.value.file = data.files[0];
  model.value.url = data.files[0].objectURL;

  const base64 = await fileToBase64(data.files[0]);

  emits("selectImage", base64);
}

function handleClickClear() {
  model.value.url = "";
  model.value.file = null;

  imageUploadRef.value.clear();
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result || "");
    reader.onerror = (error) => reject(error);
  });
}
</script>

<style lang="scss" scoped>
:deep(.p-fileupload) {
  display: none;
}

:deep(.p-fileupload .p-message) {
  margin: 0 10px 10px;
  text-align: center;
}

.upload-image {
  width: 240px;
  height: 240px;
  border-radius: 100%;
  border: 1px solid var(--p-surface-300);
  background: #f2f2f2;
}

.choose {
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  color: var(--p-surface-500);
  line-height: 1;

  i {
    font-size: 80px;
  }

  .label {
    margin-top: 6px;
    border-radius: var(--p-form-field-border-radius);
  }

  .max-file-label {
    font-size: 11px;
    margin-top: 4px;
  }
}

.preview {
  position: relative;

  &:hover {
    .overlay {
      opacity: 1;
      width: 240px;
      height: 240px;
      border-radius: 100%;
    }
  }

  img {
    width: 240px;
    height: 240px;
    border-radius: 100%;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: var(--p-form-field-border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    i {
      font-size: 30px;
      color: var(--p-surface-200);
    }
  }
}
</style>
