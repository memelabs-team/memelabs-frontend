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

async function fetchSendTransaction(requestBody) {
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

async function fetchGetMemeProposal(status) {
  try {
    const response = await contract.getMemeProposalsByStatus(status);

    return response
      .map((item) => {
        return {
          id: item[0].toNumber(),
          name: item[2],
          symbol: item[3],
          supply: item[4].toNumber(),
          memeStory: item[5],
          logo: item[6],
          status: item[7],
          socialChannel: {
            X: item[8][0],
            website: item[8][1],
          },
          memeRequirement: {
            token: item[9][0],
            amount: item[9][1].toString(),
            platformFeeRate: item[9][2].toString(),
            communityDropRate: item[9][3].toString(),
            investorRate: item[9][4].toString(),
            liquidityRate: item[9][5].toString(),
            ownerRate: item[9][6].toString(),
            communityTreasuryRate: item[9][7].toString(),
          },
          owner: item[1],
          risedAmount: ethers.utils.formatEther(item[15]),
          startVotingAt: new Date(item[10].toNumber() * 1000).toISOString(),
          startInvestmentAt: new Date(item[11].toNumber() * 1000).toISOString(),
          startVestingAt: new Date(item[12].toNumber() * 1000).toISOString(),
          voteYes: item[13].toNumber(),
          voteNo: item[14].toNumber(),
        };
      })
      .sort((a, b) => b.id - a.id); // Sorting in descending order by id
  } catch (error) {
    console.error("Get Meme is Error! :", error);
    return null;
  }
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
async function fetchGetTransaction(status) {
  if (!checkWalletConnection()) {
    alert("Please connect your wallet first.");
    return;
  }

  try {
    const response = await contract.getMemeProposalsByStatus(status);

    const data = JSON.stringify(response);
    console.log("Transaction data:", data);
    return data;
  } catch (error) {
    console.error("Error reading transaction:", error);
  }
}

export {
  fetchConnectWallet,
  disconnectWallet,
  fetchSendTransaction,
  fetchGetTransaction,
  checkWalletConnection,
  fetchGetMemeProposal,
  voteMemeProposal,
};
