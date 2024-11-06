<template>
  <div class="upload-image">
    <div class="choose" v-if="model.url === ''" @click="imageUploadRef.choose">
      <i class="pi pi-image"></i>
      <div class="label">{{ props.chooseFileLabel }}</div>
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

function handleSelectedFiles(data) {
  model.value.file = data.files[0];
  model.value.url = data.files[0].objectURL;
}

function handleClickClear() {
  model.value.url = "";
  model.value.file = null;

  imageUploadRef.value.clear();
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
  border-radius: var(--p-form-field-border-radius);
  border: 1px solid var(--p-surface-300);
  background: #f2f2f2;
}

.choose {
  padding: 20px;
  text-align: center;
  cursor: pointer;
  color: var(--p-surface-500);
  line-height: 1;

  i {
    font-size: 30px;
  }

  .label {
    margin-top: 6px;
    border-radius: var(--p-form-field-border-radius);
  }
}

.preview {
  position: relative;

  &:hover {
    .overlay {
      opacity: 1;
    }
  }

  img {
    display: block;
    width: 100%;
    border-radius: var(--p-form-field-border-radius);
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
