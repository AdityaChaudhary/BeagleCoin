
const HDWalletProvider = require("@truffle/hdwallet-provider");

require('./utils/dotenv').configImport();

const { ALCHEMY_API_URL, INFURA_API_KEY, MNEMONIC, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

console.log("CONFIG", ALCHEMY_API_URL, MNEMONIC);


// 12-word mnemonic
//const mnemonicPhrase = process.env.MNEMONIC_PHRASE;


module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  compilers: {
    solc: {
      version: "^0.8.4", // A version or constraint - Ex. "^0.5.0"
      // Can also be set to "native" to use a native solc
      parser: "solcjs",  // Leverages solc-js purely for speedy parsing
      settings: {
        optimizer: {
          enabled: true,
          runs: 200   // Optimize for how many times you intend to run the code
        },
      },
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      /* provider: function () {
        return new HDWalletProvider(MNEMONIC, "ws://127.0.0.1:7545/");
      }, */
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider({
          privateKeys: [PRIVATE_KEY],
          providerOrUrl: INFURA_API_KEY
        })
      },
      network_id: '3',
      gas: 4000000 //4M is the max
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: ETHERSCAN_API_KEY
  }


};
