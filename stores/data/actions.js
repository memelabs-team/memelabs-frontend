import { useDataStore } from "./store";

function getUserContract(contract) {
  const dataStore = useDataStore();
  dataStore.contract = contract;
}

export default { getUserContract };
