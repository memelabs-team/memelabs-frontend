// dataStore.ts
import { defineStore } from "pinia";
import actions from "./actions";

export const useDataStore = defineStore("data", {
  state: () => ({
    walletAddress: null,
    contract: {},
    memeVotes: [],
    memeIMO: [],
    memeMint: [],
    memeByUser: [],
  }),
  actions, // Import actions from actions.ts
});
