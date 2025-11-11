import hre from 'hardhat'

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // deploying contract with address as the constructor value
  const Proxy = await hre.ethers.getContractFactory("Proxy");
  const proxy = await Proxy.deploy(deployer.address);

  const proxyContract = await proxy.waitForDeployment()
  console.log("Proxy deployed to:", await proxyContract.getAddress());
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});