import { fetchConnectWallet, createMemeProposal } from "~/services/meme";
import { useDataStore } from "./store";

import { ethers } from "ethers";

import { init } from "@web3-onboard/vue";
import injectedModule from "@web3-onboard/injected-wallets";
import { markRaw } from "vue";

import MemeBuilderABI from "~/contracts/abis/meme-builder.json";
const MEME_BUILDER_ADDRESS = "0x9aa189e9Fb830aFAA17AAA41F8b02ff0E47A381F";

const injected = injectedModule();
const rpcUrl = `https://bsc-testnet-rpc.publicnode.com`;

const web3Onboard = init({
  wallets: [injected],
  connect: {
    autoConnectLastWallet: true,
  },
  appMetadata: {
    name: "MemeLabs",
    description: "Jumpstart Your Meme with IMO",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
  chains: [
    {
      id: "0x38", // BSC Testnet
      token: "BNB",
      label: "BNB Chain Testnet",
      rpcUrl,
    },
  ],
});

const provider = new ethers.providers.JsonRpcBatchProvider(rpcUrl);
const signer: ethers.providers.JsonRpcSigner = provider.getSigner();
const walletAddress: string = "";
const isConnected: boolean = false;

// Contracts

function initialzeContract() {
  return new ethers.Contract(MEME_BUILDER_ADDRESS, MemeBuilderABI, signer);
}

// async function getUserContract() {
//   const dataStore = useDataStore();
//   const response = await fetchConnectWallet();
//   dataStore.walletAddress = response.address;
// }

// async function disconnectUser() {
//   const dataStore = useDataStore();
//   dataStore.walletAddress = null;
//   dataStore.isConnected = false
//   await web3Onboard.disconnectWallet()
//   console.log("Wallet disconnected.");
// }

// async function createMeme(body) {
//   try {
//     // Ensure that `amount` is a BigNumber instance
//     body.memeRequirement.amount = ethers.BigNumber.from(
//       body.memeRequirement.amount
//     );

//     const response = await createMemeProposal(body);
//     console.log("create response :", response);
//   } catch (error) {
//     console.error("Error sending transaction:", error);
//   }
// }

// export default {
//   getUserContract,
//   disconnectUser,
//   createMeme,
// };
