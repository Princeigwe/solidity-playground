import { ethers } from "ethers";
import { proxyAbi } from "../abis/proxy.abi";
import { implementationAbi } from "../abis/implementation.abi";


const dotenv = require("dotenv")
dotenv.config()

// encoding the implementation function signature of "incrementPopulation()" as calldata
const iFace = new ethers.Interface(implementationAbi)

const incrementPopulationCallData = iFace.encodeFunctionData("incrementPopulation");
const getPopulationCallData = iFace.encodeFunctionData("getPopulation");



const providerUrl = process.env.PROVIDER_URL || "http://localhost:8545";
const provider = new ethers.JsonRpcProvider(providerUrl);

const proxyContractAddress = `0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9`

const hardhatPrivateKey = `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

const eoAddressPrivateKey = process.env.WALLET_PRIVATE_KEY || hardhatPrivateKey;
const wallet = new ethers.Wallet(eoAddressPrivateKey, provider);

const proxyContract = new ethers.Contract(proxyContractAddress, proxyAbi, wallet);

async function incrementPopulation() {
  const tx = {
    to: proxyContractAddress,
    data: incrementPopulationCallData,
  }

  try {
    // sending transaction to non-existing function will redirects to the fallback function
    const transactionResponse = await wallet.sendTransaction(tx);
    console.log("Transaction hash:", transactionResponse.hash);
  
    await transactionResponse.wait();
    console.log("Increment called successfully");
  } catch (error) {
    console.error("Error delegating call to incrementPopulation:", error)
  }
}


async function getPopulation() {
  const tx = {
    to: proxyContractAddress,
    data: getPopulationCallData,
  }

  try {
    // sending transaction to non-existing function will redirects to the fallback function
    const transactionResponse = await wallet.sendTransaction(tx);
    console.log("Transaction hash:", transactionResponse.hash);

    const result = await transactionResponse.wait();
    const response = result
    console.log("Population:", response);
  } catch (error) {
    console.error("Error getting population:", error)
  }
}


// incrementPopulation()
getPopulation()