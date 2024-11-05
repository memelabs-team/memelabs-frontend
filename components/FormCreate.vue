<template>
  <div class="form-content">
    <div class="field">
      <label class="input-text">
        Username <span class="text-danger">*</span>
      </label>
      <InputText v-model="value" />
    </div>

    <div class="field">
      <label class="input-text">
        Ticker Symbol <span class="text-danger">*</span>
      </label>
      <InputText v-model="value" />
    </div>

    <div class="field">
      <label class="input-text">
        Description <span class="text-danger">*</span>
      </label>
      <Textarea v-model="value" rows="5" cols="30" />
    </div>

    <div class="token-selector">
      <Select
        v-model="selectedToken"
        :options="tokenOptions"
        optionLabel="name"
        placeholder="Select Token"
        class="w-full"
      >
        <template #value="slotProps">
          <div class="option-item">
            <img
              :alt="slotProps.value.value"
              :src="slotProps.value.logo"
              class="logo"
              style="width: 18px"
            />
            <div>{{ slotProps.value.name }}</div>
          </div>
        </template>
      </Select>
    </div>

    <div class="field">
      <label class="input-text">
        Raised Amount <span class="text-optional">(Optional)</span>
      </label>
      <InputText v-model="value" />
    </div>

    <div class="field">
      <label class="input-text">
        Website
        <span class="text-optional">(Optional)</span>
      </label>
      <InputText v-model="value" />
    </div>

    <div class="field">
      <label class="input-text">
        X
        <span class="text-optional">(Optional)</span>
      </label>
      <InputText v-model="value" />
    </div>

    <div class="field">
      <label class="input-text">
        Telegram
        <span class="text-optional">(Optional)</span>
      </label>
      <InputText v-model="value" />
    </div>

    <div class="create-button">
      <Button label="Create" rounded @click="handleClickCreate" />
    </div>
  </div>
</template>

<script setup>
const memeData = ref({
  name: "",
  supply: 0,
  memeStory: "",
  logo: "",
  socialChannel: { X: "", website: "" },
  memeRequirement: {
    token: "",
    amount: 0,
    platformFeeRate: 0,
    communityDropRate: 0,
    liquidityRate: 0,
    investorRate: 0,
    ownerRate: 0,
    communityTreasuryRate: 0,
  },
});

const value = ref(null);

const selectedToken = ref({
  name: "USDT",
  value: "usdt",
  logo: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png",
});

const tokenOptions = ref([
  {
    name: "USDT",
    value: "usdt",
    logo: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png",
  },
]);

function handleClickCreate() {
  //emits memeData
}
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;
  margin: 8px 0;
}

.input-text {
  margin-bottom: 8px;
}

.text-danger {
  //color: red;
}

.token-selector {
  width: 100%;
  margin-bottom: 8px;
}

.option-item {
  display: flex;
  flex-direction: row;
}

.logo {
  margin-right: 8px;
}
</style>
