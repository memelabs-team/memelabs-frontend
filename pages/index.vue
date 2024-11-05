<template>
  <div class="container">
    <h1>Meme Labs Frontend</h1>

    <Button label="Connect Wallet" @click="handleClickConnectWallet" />

    <FormCreate2 />
  </div>
  <div>
    <FormCreate />
  </div>
</template>

<!-- <script>
import { ref } from "vue";
import { useContract } from "~/composables/useContract";

export default {
  setup() {
    const responseData = ref(null);
    const isConnected = ref(false);
    const contractAddress = "0x4337f1174e0f7A09a356BfA3fC75582cFBD35259";
    const abi = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
        ],
        name: "NewMemeProposal",
        type: "event",
      },
      {
        inputs: [
          { internalType: "string", name: "_name", type: "string" },
          { internalType: "uint256", name: "_supply", type: "uint256" },
          { internalType: "string", name: "_memeStory", type: "string" },
          { internalType: "string", name: "_logo", type: "string" },
          {
            components: [
              { internalType: "string", name: "X", type: "string" },
              { internalType: "string", name: "website", type: "string" },
            ],
            internalType: "struct MemeBuilder.SocialChannel",
            name: "_socialChannel",
            type: "tuple",
          },
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
              {
                internalType: "uint256",
                name: "platformFeeRate",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "communityDropRate",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "liquidityRate",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "investorRate",
                type: "uint256",
              },
              { internalType: "uint256", name: "ownerRate", type: "uint256" },
              {
                internalType: "uint256",
                name: "communityTreasuryRate",
                type: "uint256",
              },
            ],
            internalType: "struct MemeBuilder.MemeRequirement",
            name: "_memeRequirement",
            type: "tuple",
          },
        ],
        name: "createMemeProposal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "string", name: "status", type: "string" }],
        name: "getMemeProposalsByStatus",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "id", type: "uint256" },
              { internalType: "string", name: "name", type: "string" },
              { internalType: "uint256", name: "supply", type: "uint256" },
              { internalType: "string", name: "memeStory", type: "string" },
              { internalType: "string", name: "logo", type: "string" },
              { internalType: "string", name: "status", type: "string" },
              {
                components: [
                  { internalType: "string", name: "X", type: "string" },
                  { internalType: "string", name: "website", type: "string" },
                ],
                internalType: "struct MemeBuilder.SocialChannel",
                name: "socialChannel",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "address", name: "token", type: "address" },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "platformFeeRate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "communityDropRate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "liquidityRate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "investorRate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "ownerRate",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "communityTreasuryRate",
                    type: "uint256",
                  },
                ],
                internalType: "struct MemeBuilder.MemeRequirement",
                name: "memeRequirement",
                type: "tuple",
              },
            ],
            internalType: "struct MemeBuilder.MemeProposal[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

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





  
  },
};
</script> -->
<script setup>
import { fetchConnectWallet } from "../services/meme.js";

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

function handleClickConnectWallet() {
  fetchConnectWallet();
}
</script>
