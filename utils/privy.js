import Privy from "@privy-io/js-sdk-core";

const privy = new Privy({
  appId: "cm3fl01jd01qd3g4ec9lv765d",
  storage: {
    get: (key) => localStorage.getItem(key),
    put: (key, value) => localStorage.setItem(key, value),
    del: (key) => localStorage.removeItem(key),
    getKeys: () => Object.keys(localStorage),
  },
});

export default privy;
