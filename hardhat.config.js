require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");
const projectId = process.env.API_KEY
const privateKey = process.env.KEY
const bscscanApiKey = process.env.BSC


module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    bsctestnet: {
      url: `https://bsc.getblock.io/testnet/?api_key=${projectId}`,
      accounts: [privateKey]
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [privateKey]
    }
  },
  etherscan: {
    apiKey: bscscanApiKey
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
