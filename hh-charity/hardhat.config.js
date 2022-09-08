require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");

const rinkebyRPC = process.env.RINKEBY_RPC || "";
const accountKey = process.env.ACCOUNT_KEY || "";
const etherscanKey = process.env.ETHERSCAN_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.9",
  networks: {
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    rinkeby: {
      url: rinkebyRPC,
      chainId: 4,
      accounts: [accountKey],
      blockConfirmations: 5,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
    player: {
      default: 1,
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: etherscanKey,
    },
  },
  mocha: {
    timeout: 20000, // 200 seconds max for running tests
  },
};
