<template>
  <div class="container">
    <h1>Meme Labs Frontend</h1>
    <button @click="connectWallet" class="connect-button">
      Connect Wallet
    </button>

    <div v-if="isConnected" class="form-container">
      <h2>Create Your Meme Coin</h2>

      <!-- Meme Coin Creation Form -->
      <div class="form">
        <label class="label">
          Meme Name
          <input
            v-model="memeData.name"
            placeholder="Enter meme name"
            class="input"
          />
        </label>

        <label class="label">
          Supply
          <input
            v-model.number="memeData.supply"
            type="number"
            placeholder="Enter supply"
            class="input"
          />
        </label>

        <label class="label">
          Meme Story
          <input
            v-model="memeData.memeStory"
            placeholder="Enter meme story"
            class="input"
          />
        </label>

        <label class="label">
          Logo URL
          <input
            v-model="memeData.logo"
            placeholder="Enter logo URL"
            class="input"
          />
        </label>

        <h3>Social Channel</h3>
        <label class="label">
          Social Channel X (e.g., Twitter handle)
          <input
            v-model="memeData.socialChannel.X"
            placeholder="Enter social channel"
            class="input"
          />
        </label>

        <label class="label">
          Website
          <input
            v-model="memeData.socialChannel.website"
            placeholder="Enter website URL"
            class="input"
          />
        </label>

        <h3>Meme Requirement</h3>
        <label class="label">
          Token Address
          <input
            v-model="memeData.memeRequirement.token"
            placeholder="Enter token address"
            class="input"
          />
        </label>

        <label class="label">
          Amount
          <input
            v-model.number="memeData.memeRequirement.amount"
            type="number"
            placeholder="Enter amount"
            class="input"
          />
        </label>

        <label class="label">
          Platform Fee Rate
          <input
            v-model.number="memeData.memeRequirement.platformFeeRate"
            type="number"
            placeholder="Enter platform fee rate"
            class="input"
          />
        </label>

        <label class="label">
          Community Drop Rate
          <input
            v-model.number="memeData.memeRequirement.communityDropRate"
            type="number"
            placeholder="Enter community drop rate"
            class="input"
          />
        </label>

        <label class="label">
          Liquidity Rate
          <input
            v-model.number="memeData.memeRequirement.liquidityRate"
            type="number"
            placeholder="Enter liquidity rate"
            class="input"
          />
        </label>

        <label class="label">
          Investor Rate
          <input
            v-model.number="memeData.memeRequirement.investorRate"
            type="number"
            placeholder="Enter investor rate"
            class="input"
          />
        </label>

        <label class="label">
          Owner Rate
          <input
            v-model.number="memeData.memeRequirement.ownerRate"
            type="number"
            placeholder="Enter owner rate"
            class="input"
          />
        </label>

        <label class="label">
          Community Treasury Rate
          <input
            v-model.number="memeData.memeRequirement.communityTreasuryRate"
            type="number"
            placeholder="Enter community treasury rate"
            class="input"
          />
        </label>

        <button @click="sendTransaction" class="action-button">
          Create Meme Proposal
        </button>
        <button @click="getTransaction" class="action-button">Get Data</button>
      </div>

      <p v-if="responseData" class="response">Response: {{ responseData }}</p>
    </div>
  </div>
</template>

<script>
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

    const { contract, initializeContract } = useContract(contractAddress, abi);

    const connectWallet = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        await initializeContract(); // Initialize the contract after connecting
        isConnected.value = true;
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    const sendTransaction = async () => {
      if (!contract.value) return;

      try {
        const tx = await contract.value.createMemeProposal(
          memeData.value.name,
          memeData.value.supply,
          memeData.value.memeStory,
          memeData.value.logo,
          memeData.value.socialChannel,
          memeData.value.memeRequirement
        );
        await tx.wait();
        alert("Transaction sent!");
      } catch (error) {
        console.error("Error sending transaction:", error);
      }
    };

    const getTransaction = async () => {
      if (!contract.value) return;

      try {
        const result = await contract.value.getMemeProposalsByStatus("VOTING");
        responseData.value = JSON.stringify(result);
      } catch (error) {
        console.error("Error reading transaction:", error);
      }
    };

    return {
      connectWallet,
      sendTransaction,
      getTransaction,
      memeData,
      responseData,
      isConnected,
    };
  },
};
</script>

<style scoped>
/* Center the content and style the container */
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  background-color: #b7d8f9e1;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 10px;
}

h2 {
  color: #444;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

h3 {
  color: #555;
  margin-top: 20px;
  font-size: 1.2rem;
}

/* Label styling */
.label {
  display: block;
  font-weight: bold;
  margin-top: 15px;
  font-size: 1rem;
  color: #333;
}

/* Input styling */
.input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0; /* Added more margin for better spacing */
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Connect Wallet button styling */
.connect-button {
  background-color: #6a1b9a;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}

.connect-button:hover {
  background-color: #7b1fa2;
}

/* Form container */
.form-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Action button styling */
.action-button {
  background-color: #00796b;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 5px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #00897b;
}

/* Response message styling */
.response {
  margin-top: 20px;
  padding: 15px;
  background-color: #e0f7fa;
  border: 1px solid #81d4fa;
  border-radius: 4px;
  color: #00796b;
}
</style>
