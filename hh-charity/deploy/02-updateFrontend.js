const fs = require("fs");
const { ethers, network } = require("hardhat");

const abiPath = "../charitynext/constants/abi.json";
const addressPath = "../charitynext/constants/address.json";

module.exports = async () => {
  if (process.env.UPDATE_FRONTEND == "true") {
    await updateAbi();
    await updateAddresses();
  }
};

async function updateAbi() {
  const contract = await ethers.getContract("Charity");
  const theAbi = contract.interface.format(ethers.utils.FormatTypes.json);
  fs.writeFileSync(abiPath, theAbi);
}

async function updateAddresses() {
  const contract = await ethers.getContract("Charity");
  const chainID = network.config.chainId;
  const fileData = JSON.parse(fs.readFileSync(addressPath, "utf-8"));

  fileData[chainID] = contract.address;
  fs.writeFileSync(addressPath, JSON.stringify(fileData));
}

module.exports.tags = ["all", "frontend"];
