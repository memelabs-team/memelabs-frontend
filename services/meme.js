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
      console.log("Contract initialized:", contract);
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

    alert("Transaction sent successfully!");
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

async function fetchGetTransaction(status) {
  // const contract = await fetchConnectWallet();

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
};
