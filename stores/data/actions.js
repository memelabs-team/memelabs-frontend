import { fetchConnectWallet, disconnectWallet } from "~/services/meme";
import { useDataStore } from "./store";

async function getUserContract() {
  const dataStore = useDataStore();
  const response = await fetchConnectWallet();

  console.log("response :", response);
  dataStore.contract.address = response.address;
  dataStore.contract.createMemeProposal = response.createMemeProposal;
  dataStore.contract.getMemeProposalsByStatus =
    response.getMemeProposalsByStatus;
}

function disconnectUser() {
  const dataStore = useDataStore();

  disconnectWallet();

  // Clear the contract and address data to simulate disconnecting the wallet
  dataStore.contract.address = null;
  dataStore.contract.createMemeProposal = null;
  dataStore.contract.getMemeProposalsByStatus = null;

  console.log("Wallet disconnected.");
  alert("Wallet disconnected.");
}

export default { getUserContract, disconnectUser };
