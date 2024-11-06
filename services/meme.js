const { initializeContract } = useContract();

let contract;

async function fetchConnectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    contract = await initializeContract();
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
}

function checkContractValue() {
  if (contract) {
    return true;
  }
  throw new Error("No Contract Value");
}

async function fetchSendTransaction(requestBody) {
  checkContractValue();

  try {
    const response = await contract.createMemeProposal(
      requestBody.name,
      requestBody.supply,
      requestBody.memeStory,
      requestBody.logo,
      requestBody.socialChannel,
      requestBody.memeRequirement
    );

    await response.wait();

    alert("Transaction sent!");
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

async function fetchGetTransaction(status) {
  checkContractValue();

  try {
    const response = await contract.getMemeProposalsByStatus(status);

    const data = JSON.stringify(response);
    return data;
  } catch (error) {
    console.error("Error reading transaction:", error);
  }
}

export { fetchConnectWallet, fetchSendTransaction, fetchGetTransaction };
