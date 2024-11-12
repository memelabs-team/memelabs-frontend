import {
  fetchConnectWallet,
  disconnectWallet,
  createMemeProposal,
} from "~/services/meme";

import { createMemeWithTelegram } from "~/services/telegram";
import { useDataStore } from "./store";
import { ethers } from "ethers";

async function getUserContract() {
  const dataStore = useDataStore();
  const response = await fetchConnectWallet();

  dataStore.contract.address = response.address;
  dataStore.walletAddress = response.address;

  if (response.initData) {
    console.log("init data", response.initData);
    dataStore.setTelegramInitData(response.initData);
  }
}

function disconnectUser() {
  const dataStore = useDataStore();

  disconnectWallet();

  // Clear the contract and address data to simulate disconnecting the wallet
  dataStore.contract.address = null;

  console.log("Wallet disconnected.");
}

async function createMeme(body) {
  const dataStore = useDataStore();
  try {
    // Ensure that `amount` is a BigNumber instance
    //body.memeRequirement.amount = parseInt(body.memeRequirement.amount);

    if (window.ethereum) {
      const response = await createMemeProposal(body);
      console.log("create response :", response);
    } else if (window.Telegram) {
      console.log(
        "create with telegram:",
        body,
        dataStore.telegramInitData,
        dataStore.telegramBotToken
      );

      const response = await createMemeWithTelegram(
        body,
        dataStore.telegramInitData,
        dataStore.telegramBotToken
      );
      console.log("telegram create response :", response);
    }
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

function setTelegramUserInformation(userInfo) {
  const dataStore = useDataStore();
  dataStore.telegramUserInfo = userInfo;
  console.log(
    "Telegram user information set in store:",
    dataStore.telegramUserInfo
  );
}

function setTelegramInitData(data) {
  const dataStore = useDataStore();
  dataStore.telegramInitData = data;
  console.log("Telegram init data set in store:", dataStore.telegramInitData);

  dataStore.telegramBotToken = "7555185646:AAGi9IBkNdyhMpuXHPdTgkCQfzp1lxCCK94";
  console.log("Token data set in store:", dataStore.telegramBotToken);
}

export default {
  getUserContract,
  disconnectUser,
  createMeme,
  setTelegramUserInformation,
  setTelegramInitData,
};
