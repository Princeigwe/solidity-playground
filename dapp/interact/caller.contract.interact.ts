import { ethers } from "ethers";
import { callerContractAbi } from "../abis/caller.contract.abi";

const dotenv = require("dotenv")
dotenv.config()

const providerUrl = process.env.PROVIDER_URL || "http://localhost:8545";
const provider = new ethers.JsonRpcProvider(providerUrl);

const callerContractAddress = `0x5FC8d32690cc91D4c39d9d3abcBD16989F875707`

const hardhatPrivateKey = `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

const eoAddressPrivateKey = process.env.WALLET_PRIVATE_KEY || hardhatPrivateKey;
const wallet = new ethers.Wallet(eoAddressPrivateKey, provider);

const callerContract = new ethers.Contract(callerContractAddress, callerContractAbi, wallet);


async function callIncrement() {
  try {
    await callerContract.callIncrement();
    console.log("Increment called successfully");
  } catch (error) {
    console.error("Error calling increment:", error)
  }
}


async function callWrongFunction() {
  try {
    await callerContract.callWrongFunction();
    console.log("Expecting successful response");
  } catch (error) {
    console.log("Error calling wrong function:", error)
  }
}

async function getPopulation() {
  try {
    const population = await callerContract.getPopulation();
    console.log("Population:", population.toString());
  } catch (error) {
    console.error("Error getting population:", error)
  }
}

async function delegateCallIncrement() {
  try {
    await callerContract.delegateCallIncrement();
    console.log("Increment called successfully");
  } catch (error) {
    console.error("Error calling increment:", error)
  }
}

// callIncrement()
// callWrongFunction()
getPopulation()
// delegateCallIncrement()