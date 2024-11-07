import { ethers } from "ethers";

import abi from "../public/data/abi";
const contractAddress = "0xf47f56A933eD6F9A7A195121d2c0aFCA845B1629";

function useContract() {
  const contract = ref(null);

  async function initializeContract() {
    if (
      typeof ethers === "undefined" ||
      typeof ethers.providers === "undefined"
    ) {
      console.error("Ethers is not defined properly. Check your import.");
      return;
    }

    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        contract.value = new ethers.Contract(contractAddress, abi, signer);

        console.log("Contract initialized:", contract.value);
        return contract.value;
      } catch (error) {
        console.error("Error connecting to contract:", error);
      }
    } else {
      console.error("Ethereum provider not found. Install MetaMask.");
    }
  }

  return { initializeContract };
}

export default useContract;
