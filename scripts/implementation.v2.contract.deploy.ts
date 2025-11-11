import hre from 'hardhat'

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const ImplementationV2 = await hre.ethers.deployContract("ImplementationV2");

  const implementationV2Contract = await ImplementationV2.waitForDeployment()
  console.log("ImplementationV2 deployed to:", await implementationV2Contract.getAddress());
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});