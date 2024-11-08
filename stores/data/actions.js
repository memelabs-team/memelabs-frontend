import {
  fetchConnectWallet,
  disconnectWallet,
  fetchSendTransaction,
  fetchGetTransaction,
} from "~/services/meme";
import { useDataStore } from "./store";

async function getUserContract() {
  const dataStore = useDataStore();
  const response = await fetchConnectWallet();

  dataStore.contract.address = response.address;
}

function disconnectUser() {
  const dataStore = useDataStore();

  disconnectWallet();

  // Clear the contract and address data to simulate disconnecting the wallet
  dataStore.contract.address = null;

  console.log("Wallet disconnected.");
}

async function createMeme(body) {
  console.log("Create Meme Body:", body);
  const response = await fetchSendTransaction(body);

  console.log("create response :", response);
}

async function getMemeListByStatus(status) {
  const response = await fetchGetTransaction(status);
  console.log("Get Meme List Response:", response);
  // Handle the response and display the meme list to the user
}

function getMemeListByUser(userAddress) {
  const dataStore = useDataStore();
  const memes = dataStore.memeProcess;

  dataStore.myMemeList = memes.filter((meme) => {
    if (meme.owner.toLowerCase() === userAddress) {
      return true;
    }
  });
  console.log("My Meme List:", dataStore.myMemeList);
}

export default {
  getUserContract,
  disconnectUser,
  createMeme,
  getMemeListByStatus,
  getMemeListByUser,
};
