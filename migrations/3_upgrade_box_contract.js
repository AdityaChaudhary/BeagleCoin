// migrations/MM_upgrade_box_contract.js
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

//const Box = artifacts.require('Box');
const BeagleCoin = artifacts.require("BeagleCoin");
const BeagleCoinV2 = artifacts.require('BeagleCoinV2');

module.exports = async function (deployer) {
  const existing = await BeagleCoin.deployed();
  const instance = await upgradeProxy(existing.address, BeagleCoin, { deployer });
  console.log("Upgraded", instance.address, existing.address);
};