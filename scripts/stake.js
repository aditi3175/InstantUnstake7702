const hre = require("hardhat");

const TOKEN = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const STAKING = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  const [user] = await hre.ethers.getSigners();

  const token = await hre.ethers.getContractAt("TestToken", TOKEN);
  const staking = await hre.ethers.getContractAt("Staking", STAKING);

  const amount = hre.ethers.parseEther("100");

  await token.approve(STAKING, amount);
  console.log("Approved");

  const tx = await staking.stake(amount);
  await tx.wait();

  const unlock = await staking.getUnlockTime(user.address);
  console.log("Staked. Unlock time:", unlock.toString());
}

main().catch(console.error);
