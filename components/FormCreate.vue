<template>
  <div class="form-content">
    <div class="upload-container">
      <FileUploaderImage
        chooseFileLabel="Upload Image"
        @selectImage="handleSelectImage"
      />
    </div>
    <div class="field">
      <label class="input-text">
        Token Name <span class="text-danger">*</span>
      </label>
      <InputText v-model="memeData.name" />
    </div>

    <div class="field">
      <label class="input-text">
        Ticker Symbol <span class="text-danger">*</span>
      </label>
      <InputText v-model="memeData.symbol" />
    </div>

    <div class="field">
      <label class="input-text">
        Meme Story <span class="text-danger">*</span>
      </label>
      <Textarea v-model="memeData.memeStory" rows="4" cols="30" />
    </div>

    <div class="field">
      <label class="input-text">
        Raised Token <span class="text-danger">*</span>
      </label>
      <div class="token-selector">
        <Select
          v-model="selectedToken"
          :options="tokenOptions"
          optionLabel="name"
          optionValue="address"
          placeholder="Select Token"
          class="w-full"
          fluid
        >
          <template #value="slotProps">
            <div class="option-item">
              <img
                :alt="slotProps.value.value"
                :src="slotProps.value.logo"
                class="logo"
              />
              <div>{{ slotProps.value.name }}</div>
            </div>
          </template>
        </Select>
      </div>
    </div>

    <!-- <div class="field">
      <label class="input-text">
        Logo <span class="text-danger">*</span>
      </label>
      <InputText v-model="memeData.logo" />
    </div> -->

    <div class="field">
      <label class="input-text">
        Raised Amount <span class="text-optional">(Optional)</span>
      </label>
      <div class="amount-group">
        <Button
          class="amount-item"
          :class="{ selected: selectedAmount === '2500' }"
          label="$2500"
          @click="handleClickAmount('2500')"
        />
        <Button
          class="amount-item"
          :class="{ selected: selectedAmount === '5000' }"
          label="$5000"
          @click="handleClickAmount('5000')"
        />
        <Button
          class="amount-item"
          :class="{ selected: selectedAmount === '10000' }"
          label="$10000"
          @click="handleClickAmount('10000')"
        />

        <InputText
          class="amount-item"
          v-model="memeData.memeRequirement.amount"
          placeholder="Custom"
        />
      </div>
      <Message class="mt-2" size="small" severity="secondary" variant="simple">
        The minimum amount needs to be greater than 1,000,000
      </Message>
    </div>

    <div class="field">
      <label class="input-text">
        Max Supply <span class="text-danger">*</span>
      </label>
      <InputNumber v-model="memeData.supply" />
      <Message class="mt-2" size="small" severity="secondary" variant="simple">
        The minimum amount needs to be greater than 1,000,000
      </Message>
    </div>

    <div class="field">
      <label class="input-text">Tokenomic (100%)</label>
      <div class="tokenmomin-box">
        <div class="token-field">
          <label class="input-text">Liquidity Provider</label>
          <Select
            v-model="memeData.memeRequirement.liquidityRate"
            :options="liquidityProviderOptions"
            optionLabel="label"
            optionValue="value"
            class="w-full"
          />
        </div>
        <div class="token-field">
          <label class="input-text">Investor</label>
          <Select
            v-model="memeData.memeRequirement.investorRate"
            :options="investorOptions"
            optionLabel="label"
            optionValue="value"
            class="w-full"
          />
        </div>
        <div class="token-field">
          <label class="input-text">Owner</label>
          <Select
            v-model="memeData.memeRequirement.ownerRate"
            :options="ownerOptions"
            optionLabel="label"
            optionValue="value"
            class="w-full"
          />
        </div>
        <div class="token-field">
          <label class="input-text">Treasury</label>
          <Select
            v-model="memeData.memeRequirement.communityTreasuryRate"
            :options="treasuryOptions"
            optionLabel="label"
            optionValue="value"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <div class="field">
      <label class="input-text">
        Website
        <span class="text-optional">(Optional)</span>
      </label>
      <InputText v-model="memeData.socialChannel.website" />
    </div>

    <div class="field">
      <label class="input-text">
        X
        <span class="text-optional">(Optional)</span>
      </label>
      <InputText v-model="memeData.socialChannel.X" />
    </div>

    <div class="field">
      <label class="input-text">
        Telegram
        <span class="text-optional">(Optional)</span>
      </label>
      <InputText v-model="memeData.socialChannel.telegram" />
    </div>

    <div class="button-group">
      <Button
        class="mt-4 w-full"
        label="Create Meme"
        rounded
        @click="handleClickCreate"
      />
    </div>
  </div>
