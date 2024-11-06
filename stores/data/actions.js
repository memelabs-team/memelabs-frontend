import { fetchConnectWallet } from "~/services/meme";
import { useDataStore } from "./store";

async function getUserContract() {
  const dataStore = useDataStore();
  const response = await fetchConnectWallet();

  console.log(response);
  dataStore.contract.address = response.address;

  dataStore.contract.createMemeProposal = response.createMemeProposal;

  dataStore.contract.getMemeProposalsByStatus =
    response.getMemeProposalsByStatus;

  console.log(dataStore.contract);
}

export default { getUserContract };
