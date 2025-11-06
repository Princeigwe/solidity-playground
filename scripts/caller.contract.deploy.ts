import hre from 'hardhat'

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const CallerContract = await hre.ethers.deployContract("CallerContract");

  const callerContract = await CallerContract.waitForDeployment()
  console.log("CallerContract deployed to:", await callerContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

