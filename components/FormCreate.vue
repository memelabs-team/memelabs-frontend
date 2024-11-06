<template>
  <div class="form-content">
    <div class="field">
      <label class="input-text">
        Username <span class="text-danger">*</span>
      </label>
      <InputText v-model="memeData.name" placeholder="Enter Username" />
    </div>

    <div class="field">
      <label class="input-text">
        Supply <span class="text-danger">*</span>
      </label>
      <InputText v-model="memeData.supply" />
    </div>

    <div class="field">
      <label class="input-text">
        Logo <span class="text-danger">*</span>
      </label>
      <InputText v-model="memeData.logo" />
    </div>

    <div class="field">
      <label class="input-text">
        Ticker Symbol <span class="text-danger">*</span>
      </label>
      <InputText v-model="value" />
    </div>

    <div class="field">
      <label class="input-text">
        Meme Story <span class="text-danger">*</span>
      </label>
      <Textarea v-model="memeData.memeStory" rows="5" cols="30" />
    </div>

    <div class="field">
      <label class="input-text">
        Token <span class="text-danger">*</span>
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
                style="width: 18px"
              />
              <div>{{ slotProps.value.name }}</div>
            </div>
          </template>
        </Select>
      </div>
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

    <div class="field">
      <label class="input-text">
        Amount
        <span class="text-optional">(Optional)</span>
      </label>
      <InputNumber v-model="memeData.memeRequirement.amount" />
    </div>

    <div class="field">
      <label class="input-text">
        Platform Fee Rate
        <span class="text-optional">(Optional)</span>
      </label>
      <InputNumber v-model="memeData.memeRequirement.platformFeeRate" />
    </div>

    <div class="field">
      <label class="input-text">
        Community Drop Rate
        <span class="text-optional">(Optional)</span>
      </label>
      <InputNumber v-model="memeData.memeRequirement.communityDropRate" />
    </div>

    <div class="field">
      <label class="input-text">
        Liquidity Rate
        <span class="text-optional">(Optional)</span>
      </label>
      <InputNumber v-model="memeData.memeRequirement.liquidityRate" />
    </div>

    <div class="field">
      <label class="input-text">
        Investor Rate
        <span class="text-optional">(Optional)</span>
      </label>
      <InputNumber v-model="memeData.memeRequirement.investorRate" />
    </div>

    <div class="field">
      <label class="input-text">
        Owner Rate
        <span class="text-optional">(Optional)</span>
      </label>
      <InputNumber v-model="memeData.memeRequirement.ownerRate" />
    </div>

    <div class="field">
      <label class="input-text">
        Community Treasury Rate
        <span class="text-optional">(Optional)</span>
      </label>
      <InputNumber v-model="memeData.memeRequirement.communityTreasuryRate" />
    </div>

    <div class="button-group">
      <Button label="Create Meme" rounded @click="handleClickCreate" />
      <Button label="Get Data" rounded @click="handleClickGetData" />
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["create", "getData"]);

const memeData = ref({
  name: "",
  supply: 0,
  memeStory: "",
  logo: "",
  socialChannel: { X: "", website: "", telegram: "" },
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
  address: "0x4337f1174e0f7A09a356BfA3fC75582cFBD35259",
});

const tokenOptions = ref([
  {
    name: "USDT",
    value: "usdt",
    logo: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png",
    address: "0x4337f1174e0f7A09a356BfA3fC75582cFBD35259",
  },
]);

function handleClickCreate() {
  console.log(memeData.value);
  memeData.value.memeRequirement.token = selectedToken.value.address;
  //emits memeData
  emits("create", memeData.value);
}

function handleClickGetData() {
  //gets memeData
  emits("getData");
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
</style>
