import { ethers } from "ethers";

import abi from "../public/data/abi";
const contractAddress = "0xed9061a79A1eb53Fa5D45f879665Ce1cAc61104E";

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

        console.log(
          "The smart contract has been successfully renewed. :",
          contract.value
        );
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