</template>

<script setup>
import { ethers } from "ethers";

const emits = defineEmits(["create", "getData"]);

const memeData = ref({
  name: "",
  supply: 1000000,
  memeStory: "",
  logo: "",
  symbol: "",
  socialChannel: { X: "", website: "", telegram: "" },
  memeRequirement: {
    token: "",
    amount: null,
    liquidityRate: 30,
    investorRate: 20,
    ownerRate: 10,
    communityTreasuryRate: 40,
  },
});

const selectedToken = ref({
  name: "USDT",
  value: "usdt",
  logo: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png",
  address: "0xb26463e35841898aCae40c1724D732f268F56349",
});

const tokenOptions = ref([
  {
    name: "USDT",
    value: "usdt",
    logo: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png",
    address: "0xb26463e35841898aCae40c1724D732f268F56349",
  },
]);

const selectedAmount = ref(2500);

// Custom options for each field
const communityDropOptions = [
  { label: "2%", value: 2 },
  { label: "4%", value: 4 },
  { label: "6%", value: 6 },
  { label: "8%", value: 8 },
  { label: "10%", value: 10 },
];

const liquidityProviderOptions = [
  { label: "20%", value: 20 },
  { label: "30%", value: 30 },
  { label: "40%", value: 40 },
  { label: "50%", value: 50 },
];

const investorOptions = [
  { label: "10%", value: 10 },
  { label: "12%", value: 12 },
  { label: "14%", value: 14 },
  { label: "16%", value: 16 },
  { label: "18%", value: 18 },
  { label: "20%", value: 20 },
];

const ownerOptions = Array.from({ length: 11 }, (_, i) => ({
  label: `${i}%`,
  value: i,
}));

const treasuryOptions = [
  { label: "20%", value: 20 },
  { label: "30%", value: 30 },
  { label: "40%", value: 40 },
  { label: "50%", value: 50 },
];

// Watch for changes in custom amount input and reset selectedAmount if custom input is used
watch(
  () => memeData.value.memeRequirement.amount,
  (newAmount) => {
    if (newAmount !== "2500" && newAmount !== "5000" && newAmount !== "10000") {
      selectedAmount.value = newAmount;
    }
  }
);

function handleClickCreate() {
  const amountInWei = ethers.utils
    .parseUnits(selectedAmount.value.toString(), "ether")
    .toString();

  memeData.value.memeRequirement.token = selectedToken.value.address;
  memeData.value.memeRequirement.amount = amountInWei;

  console.log("emit create meme value:", memeData.value);
  // Emits memeData
  emits("create", memeData.value);
}

function handleSelectImage(imageBase64) {
  memeData.value.logo = imageBase64;
}

function handleClickAmount(amount) {
  selectedAmount.value = amount;
}
</script>

<style lang="scss" scoped>
.upload-container {
  display: flex;
  justify-content: center;
}

.field {
  display: flex;
  flex-direction: column;
  margin: 8px 0 20px 0;
}

.token-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  label {
    font-size: 14px;
    color: #555;
  }

  input,
  .w-full {
    font-size: 16px;

    &:disabled {
      background-color: #f9f9f9;
    }
  }
}

.input-text {
  margin-bottom: 8px;
  font-weight: 700;
}

.tokenmomin-box {
  border-radius: 10px;
  border: 1px solid #f6f6f6;
  background: #fff;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.text-optional {
  color: #b7b7b7;
}

.token-selector {
  width: 100%;
  margin-bottom: 8px;
}

.option-item {
  display: flex;

  gap: 8px;
}

.logo {
  margin-right: 8px;
  width: 25px;
}

.form-content {
  border: 1px solid #ebebeb;
  border-radius: 20px;
  padding: 30px;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 10px;
}

:deep(.p-inputtext),
:deep(.p-inputnumber),
:deep(.p-textarea),
:deep(.p-select) {
  border-radius: 10px;
}

.amount-group {
  display: flex;
  gap: 12px;
}

.amount-item {
  width: 25%;
  border-radius: 10px;
  border-radius: 10px;
  border: 1px solid #ebebeb;
  background: #fff;
  color: #000;

  &.selected {
    color: #fff;
    background: #000;
  }
}

@media (max-width: 768px) {
  .form-content {
    max-width: 90%;
    padding: 16px;
    border: 0;

    .tokenmomin-box {
      grid-template-columns: 1fr;
    }
  }
}
</style>
