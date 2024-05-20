import { ethers } from "hardhat";
import { Flashloanbot, Flashloanbot__factory } from "../typechain";

async function main() {

  const flashloanProvider = "0xEe7e961f77066c5E995615ae7e7E8e4366d9eC5A";  


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
