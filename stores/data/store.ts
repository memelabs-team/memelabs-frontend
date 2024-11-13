import { defineStore } from "pinia";
import { init } from '@web3-onboard/vue';
import injectedModule from '@web3-onboard/injected-wallets';
import { ethers } from 'ethers';
import { markRaw } from 'vue';

const injected = injectedModule();
const rpcUrl = `https://bsc-testnet-rpc.publicnode.com`;

const web3Onboard = init({
  wallets: [injected],
  connect: {
    autoConnectLastWallet: true
  },
  appMetadata: {
    name: 'MemeLabs',
    description: 'Jumpstart Your Meme with IMO',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ]
  },
  chains: [
    {
      id: '0x38', // BSC Testnet
      token: 'BNB',
      label: 'BNB Chain Testnet',
      rpcUrl
    },
  ]
});


import MemeBuilderABI from '~/contracts/abis/meme-builder.json'
const MEME_BUILDER_ADDRESS = "0x9aa189e9Fb830aFAA17AAA41F8b02ff0E47A381F";

const defaultRPC = () => {
  return rpcUrl;
}
export const useDataStore = defineStore('data', () => {

  const provider = ref(markRaw(new ethers.providers.JsonRpcProvider(defaultRPC())));
  const signer = ref<ethers.providers.JsonRpcSigner | null>(null);
  const walletAddress = ref<string | null>(null);
  const isConnected = ref<boolean>(false);

  const memeVotes = ref([]);
  const memeIMO = ref([]);
  const memeMint = ref([]);

  //contracts
  const memeBuilderContract = ref<ethers.Contract | null>(null);

  const initializeContracts = async () => {
    memeBuilderContract.value = new ethers.Contract(MEME_BUILDER_ADDRESS, MemeBuilderABI, provider.value);
  }


  const loadAllproposals = async () => {
    if (!memeBuilderContract.value) {
      return;
    }
    try {
      memeVotes.value = dataMapper(await memeBuilderContract.value.getVotingProposals(0, 10))
      memeIMO.value = dataMapper(await memeBuilderContract.value.getInvestingProposals(0, 10))
      memeMint.value = dataMapper(await memeBuilderContract.value.getMentedMemes(0, 10))
    } catch (error) {
      console.error('Error fetching balance from Contract A:', error);
    }
  }

  const startConnectWallet = async () => {

    //TODO: handle between on Telegram and Website

    //For Website.
    try {
      const wallets = await web3Onboard.connectWallet();
      if (wallets.length > 0) {
        const web3Provider = wallets[0].provider;

        // Make etherProvider and signer non-reactive with markRaw
        provider.value = markRaw(new ethers.providers.Web3Provider(web3Provider));
        signer.value = markRaw(provider.value.getSigner());

        // Retrieve the wallet address from the first account
        walletAddress.value = wallets[0].accounts[0].address;

        // Update connection status
        isConnected.value = true;

        console.log("Connected Wallet:", walletAddress.value);
        console.log("Ether Provider:", provider.value);

        memeBuilderContract.value = new ethers.Contract(MEME_BUILDER_ADDRESS, MemeBuilderABI, provider.value.getSigner());

        // await loadAllproposals();
      } else {
        console.log("No wallets connected.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }

  const dataMapper = (proposals: any) => {
    return proposals
      .map((item: any) => {
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
            liquidityRate: (
              item.memeRequirement.liquidityRate / 100
            ).toString(),
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
          minimumVoter: item.minimumVoter.toNumber(),
          minimumInvestmentAmount: ethers.utils
            .formatEther(item.minimumInvestmentAmount)
            .toString(),
          maximumInvestmentAmount: ethers.utils
            .formatEther(item.maximumInvestmentAmount)
            .toString(),
        };

        return newItem;
      })
      .sort((a: any, b: any) => b.id - a.id); // Sorting in descending order by id
  }


  const createMeme = async (ags: any) => {
    const body = {...ags};
    if (!memeBuilderContract.value) {
      return;
    }
    try {

      body.memeRequirement.amount = ethers.utils.parseUnits(body.memeRequirement.amount.toString(), "ether");
      body.supply = ethers.utils.parseUnits(body.supply.toString(), "ether");
      body.memeRequirement.communityTreasuryRate = body.memeRequirement.communityTreasuryRate * 100
      body.memeRequirement.investorRate =  body.memeRequirement.investorRate *100
      body.memeRequirement.liquidityRate = body.memeRequirement.liquidityRate* 100
      body.memeRequirement.ownerRate =  body.memeRequirement.ownerRate*100
 
      console.log(body)
      const tx = await memeBuilderContract.value.createMemeProposal(
        body.name,
        body.symbol,
        body.supply,
        body.memeStory,
        body.logo,
        body.socialChannel,
        body.memeRequirement
      );
 
      tx.wait();
      return tx
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
    return null
  }

  return {
    startConnectWallet,
    initializeContracts,
    loadAllproposals,
    createMeme,
    memeVotes,
    memeIMO,
    memeMint,
    isConnected,
    walletAddress
  }
});

