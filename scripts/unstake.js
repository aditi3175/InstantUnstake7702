const hre = require("hardhat");

const STAKING = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const SMART = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const smart = await hre.ethers.getContractAt("SmartAccount7702", SMART);

  const tx = await smart.delegatedUnstake(STAKING);
  const receipt = await tx.wait();

  console.log("Unstake tx:", receipt.hash);
  console.log("Block:", receipt.blockNumber);
}

main().catch(console.error);
