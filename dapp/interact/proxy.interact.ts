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

// const proxyContractAddress = `0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82`
const proxyContractAddress = process.env.PROXY
const implementationAddress = process.env.IMPLEMENTATION

if (!proxyContractAddress) {
  console.error("Error: PROXY environment variable not set. Please check your .env file.");
  process.exit(1);
}

if (!implementationAddress) {
  console.error("Error: IMPLEMENTATION  environment variable not set. Please check your .env file.");
  process.exit(1);
}

const hardhatPrivateKey = `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

const eoAddressPrivateKey = process.env.WALLET_PRIVATE_KEY || hardhatPrivateKey;
const wallet = new ethers.Wallet(eoAddressPrivateKey, provider);

const proxyContract = new ethers.Contract(proxyContractAddress, proxyAbi, wallet);

async function setImplementation(implAddr: string) {
  const tx = await proxyContract.setImplementation(implAddr);
  await tx.wait();
  console.log("Implementation set successfully")
}

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
    //  using "provider.call" is best for interacting with view/pure functions which doesn't send a transaction
    const result = await provider.call(tx);
    // decoding ABI encoded result 
    const decodedResult = iFace.decodeFunctionResult("getPopulation", result);
    console.log("Population:", decodedResult[0].toString());
  } catch (error) {
    console.error("Error getting population:", error)
  }
}


// incrementPopulation()
getPopulation()
// setImplementation(implementationAddress)