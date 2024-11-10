import {
  fetchConnectWallet,
  disconnectWallet,
  createMemeProposal,
} from "~/services/meme";
import { useDataStore } from "./store";
import { ethers } from "ethers";

async function getUserContract() {
  const dataStore = useDataStore();
  const response = await fetchConnectWallet();

  dataStore.contract.address = response.address;
  dataStore.walletAddress = response.address;
}

function disconnectUser() {
  const dataStore = useDataStore();

  disconnectWallet();

  // Clear the contract and address data to simulate disconnecting the wallet
  dataStore.contract.address = null;

  console.log("Wallet disconnected.");
}

async function createMeme(body) {
  try {
    // Ensure that `amount` is a BigNumber instance
    body.memeRequirement.amount = ethers.BigNumber.from(
      body.memeRequirement.amount
    );

    const response = await createMemeProposal(body);
    console.log("create response :", response);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

export default {
  getUserContract,
  disconnectUser,
  createMeme,
};
