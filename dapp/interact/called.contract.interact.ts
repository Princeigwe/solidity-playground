import { ethers } from "ethers";
import { calledContractAbi } from "../abis/called.contract.abi";

const dotenv = require("dotenv")
dotenv.config()

const providerUrl = process.env.PROVIDER_URL || "http://localhost:8545";
const provider = new ethers.JsonRpcProvider(providerUrl);

const calledContractAddress = `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`

const hardhatPrivateKey = `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

const eoAddressPrivateKey = process.env.WALLET_PRIVATE_KEY || hardhatPrivateKey;
const wallet = new ethers.Wallet(eoAddressPrivateKey, provider);

const calledContract = new ethers.Contract(calledContractAddress, calledContractAbi, wallet);

async function getPopulation() {
  try {
    const population = await calledContract.getPopulation();
    console.log("Population:", population.toString());
  } catch (error) {
    console.error("Error getting population:", error)
  }
}


getPopulation()