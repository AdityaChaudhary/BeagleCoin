//To test the Contract Upgrade process

const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');


//const Box = artifacts.require('Box');
//const BoxV2 = artifacts.require('BoxV2');
const BeagleCoin = artifacts.require("BeagleCoin");
//const BeagleCoinV2 = artifacts.require("BeagleCoinv2");

describe('upgrades', () => {
  it('should have different transaction hashes', async () => {
    const beagleCoin = await deployProxy(BeagleCoin, ["0xaa51546B5286500a698CcEcC0D09605054c43B17"]);
    const beagleCoinV2 = await upgradeProxy(beagleCoin.address, BeagleCoin);

    //const value = await beagleCoinV2.value();
    assert.notEqual(beagleCoinV2.transactionHash, beagleCoin.transactionHash, "Upgrade transaction hash matches. Something is wrong!")
    //assert.equal(beagleCoin.address, beagleCoinV2.address, "Coin address mismatch!")
  });

  it('should have same address', async () => {
    const beagleCoin = await deployProxy(BeagleCoin, ["0xaa51546B5286500a698CcEcC0D09605054c43B17"]);
    const beagleCoinV2 = await upgradeProxy(beagleCoin.address, BeagleCoin);

    //const value = await beagleCoinV2.value();
    //assert.notEqual(beagleCoinV2.transactionHash, beagleCoin.transactionHash, "Upgrade transaction hash matches. Something is wrong!")
    assert.equal(beagleCoin.address, beagleCoinV2.address, "Coin address mismatch!")
  });

});