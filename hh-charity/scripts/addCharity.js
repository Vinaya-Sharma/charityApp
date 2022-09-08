const { ethers, getNamedAccounts, deployments } = require("hardhat");

async function addCharity() {
  console.log("creating charity...");
  const Charity = await ethers.getContract("Charity");

  const tx = await Charity.createCharity(
    "krish",
    "fund krish toys",
    ethers.utils.parseEther("1"),
    "https://i.ytimg.com/vi/XjcIOhMjy5k/maxresdefault.jpg"
  );

  await tx.wait(1);
  console.log("------------");
}

addCharity()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
