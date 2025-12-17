const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Deploy TestToken
  const TestToken = await hre.ethers.getContractFactory("TestToken");
  const token = await TestToken.deploy(hre.ethers.parseEther("1000000"));
  await token.waitForDeployment();
  console.log("TestToken:", await token.getAddress());

  // Deploy Staking
  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(await token.getAddress());
  await staking.waitForDeployment();
  console.log("Staking:", await staking.getAddress());

  // Deploy SmartAccount
  const SmartAccount = await hre.ethers.getContractFactory("SmartAccount7702");
  const smartAccount = await SmartAccount.deploy(deployer.address);
  await smartAccount.waitForDeployment();
  console.log("SmartAccount:", await smartAccount.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
