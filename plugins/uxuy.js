import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";
const { ethereum } = new WalletTgSdk({
  metaData: {
    name: "Meme Labs",
    description: "An Ethereum-based meme platform",
    url: "https://develop.d32ba0aj4s7myd.amplifyapp.com", //dev url
  },
});

let address = null;
let chainId = null;

// Call this function when your DApp initializes
async function initializeWallet() {
  console.log("initialize ethereum :", ethereum);
  // Check if the wallet is already connected
  let accounts = await ethereum.request({ method: "eth_accounts" });

  console.log("uxuy account:", accounts[0]);

  if (!accounts[0]) {
    await ethereum.request({ method: "eth_requestAccounts" });
  }

  // Get the current account and chain ID
  chainId = await ethereum.request({ method: "eth_chainId" });
  console.log("chain id:", chainId);
  accounts = await ethereum.request({ method: "eth_accounts" });
  address = accounts[0];

  // Set up event listeners for account and chain changes
  ethereum.removeAllListeners();
  ethereum.on("accountsChanged", (accounts) => {
    address = accounts[0];
    console.log("Active account changed:", accounts[0]);
  });
  ethereum.on("chainChanged", (changedChainId) => {
    chainId = changedChainId;
    console.log("Network changed to:", changedChainId);
  });

  return {
    chainId: chainId || "",
    userAddress: address || "",
  };
}

async function sendTransaction(to, value) {
  const transactionParameters = {
    to: to,
    from: address,
    value: value, // Value in wei
    // gasPrice: '0x09184e72a000', // Customize as needed
    // gas: '0x5208', // 21000 gas limit
  };

  const txHash = await ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  });
  const hash = await sendTransaction(to, value);

  const receipt = await ethereum.request({
    method: "eth_getTransactionReceipt",
    params: [hash],
  });

  return receipt;
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      uxuy: {
        initializeWallet,
        sendTransaction,
      },
    },
  };
});
