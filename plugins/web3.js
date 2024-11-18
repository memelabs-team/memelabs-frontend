// plugins/web3.js
import { init } from "@web3-onboard/vue";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";

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

function initializeContracts(abi, signer) {
  const config = useRuntimeConfig();
  const memeBuilderAddress = config.public.CONTRACT_ADDRESS;

  return new ethers.Contract(memeBuilderAddress, abi, signer);
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      web3Onboard,
      initializeContracts,
    },
  };
});
