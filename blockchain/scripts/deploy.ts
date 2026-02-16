import { ethers } from "hardhat";

async function main() {
  console.log("Deploying RootsRegistry contract...");

  const RootsRegistry = await ethers.getContractFactory("RootsRegistry");
  const rootsRegistry = await RootsRegistry.deploy();

  await rootsRegistry.waitForDeployment();

  const address = await rootsRegistry.getAddress();
  console.log(`RootsRegistry deployed to: ${address}`);
  console.log("\nSave this address to your .env file:");
  console.log(`CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
