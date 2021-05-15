pragma solidity >=0.4.25 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BeagleCoin.sol";

contract TestBeagleCoin {
    uint256 TOTAL_SUPPLY = 10**9 * 10**uint256(8);

    /* function testInitialBalanceUsingDeployedContract() public {
        BeagleCoin beagle = BeagleCoin(DeployedAddresses.BeagleCoin());

        //uint expected = 10**9 * 10**uint256(8);

        Assert.equal(
            beagle.balanceOf(tx.origin),
            TOTAL_SUPPLY,
            "Owner should have 1B BeagleCoin initially"
        );
    }

    function testInitialBalanceWithNewBeagleCoin() public {
        BeagleCoin beagle = new BeagleCoin();
        beagle.initialize(0xaa51546B5286500a698CcEcC0D09605054c43B17);

        //uint256 expected = 10**9 * 10**uint256(8);

        Assert.equal(
            beagle.balanceOf(tx.origin),
            TOTAL_SUPPLY,
            "Owner should have 1B MetaCoin initially"
        );
    } */

    function testTokenTransferFromAdmin() public {
        address pool = 0xaa51546B5286500a698CcEcC0D09605054c43B17;
        address to = 0xB9862f6E2A9e38206066A0F0426B4718931C0f02;

        BeagleCoin beagle = new BeagleCoin();
        beagle.initialize(pool);

        uint256 amount = 10008511 ** 10**uint256(4);

        uint256 originalAdminBalance = beagle.balanceOf(tx.origin);

        beagle.transferFrom(tx.origin, to, amount);

        uint256 afterAdminBalance = beagle.balanceOf(tx.origin);

        Assert.equal(originalAdminBalance, afterAdminBalance + amount, "Transfer value not confirmed");

    }
}

