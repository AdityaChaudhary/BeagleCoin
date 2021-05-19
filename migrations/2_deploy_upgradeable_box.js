// migrations/NN_deploy_upgradeable_box.js
//const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const path = require('path');

require('@openzeppelin/test-helpers/configure')({
  provider: web3.currentProvider,
  environment: 'truffle'
});

const { singletons } = require('@openzeppelin/test-helpers');


const dotenv = require('../utils/dotenv');
dotenv.configImport(undefined, dotenv.getParentDir(__dirname));

//const Box = artifacts.require('Box');
const BeagleCoin = artifacts.require("BeagleCoin");

module.exports = async function (deployer, network, accounts) {

  console.log("[#] Network", network);

  if (network === 'development' || network === 'test') {
    await singletons.ERC1820Registry(accounts[0]);
  }

  const instance = await deployer.deploy(BeagleCoin);
  //const instance = await deployProxy(BeagleCoin, [process.env.POOL_ADDRESS], { deployer });
  //console.log('Deployed', instance.address);
};