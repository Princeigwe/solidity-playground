import { ethers } from "ethers";
import { proxyAbi } from "../abis/proxy.abi";
import { implementationAbi } from "../abis/implementation.abi";
import { implementationV2Abi } from "../abis/implementation.v2.abi";


const dotenv = require("dotenv")
dotenv.config()

// encoding the implementation function signature of "incrementPopulation()" as calldata for v1 of Implementation contract
const implementationV1Interface = new ethers.Interface(implementationAbi)
const incrementPopulationCallData = implementationV1Interface.encodeFunctionData("incrementPopulation");
const getPopulationCallData = implementationV1Interface.encodeFunctionData("getPopulation");



const implementationV2Interface = new ethers.Interface(implementationV2Abi)
const multiplyPopulationBy2CallData = implementationV2Interface.encodeFunctionData("multiplyPopulationBy2");
const getPopulationV2CallData = implementationV2Interface.encodeFunctionData("getPopulation");



const providerUrl = process.env.PROVIDER_URL || "http://localhost:8545";
const provider = new ethers.JsonRpcProvider(providerUrl);

// const proxyContractAddress = `0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82`
const proxyContractAddress = process.env.PROXY
const implementationV1Address = process.env.IMPLEMENTATION
const implementationV2Address = process.env.IMPLEMENTATION_V2


if (!proxyContractAddress) {
  console.error("Error: PROXY environment variable not set. Please check your .env file.");
  process.exit(1);
}

if (!implementationV1Address) {
  console.error("Error: IMPLEMENTATION environment variable not set. Please check your .env file.");
  process.exit(1);
}

if (!implementationV2Address) {
  console.error("Error: IMPLEMENTATION_V2 environment variable not set. Please check your .env file.")
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


async function multiplyPopulationBy2() {
  const tx = {
    to: proxyContractAddress,
    data: multiplyPopulationBy2CallData,
  }

  try {
    const transactionResponse = await wallet.sendTransaction(tx)
    console.log("Transaction hash:", transactionResponse.hash);
  
    await transactionResponse.wait();
    console.log("Multiply called successfully")
  } catch (error) {
    console.error("Error delegating call to multiplyPopulationBy2:", error)
  }
}


async function getPopulation() {
  const tx = {
    to: proxyContractAddress,
    // data: getPopulationCallData,
    data: getPopulationV2CallData // ABI encoded value from the updated contract
  }

  try {
    //  using "provider.call" is best for interacting with view/pure functions which doesn't send a transaction
    const result = await provider.call(tx);
    // decoding ABI encoded result 
    const decodedResult = implementationV1Interface.decodeFunctionResult("getPopulation", result);
    console.log("Population:", decodedResult[0].toString());
  } catch (error) {
    console.error("Error getting population:", error)
  }
}


// incrementPopulation()
// multiplyPopulationBy2()
getPopulation()
// setImplementation(implementationV2Address)