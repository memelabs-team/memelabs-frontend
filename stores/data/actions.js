import { ethers } from "ethers";
import { useNuxtApp } from "#app";

import { useDataStore } from "./store";

async function startConnectWallet() {
  const dataStore = useDataStore();
  const { $web3Onboard, $initializeContracts } = useNuxtApp();

  console.log("connecting to wallet with web3 onboard...");
  console.log("Telegram Window", window.Telegram.WebApp);
  try {
    if (window.Telegram && window.Telegram.WebApp.initData) {
      console.log("connecting to wallet with telegram...");
      await connectTelegram();
    } else {
      const wallets = await $web3Onboard.connectWallet();
      console.log("wallets", wallets);

      if (wallets.length > 0) {
        const web3Provider = wallets[0].provider;
        console.log("web3Provider", web3Provider);
        dataStore.provider = markRaw(
          new ethers.providers.Web3Provider(web3Provider)
        );
        console.log("provider", dataStore.provider);

        dataStore.signer = markRaw(dataStore.provider.getSigner());
        console.log("signer", dataStore.signer);

        dataStore.memeBuilderContract = markRaw(
          $initializeContracts(dataStore.signer)
        );

        dataStore.walletAddress = wallets[0].accounts[0].address;
        console.log("walletAddress", dataStore.walletAddress);
      }
      dataStore.isConnected = true;
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
}

async function connectTelegram() {
  const tg = window.Telegram.WebApp;

  tg.ready(); // Tells Telegram that the app is ready

  // Expand the Web App to full height
  tg.expand();

  // Get `initData` from the URL
  const initData = tg.initData;
  console.log("initData", initData);

  setTelegramInitData(initData);

  // Retrieve and store user info
  const user = tg.initDataUnsafe?.user;
  setTelegramUserInformation(user);

  await connectUXUYWallet();
}

async function connectUXUYWallet() {
  const { $uxuy } = useNuxtApp();
  const dataStore = useDataStore();

  console.log("connecting to UXUYWallet...");
  const response = await $uxuy.initializeWallet();
  const uxuyAccount = response.userAddress;
  console.log("uxuyAccount: ", uxuyAccount);
  dataStore.walletAddress = uxuyAccount;
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

function dataMapper(proposals) {
  return proposals
    .map((item) => {
      const newItem = {
        id: item.id.toNumber(),
        name: item.name,
        symbol: item.symbol,
        supply: ethers.utils.formatEther(item.supply).toString(),
        memeStory: item.memeStory,
        logo: item.logo,
        status: item.status,
        socialChannel: {
          X: item.socialChannel.X,
          website: item.socialChannel.website,
          telegram: item.socialChannel.telegram,
        },
        memeRequirement: {
          token: item.memeRequirement.token,
          amount: ethers.utils
            .formatEther(item.memeRequirement.amount)
            .toString(),
          investorRate: (item.memeRequirement.investorRate / 100).toString(),
          liquidityRate: (item.memeRequirement.liquidityRate / 100).toString(),
          ownerRate: (item.memeRequirement.ownerRate / 100).toString(),
          communityTreasuryRate: (
            item.memeRequirement.communityTreasuryRate / 100
          ).toString(),
        },
        owner: item.owner,
        risedAmount: ethers.utils.formatEther(item.risedAmount),
        startVotingAt: new Date(
          item.startVotingAt.toNumber() * 1000
        ).toISOString(),
        startInvestmentAt: new Date(
          item.startInvestmentAt.toNumber() * 1000
        ).toISOString(),
        startVestingAt: new Date(
          item.startVestingAt.toNumber() * 1000
        ).toISOString(),
        voteYes: item.voteYes.toNumber(),
        voteNo: item.voteNo.toNumber(),
        minimumVoter: 100,
        minimumInvestmentAmount: 1000,
        maximumInvestmentAmount: 300,
        // minimumVoter: item.minimumVoter.toNumber(),
        // minimumInvestmentAmount: ethers.utils
        //   .formatEther(item.minimumInvestmentAmount)
        //   .toString(),
        // maximumInvestmentAmount: ethers.utils
        //   .formatEther(item.maximumInvestmentAmount)
        //   .toString(),
      };
      console.log(newItem);
      return newItem;
    })
    .sort((a, b) => b.id - a.id); // Sorting in descending order by id
}

async function loadAllproposals() {
  const dataStore = useDataStore();
  console.log("contract list", dataStore.memeBuilderContract);
  const response = await dataStore.memeBuilderContract.getVotingProposals(
    0,
    10
  );

  dataStore.memeVotes = dataMapper(response);
  console.log("Loading vote proposal", dataStore.memeVotes);
  dataStore.memeIMO = dataMapper(
    await dataStore.memeBuilderContract.getInvestingProposals(0, 10)
  );
  console.log("Loading memeIMO proposal", dataStore.memeVotes);
  dataStore.memeMint = dataMapper(
    await dataStore.memeBuilderContract.getMentedMemes(0, 10)
  );
}

async function createMeme(body) {
  const dataStore = useDataStore();

  try {
    body.memeRequirement.amount = ethers.utils.parseUnits(
      body.memeRequirement.amount.toString(),
      "wei"
    );
    body.supply = ethers.utils.parseUnits(body.supply.toString(), "wei");
    body.memeRequirement.communityTreasuryRate =
      body.memeRequirement.communityTreasuryRate * 100;
    body.memeRequirement.investorRate = body.memeRequirement.investorRate * 100;
    body.memeRequirement.liquidityRate =
      body.memeRequirement.liquidityRate * 100;
    body.memeRequirement.ownerRate = body.memeRequirement.ownerRate * 100;

    console.log("web3Onboard initial", dataStore.memeBuilderContract);

    if (window.Telegram && window.Telegram.WebApp.initData) {
      const response = await createMemeWithTelegram(
        body,
        dataStore.telegramInitData,
        dataStore.telegramBotToken
      );

      return response;
    } else {
      const response = await dataStore.memeBuilderContract.createMemeProposal(
        body.name,
        body.symbol,
        body.supply,
        body.memeStory,
        body.logo,
        body.socialChannel,
        body.memeRequirement,
        { gasLimit: ethers.utils.hexlify(2000000) } // Set an appropriate gas limit
      );

      await response.wait();
    }
    return response;
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

async function voteMeme(memeId, vote) {
  const dataStore = useDataStore();

  try {
    const response = await dataStore.memeBuilderContract.vote(memeId, vote);

    await response.wait();
    return response;
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

async function checkAlreadyVote(memeId, voter) {
  const dataStore = useDataStore();

  try {
    const response = await dataStore.memeBuilderContract.hasAlreadyVoted(
      memeId,
      voter
    );

    return response;
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

// async function getUserContract() {
//   const dataStore = useDataStore();
//   const response = await fetchConnectWallet();
//   dataStore.walletAddress = response.address;
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

//     const response = await createMemeProposal(body);
//     console.log("create response :", response);
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
  loadAllproposals,
  createMeme,
  voteMeme,
  checkAlreadyVote,
};
