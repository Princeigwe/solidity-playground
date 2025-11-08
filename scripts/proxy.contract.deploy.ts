import hre from 'hardhat'

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Proxy = await hre.ethers.deployContract("Proxy");

  const proxyContract = await Proxy.waitForDeployment()
  console.log("Proxy deployed to:", await proxyContract.getAddress());
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});