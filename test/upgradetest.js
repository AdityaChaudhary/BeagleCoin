const BeagleCoin = artifacts.require("BeagleCoin");
const BeagleCoinV2 = artifacts.require("BeagleCoinV2");
//const BN = web3.utils.BN;

const { upgradeProxy, deployProxy } = require('@openzeppelin/truffle-upgrades');

//let DECIMAL = new BN(1E8)
//let TOTAL_SUPPLY = new BN(1E9).mul(DECIMAL) //1E9*1E8

contract('BeagleCoin', async (accounts) => {
    it('works before and after upgrading', async function () {
        const instance = await deployProxy(BeagleCoin, ["0xaa51546B5286500a698CcEcC0D09605054c43B17"]);
        console.log("v1",await instance.version() )
        assert.strictEqual(await instance.version(), "1.0");
      
        await upgradeProxy(instance.address, BeagleCoinV2);
        console.log("vv",await instance.vv())
        assert.strictEqual(await instance.vv(), "hello");
      });
    
});