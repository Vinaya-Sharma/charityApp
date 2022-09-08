const { network } = require("hardhat");
const hre = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("---------------------------------------");

  const Charity = await deploy("Charity", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: network.config.blockConfirmations || "1",
  });

  if (!developmentChains.includes(network.config.chainId)) {
    log("verifying..........");
    await verify(Charity.address, []);
  }

  log("contract deployed at ", Charity.address);
};

module.exports.tags = ["all", "deploy"];
