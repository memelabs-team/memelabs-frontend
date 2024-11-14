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
  }),
  actions, // Import actions from actions.js
});
