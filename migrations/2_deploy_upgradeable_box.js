// migrations/NN_deploy_upgradeable_box.js
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

require('@openzeppelin/test-helpers/configure')({
  provider: web3.currentProvider,
  environment: 'truffle'
});

const { singletons } = require('@openzeppelin/test-helpers');


//const Box = artifacts.require('Box');
const BeagleCoin = artifacts.require("BeagleCoin");

module.exports = async function (deployer, network, accounts) {
  if (network === 'development' || network === 'test') {
    await singletons.ERC1820Registry(accounts[0]);
  }

  const instance = await deployProxy(BeagleCoin, ["0xaa51546B5286500a698CcEcC0D09605054c43B17"], { deployer });
  console.log('Deployed', instance.address);
};