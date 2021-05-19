const chai = require('chai')
    , expect = chai.expect
    , should = chai.should();

const { BN, expectEvent, expectRevert, singletons, constants } = require('@openzeppelin/test-helpers');
const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

// Enable and inject BN dependency
chai.use(require('chai-bn')(BN));

const BeagleCoin = artifacts.require("BeagleCoin");
const BeagleCoinV2 = artifacts.require("BeagleCoin");

/* describe("Upgrade test", function() {
    it("upgrades successfully", async function() {
      // Deploy V1 and set initial value
      const BeagleCoinV1 = await ethers.getContractFactory("BeagleCoin");
      const instance = await upgrades.deployProxy(BeagleCoinV1);
      await instance.initialize("0xaa51546B5286500a698CcEcC0D09605054c43B17");
      expect((await instance.poolAddress()).toString()).to.equal("0xaa51546B5286500a698CcEcC0D09605054c43B17");
  
      // Upgrade to V2 and check value
      const BoxV2 = await ethers.getContractFactory("BeagleCoin");
      const upgraded = await upgrades.upgradeProxy(instance.address, BoxV2);
      expect((await upgraded.poolAddress()).toString()).to.equal("0xaa51546B5286500a698CcEcC0D09605054c43B17");
  
      // Verify that new implementation works as expected
      //await upgraded.increase();
      //expect((await upgraded.value()).toString()).to.equal('43');
    });
  }); */

describe('Upgrade', function () {
    /* it('works before and after upgrading', async function () {
        return;
        // Deploy V1 and set initial value
        const instance = await deployProxy(BeagleCoin, ["0xaa51546B5286500a698CcEcC0D09605054c43B17"]);
        assert.strictEqual(await instance.poolAddress(), "0xaa51546B5286500a698CcEcC0D09605054c43B17");

        //console.log("ADD", await instance.poolAddress())

        // Upgrade to V2 and check value - confirms the old functionality still works
        await upgradeProxy(instance.address, BeagleCoinV2);
        assert.strictEqual(await instance.poolAddress(), "0xaa51546B5286500a698CcEcC0D09605054c43B17");
        //console.log("ADD /a", await instance.poolAddress())
    }); */


    /**
     * @dev add tests later for the upgraded functionality (if an upgrade comes in the future)
     */
    /* it('new functionality works', async function () {
        //todo-me add tests later for upgrade functionality
    });
 */
});