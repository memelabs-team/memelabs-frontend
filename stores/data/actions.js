import {
  fetchConnectWallet,
  createMemeProposal,
} from "~/services/meme";
import { useDataStore } from "./store";
import { ethers } from 'ethers'

async function getUserContract() {
  const dataStore = useDataStore();
  const response = await fetchConnectWallet();
  dataStore.walletAddress = response.address;
}


async function disconnectUser() {
  const dataStore = useDataStore();
  dataStore.walletAddress = null;
  dataStore.isConnected = false
  await web3Onboard.disconnectWallet()
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
