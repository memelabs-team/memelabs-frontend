<template>
  <div class="flex h-36 mb-4 flex-col justify-center">
    <h2
      class="text-center font-inter text-3xl md:text-5xl font-semibold tracking-tight"
    >
      Initial Meme Offering
    </h2>
  </div>
  <div class="p-5 md:p-10 flex flex-col w-full mx-auto">
    <div
      class="border border-gray-200 rounded-lg p-6 md:p-14 flex flex-col md:flex-row gap-6 md:gap-12"
    >
      <!-- Left Section -->
      <div class="flex flex-col items-center w-full md:w-1/3">
        <div class="flex justify-center mb-5 md:mb-7">
          <img
            class="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full"
            :src="memeDetail.logo || 'https://via.placeholder.com/160'"
            alt="meme-image"
          />
        </div>
        <div class="w-full flex flex-col">
          <div class="mb-4">
            <!-- Market Cap Info -->
            <div
              class="flex justify-between text-sm font-medium text-gray-700 mt-4"
            >
              <span class="text-gray-800 font-semibold">
                ${{ parseFloat(memeDetail.risedAmount).toFixed(0) }}/{{
                  parseFloat(memeDetail.memeRequirement.amount).toFixed(0)
                }}
                USDT
              </span>

              <span class="text-gray-800 font-semibold">
                {{ countdown }}
              </span>
            </div>
            <!-- Progress Bar -->
            <div class="progress-bar w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                class="progress h-full bg-green-500 rounded-full"
                :style="{
                  width:
                    (memeDetail.risedAmount /
                      memeDetail.memeRequirement.amount) *
                      100 +
                    '%',
                }"
              ></div>
            </div>
          </div>
{{proposal}}
          <div class="font-semibold text-sm mt-4 md:mt-5">
            <p>Purchase</p>
            <InputText
            @change="checkAllowance"
              :value="modelValue"
              class="w-full h-10 sm:h-12 px-4"
              style="border-radius: 25px"
              placeholder=" $500-$1000"
              @input="handleInput"
            />
          </div>

          <div class="flex flex-col sm:flex-row justify-between mt-4 gap-2">
            <Button :disabled="disabledApproveBtn"
              class="h-10 md:h-12 w-full sm:w-auto rounded-lg bg-blue-600 text-white font-bold"
              :class="{ 'animate-spin': approveLoading }"
              @click="approve()"
            >
              Approve
            </Button>
            <Button 
          
            :disabled="!disabledApproveBtn"
                :class="{ 'animate-spin': purchaseLoading }"
              class="h-10 md:h-12 w-full sm:w-auto rounded-lg bg-gray-200 text-gray-700 font-bold"
              @click="purchase()"
            >
              Purchase
            </Button>
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex-1 space-y-4 md:space-y-5">
        <!-- Token Information -->
        <div class="grid grid-cols-2 gap-5">
          <div class="col-span-2">
            <div class="text-gray-600 font-semibold text-sm">Tokensale</div>
            <div>
              {{ memeDetail.memeRequirement.investorRate }}% of total allocation
              ({{ memeDetail.memeRequirement.amount }} ${{ memeDetail.symbol }})
            </div>
          </div>

          <div>
            <div class="text-gray-600 font-semibold text-sm">Token Name</div>
            <div>{{ memeDetail.name }}</div>
          </div>
          <div>
            <div class="text-gray-600 font-semibold text-sm">Ticker Symbol</div>
            <div>{{ memeDetail.symbol }}</div>
          </div>
        </div>

        <!-- Meme Story -->
        <div>
          <div class="text-gray-600 font-semibold text-sm">Meme Story</div>
          <div>{{ memeDetail.memeStory }}</div>
        </div>

        <!-- Financial Information -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <div>
            <div class="text-gray-600 font-semibold text-sm">Raised Token</div>
            <div>USDT</div>
          </div>
          <div>
            <div class="text-gray-600 font-semibold text-sm">Raised Amount</div>
            <div>${{ memeDetail.memeRequirement.amount }}</div>
          </div>
          <div>
            <div class="text-gray-600 font-semibold text-sm">Max Supply</div>
            <div>{{ memeDetail.supply }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getInvestingProposals } from "../services/meme.js";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { ethers } from "ethers";
const { initializeErc20Contract,initializeContract } = useContract();
import { useDataStore } from "~/stores/data/store";
 
const route = useRoute();
const memeDetail = ref(
  route.query.memeDetail ? JSON.parse(route.query.memeDetail) : {}
);

const erc20Contract = ref(null);
const memeBuilderContract = ref(null);
const dataStore = useDataStore();
onMounted(async () => {
  await loadData()
  memeBuilderContract.value = await initializeContract()
  erc20Contract.value = await initializeErc20Contract(memeDetail.value.memeRequirement.token);
  console.log("initializeErc20Contract",memeDetail.value.memeRequirement.token );
  modelValue.value = 300;
})
 
async function loadData(){
  const proposals = await getInvestingProposals()
  if (!proposals) return
  if(proposals.length >= 0){
    memeDetail.value = proposals[0]
  }  
  return null
 
}

const modelValue = ref();
const disabledApproveBtn = ref(false);
let timer = null
async function checkAllowance(){

  if (!modelValue.value){
    return
  }

  if (timer) clearTimeout(timer)
  timer = setTimeout(async () => {
    const result = await isValidAllowance()
    disabledApproveBtn.value = result
    console.log("checkAllowance:",result)
  }, 2000)
}
function handleInput(event) {
  modelValue.value = event.target.value;
}

async function isValidAllowance() {
  const amount = ethers.utils.parseUnits(modelValue.value.toString(), "ether");

  const result = await erc20Contract.value.allowance(dataStore.walletAddress, contractAddress);
  const ok = result >= amount
  console.log("isValidAllowance:",ok)
  return ok
}

const approveLoading = ref(false)
async function approve() {

  console.log(contractAddress,modelValue.value);
 const amount = ethers.utils.parseUnits(modelValue.value.toString(), "ether");
 console.log("approve:",amount)
 const tx = await erc20Contract.value.approve(contractAddress,amount);
 approveLoading.value = true
 await tx.wait();
 approveLoading.value = false
}

const purchaseLoading = ref(false)
async function purchase() {

  alert("Purchase");
  const amount = ethers.utils.parseUnits(modelValue.value.toString(), "ether");
  const tx = await memeBuilderContract.value.invest(memeDetail.value.id,memeDetail.value.memeRequirement.token , amount);
  purchaseLoading.value = true
  await tx.wait();
  purchaseLoading.value = false
}

// Countdown until voting starts
const countdown = ref("");
const timeLeft = ref(0);

const updateCountdown = () => {
  const startInvestmentAt = new Date(
    memeDetail.value.startInvestmentAt
  ).getTime();

  timeLeft.value = startInvestmentAt - Date.now();

  countdown.value =
    timeLeft.value > 0 ? formatTime(timeLeft.value) : "Voting started!";
};

onMounted(() => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
</script>
