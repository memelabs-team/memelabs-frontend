// plugins/web3.js
import { init } from "@web3-onboard/vue";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import MemeBuilderABI from "~/contracts/abis/meme-builder.json";

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

const MEME_BUILDER_ADDRESS = "0x9aa189e9Fb830aFAA17AAA41F8b02ff0E47A381F";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

function initializeContracts(signer) {
  return new ethers.Contract(MEME_BUILDER_ADDRESS, MemeBuilderABI, signer);
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      web3Onboard,
      initializeContracts,
    },
  };
});
