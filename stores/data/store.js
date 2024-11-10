import { defineStore } from "pinia";
import actions from "./actions";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      walletAddress: null,
      contract: {},

      memeVotes: [],
      memeIMO: [],
      memeMint: [],
    };
  },
  actions,
});
