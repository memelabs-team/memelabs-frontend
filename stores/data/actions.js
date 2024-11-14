import { fetchConnectWallet, createMemeProposal } from "~/services/meme";
import { useDataStore } from "./store";

import { markRaw } from "vue";

// stores/actions.js
import { ethers } from "ethers";
import { useNuxtApp } from "#app";

async function startConnectWallet() {
  const dataStore = useDataStore();
  const { $web3Onboard } = useNuxtApp();

  console.log("connecting to wallet...");

  try {
    const wallets = await $web3Onboard.connectWallet();
    if (wallets.length > 0) {
      const web3Provider = wallets[0].provider;

      dataStore.provider = markRaw(
        new ethers.providers.Web3Provider(web3Provider)
      );
      dataStore.signer = markRaw(dataStore.provider.getSigner());
      dataStore.walletAddress = wallets[0].accounts[0].address;
      dataStore.isConnected = true;
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
}

async function loadAllProposals() {
  const dataStore = useDataStore();

  const response = await dataStore.memeBuilderContract.getVotingProposals(
    0,
    10
  );
  dataStore.memeVotes = dataMapper(response);
  dataStore.memeIMO = dataMapper(
    await dataStore.memeBuilderContract.getInvestingProposals(0, 10)
  );
  dataStore.memeMint = dataMapper(
    await dataStore.memeBuilderContract.getMentedMemes(0, 10)
  );
}

async function createMeme(body) {
  const dataStore = useDataStore();

  try {
    body.memeRequirement.amount = ethers.utils.parseUnits(
      body.memeRequirement.amount.toString(),
      "ether"
    );
    body.supply = ethers.utils.parseUnits(body.supply.toString(), "ether");

    const responseonse = await dataStore.memeBuilderContract.createMemeProposal(
      body.name,
      body.symbol,
      body.supply,
      body.memeStory,
      body.logo,
      body.socialChannel,
      body.memeRequirement
    );
    await responseonse.wait();
    return responseonse;
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

// async function getUserContract() {
//   const dataStore = useDataStore();
//   const responseonse = await fetchConnectWallet();
//   dataStore.walletAddress = responseonse.address;
// }

// async function disconnectUser() {
//   const dataStore = useDataStore();
//   dataStore.walletAddress = null;
//   dataStore.isConnected = false
//   await web3Onboard.disconnectWallet()
//   console.log("Wallet disconnected.");
// }

// async function createMeme(body) {
//   try {
//     // Ensure that `amount` is a BigNumber instance
//     body.memeRequirement.amount = ethers.BigNumber.from(
//       body.memeRequirement.amount
//     );

//     const responseonse = await createMemeProposal(body);
//     console.log("create responseonse :", responseonse);
//   } catch (error) {
//     console.error("Error sending transaction:", error);
//   }
// }

// export default {
//   getUserContract,
//   disconnectUser,
//   createMeme,
// };

export default {
  startConnectWallet,
  loadAllProposals,
  createMeme,
};
