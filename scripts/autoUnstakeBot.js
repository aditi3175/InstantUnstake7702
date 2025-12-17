const hre = require("hardhat");

const STAKING = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const SMART = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const USER = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const provider = hre.ethers.provider;

  const staking = await hre.ethers.getContractAt("Staking", STAKING);
  const smart = await hre.ethers.getContractAt("SmartAccount7702", SMART);

  const [user] = await hre.ethers.getSigners();
  console.log("Bot acting for user:", user.address);

  while (true) {
    const unlockTime = await staking.getUnlockTime(USER);
    const block = await provider.getBlock("latest");
    const now = block.timestamp;

    console.log("Now:", now, "| Unlock at:", unlockTime.toString());

    if (now >= unlockTime && unlockTime > 0) {
      console.log("✅ Eligible — sending unstake tx...");

      const tx = await smart.connect(user).delegatedUnstake(STAKING);
      const receipt = await tx.wait();

      console.log("🎉 Unstaked!");
      console.log("Tx hash:", receipt.hash);
      console.log("Block:", receipt.blockNumber);
      break;
    }

    await provider.send("evm_mine");
    await sleep(1000);
  }
}

main().catch(console.error);
