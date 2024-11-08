<template>
  <div class="flex h-36 mb-4 flex-col justify-center">
    <h2 class="text-center font-inter text-5xl font-semibold tracking-tight">
      Initial Meme Offering
    </h2>
  </div>
  <div class="p-5 md:p-10 flex flex-col w-full mx-auto">
    <div
      class="border border-gray-200 rounded-lg p-6 md:p-14 flex flex-col md:flex-row gap-6 md:gap-12"
    >
      <!-- Left Section -->
      <div class="flex flex-col items-center md:w-1/3">
        <div class="flex justify-center mb-5 md:mb-7">
          <img
            class="w-36 h-36 md:w-48 md:h-48 rounded-full"
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
              <div class="text-xs">{{ memeDetail.daysLeft }}</div>
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

          <div class="font-semibold text-sm mt-4 md:mt-5">
            <p>Purchase</p>
            <InputText
              :value="modelValue"
              class="w-[470px] h-12 px-4"
              style="border-radius: 25px"
              placeholder=" $500-$1000"
              @input="handleInput"
            />
          </div>

          <div class="flex flex-col justify-between mt-4 gap-2">
            <Button
              class="h-10 md:h-12 rounded-lg bg-blue-600 text-white font-bold"
              @click="approve()"
            >
              Approve
            </Button>
            <Button
              class="h-10 md:h-12 rounded-lg bg-gray-200 text-gray-700 font-bold"
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
        <div class="grid grid-cols-3 gap-5">
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
import { voteMemeProposal } from "../services/meme.js";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const memeDetail = ref(
  route.query.memeDetail ? JSON.parse(route.query.memeDetail) : {}
);

const modelValue = ref();

function handleInput(event) {
  modelValue.value = event.target.value;
}

function approve() {
  alert("Aprove");
}

function purchase() {
  alert("Purchase");
}
</script>
