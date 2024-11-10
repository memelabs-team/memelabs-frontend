import { ethers } from "ethers";

let contract;
let isWalletConnected = false;

const { initializeContract } = useContract();

async function fetchConnectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      isWalletConnected = true;
      contract = await initializeContract();
      return { contract, address: accounts[0] };
    } else {
      alert("No account found. Please connect your wallet.");
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
}

function disconnectWallet() {
  isWalletConnected = false;
  contract = null;

  if (window.ethereum && window.ethereum.request) {
    window.ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      })
      .then(() => {
        alert("Wallet disconnected successfully.");
        console.log("Disconnected from MetaMask");
      })
      .catch((error) => {
        console.error("Error disconnecting wallet:", error);
      });
  } else {
    alert("MetaMask is not available.");
  }
}

function checkWalletConnection() {
  return isWalletConnected;
}
// Meme Create
async function createMemeProposal(requestBody) {
  if (!checkWalletConnection()) {
    alert("Please connect your wallet first.");
    return;
  }

  try {
    const response = await contract.createMemeProposal(
      requestBody.name,
      requestBody.symbol,
      requestBody.supply,
      requestBody.memeStory,
      requestBody.logo,
      requestBody.socialChannel,
      requestBody.memeRequirement
    );

    console.log("Create response:", response);

    alert("Transaction sent successfully!", response);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}
// Meme Vote
async function getVotingProposals() {
  try {
    const response = await contract.getVotingProposals(0, 5);

    return response
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
      .sort((a, b) => b.id - a.id); // Sorting in descending order by id
  } catch (error) {
    console.error("Get Meme is Error! :", error);
    return null;
  }
}
// Initial Meme Offering
async function getInvestingProposals() {
  try {
    const response = await contract.getInvestingProposals(0, 5);

    return response
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
      .sort((a, b) => b.id - a.id); // Sorting in descending order by id
  } catch (error) {
    console.error("Get Meme is Error! :", error);
    return null;
  }
}

// Meme List
async function getMentedMemes() {
  try {
    const response = await contract.getMentedMemes(0, 5);
    return response
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
      .sort((a, b) => b.id - a.id); // Sorting in descending order by id
  } catch (error) {
    console.error("Get Meme is Error! :", error);
    return null;
  }
}
async function hasVoted(id, address) {
  if (!checkWalletConnection()) {
    alert("Please connect your wallet first.");
    return;
  }
  const response = await contract.hasAlreadyVoted(id, address);
  return response;
}
async function voteMemeProposal(id, status) {
  if (!checkWalletConnection()) {
    alert("Please connect your wallet first.");
    return;
  }

  console.log("voteMemeProposal :", id, status);
  try {
    const response = await contract.vote(id, status);

    console.log("Voted Meme Proposal:", response);
    return response;
  } catch (error) {
    console.error("Voted Meme is Error:", error);
  }
}

export {
  fetchConnectWallet,
  disconnectWallet,
  createMemeProposal,
  checkWalletConnection,
  voteMemeProposal,
  getInvestingProposals,
  getVotingProposals,
  getMentedMemes,
  hasVoted,
};
