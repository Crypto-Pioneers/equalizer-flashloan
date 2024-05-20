import { ethers } from "hardhat";
import { Flashloanbot, Flashloanbot__factory } from "../typechain";

async function main() {

  const flashloanProvider = "0x4EAF187ad4cE325bF6C84070b51c2f7224A51321";


  const flashloanbotFactory: Flashloanbot__factory = await ethers.getContractFactory("Flashloanbot") as Flashloanbot__factory;
  const flashloanbot: Flashloanbot = await flashloanbotFactory.deploy(flashloanProvider);
  await flashloanbot.deployed();
  

  console.log("contract deployed to:", flashloanbot.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
