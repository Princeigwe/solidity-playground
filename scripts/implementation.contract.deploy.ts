import hre from 'hardhat'

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Implementation = await hre.ethers.deployContract("Implementation");

  const implementationContract = await Implementation.waitForDeployment()
  console.log("Implementation deployed to:", await implementationContract.getAddress());
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});