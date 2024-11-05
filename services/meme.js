import abi from "../public/data/abi";
const contractAddress = "0x4337f1174e0f7A09a356BfA3fC75582cFBD35259";

const { contract, initializeContract } = useContract(contractAddress, abi);

async function fetchConnectWallet() {
  console.log("abi", abi);
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    await initializeContract();
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
}

function checkContractValue() {
  if (contract.value) {
    return true;
  }
  throw new Error("No Contract Value");
}

async function fetchSendTransaction() {
  checkContractValue();

  try {
    const response = await contract.value.createMemeProposal(
      memeData.value.name,
      memeData.value.supply,
      memeData.value.memeStory,
      memeData.value.logo,
      memeData.value.socialChannel,
      memeData.value.memeRequirement
    );

    await response.wait();

    alert("Transaction sent!");
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

async function fetchGetTransaction() {
  checkContractValue();

  try {
    const response = await contract.value.getMemeProposalsByStatus("VOTING");

    const data = JSON.stringify(response);
    return data;
  } catch (error) {
    console.error("Error reading transaction:", error);
  }
}

export { fetchConnectWallet, fetchSendTransaction, fetchGetTransaction };
