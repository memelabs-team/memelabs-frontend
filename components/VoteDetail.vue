<template>
  <div class="detail-content">
    <div class="left-content">
      <div class="image-container">
        <img class="image-item" :src="memeData.logo" alt="meme-image" />
      </div>
      <div class="vote-container">
        <div class="vote-display">
          <div class="vote-detail">
            <div class="result-text">
              <span class="result-label">Result (Yes) :</span>
              <span class="result-value">{{ voteAmount }} / 100</span>
            </div>
            <div class="day-left">
              <span class="remain-date">{{ remainDays }}</span>
              Days Left
            </div>
          </div>
          <ProgressBar :value="voteAmount" :showValue="false" />
        </div>
        <div class="vote-label">Vote</div>
        <div class="button-group">
          <Button class="vote-button" @click="voteYes"> Yes </Button>
          <Button class="vote-button" @click="voteNo"> No </Button>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="row">
        <div class="display-box">
          <div class="label">Token Name</div>
          <div class="value">{{ memeData.name }}</div>
        </div>
        <div class="display-box">
          <div class="label">Ticker Symbol</div>
          <div class="value">{{ memeData.name }}</div>
        </div>
      </div>

      <div class="row">
        <div class="display-box">
          <div class="label">Meme Story</div>
          <div class="value">{{ memeData.memeStory }}</div>
        </div>
      </div>

      <div class="row">
        <div class="display-box">
          <div class="label">Raised Token</div>
          <div class="value">{{ memeData.memeRequirement.token }}</div>
        </div>
        <div class="display-box">
          <div class="label">Raised Amount</div>
          <div class="value">$ {{ memeData.memeRequirement.amount }}</div>
        </div>
      </div>

      <div class="row">
        <div class="display-box">
          <div class="label">Website</div>
          <div class="value">
            {{
              memeData.socialChannel.website
                ? memeData.socialChannel.website
                : "-"
            }}
          </div>
        </div>
        <div class="display-box">
          <div class="label">X</div>
          <div class="value">
            {{ memeData.socialChannel.X ? memeData.socialChannel.X : "-" }}
          </div>
        </div>
      </div>

      <div class="row">
        <div class="display-box">
          <div class="label">Telegram</div>
          <div class="value">
            {{
              memeData.socialChannel.telegram
                ? memeData.socialChannel.telegram
                : "-"
            }}
          </div>
        </div>
        <div class="display-box">
          <div class="label">Max Supply</div>
          <div class="value">{{ memeData.supply }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "~/stores/data";

const dataStore = useDataStore();

const emits = defineEmits(["create", "getData"]);

const memeData = ref({
  name: "name",
  supply: 90000,
  memeStory: "sdffhrslkjdgihoijfohdskfhdfjk",
  logo: "/images/image-placeholder.svg",
  socialChannel: { X: "", website: "", telegram: "" },
  memeRequirement: {
    token: "asdfgjhkjljhtgfdfghjkl",
    amount: 23456,
    platformFeeRate: 0,
    communityDropRate: 0,
    liquidityRate: 0,
    investorRate: 0,
    ownerRate: 0,
    communityTreasuryRate: 0,
  },
});

const voteAmount = ref(80);
const remainDays = ref(5);

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
</script>

<style lang="scss" scoped>
.logo {
  margin-right: 8px;
  width: 25px;
}

.detail-content {
  border: 1px solid #ebebeb;
  border-radius: 20px;
  padding: 60px;
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 50px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  gap: 10px;
}

.row {
  display: grid;
  grid-template-columns: 50% 50%;
  margin-bottom: 20px;
}

.label {
  color: #8d8d8d;
  margin-bottom: 8px;
  font-weight: 700;
}

:deep(.p-progressbar) {
  border-radius: 25px;
  height: 16px;
}

:deep(.p-progressbar-value) {
  background: #06bd21;
}

.remain-date,
.result-label {
  font-weight: bold;
}

.vote-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.result-value {
  margin-left: 4px;
}

.left-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 30px;
}

.image-item {
  width: 290px;
  height: 290px;
  border-radius: 50%;
}

.vote-button {
  width: 50%;
  min-height: 60px;
  border-radius: 10px;
  border: 1px solid #ebebeb;
  background: #06bd21;
}

.vote-label {
  margin-top: 20px;
  font-weight: 700;
  font-size: 14px;
}

.result-text {
  font-size: 14px;
}

.day-left {
  font-size: 12px;
}

.right-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
