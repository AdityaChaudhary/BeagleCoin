// migrations/NN_deploy_upgradeable_box.js
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

//const Box = artifacts.require('Box');
const BeagleCoin = artifacts.require("BeagleCoin");

module.exports = async function (deployer) {
  const instance = await deployProxy(BeagleCoin, ["0xaa51546B5286500a698CcEcC0D09605054c43B17"], { deployer });
  console.log('Deployed', instance.address);
};