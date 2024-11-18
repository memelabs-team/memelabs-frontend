import { defineStore } from "pinia";
import actions from "./actions";

export const useDataStore = defineStore("data", {
  state: () => ({
    provider: null,
    signer: null,
    walletAddress: null,
    isConnected: false,
    memeVotes: [],
    memeIMO: [],
    memeMint: [],
    memeBuilderContract: null,
    telegramUserInfo: {},
    telegramInitData: "",
    telegramBotToken: "",
    erc20Contract: null,
  }),
  actions, // Import actions from actions.js
});
