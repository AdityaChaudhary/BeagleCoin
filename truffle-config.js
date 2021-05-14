const HDWalletProvider = require("@truffle/hdwallet-provider");


// 12-word mnemonic
const mnemonicPhrase = "scan knock indicate extend maid thunder next bargain weather purity route double"; // 12 word mnemonic


module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      /* provider: function () {
        return new HDWalletProvider(mnemonicPhrase, "ws://127.0.0.1:7545/");
      }, */
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonicPhrase, "https://ropsten.infura.io/v3/86af9f2405214f71a338b0035df5a074");
      },
      network_id: '3',
    },
  }

};
