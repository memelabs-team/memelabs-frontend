import { defineStore } from "pinia";
import actions from "./actions";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      walletAddress: null,
      contract: {},
      memeProcess: [],
      memeMinted: [],
      myMemeList: [],
    };
  },
  actions,
});
