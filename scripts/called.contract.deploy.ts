import hre from 'hardhat'

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const CalledContract = await hre.ethers.deployContract("CalledContract");

  const calledContract = await CalledContract.waitForDeployment()
  console.log("CalledContract deployed to:", await calledContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

