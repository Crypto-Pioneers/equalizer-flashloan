import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "@openzeppelin/hardhat-upgrades";
import "solidity-coverage";

const config = {
  // defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/Jx0noqyrJNYrfVoBk97uQFJ_OlgL2juD",
      accounts: ['']
    },
    goerli: {
      url: "https://goerli.infura.io/v3/7b469035cb45417084f3f4433f10a8ae",
      accounts: ['']
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/9262ebaabe4842b392b39b54cda79f9b",
      accounts: ['']
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      accounts: ['']
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: {
      sepolia: "SCYJEQWSS2B48PZXSK3SK9MEVMW48GB1KY",
      bsc: "97YT7B9BK38JAFM7TFB3K2M747TXX4ZAAE"
    },
  },
}

module.exports = config;
