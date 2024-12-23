import { ethers } from "ethers";

import abi from "../public/data/abi";
import erc20Abi from "../public/data/erc20Abi";
export const contractAddress = "0x9aa189e9Fb830aFAA17AAA41F8b02ff0E47A381F";

function useContract() {
  const contract = ref(null);

  async function initializeErc20Contract(contractAddress) {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        contract.value = new ethers.Contract(contractAddress, erc20Abi, signer);

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

  return { initializeContract,initializeErc20Contract };
}

export default useContract;
