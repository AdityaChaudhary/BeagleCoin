// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

import "./ERC20.sol";

contract BeagleCoin is ERC20 {
    
    /* Public variables of the token */
    string private _name;                   //fancy name: eg Simon Bucks
    uint8 private _decimals;                //How many decimals to show. ie. There could 1000 base units with 3 decimals. Meaning 0.980 SBX = 980 base units. It's like comparing 1 wei to 1 ether.
    string private _symbol;                 //An identifier: eg BEAGLE
    string public version = '0.8';       //Just an arbitrary versioning scheme.
    address public owner;


    //donation account - account where 2% of transaction token goes
    //gas account - 1% of trasaction token goes
    //burn account - 1 % of transaction token goes
    //lottery account - 1% of transaction token goes
    /**
     * @param poolAddr The address to send the 4% change to
     */
    constructor(address poolAddr) 
    ERC20(tx.origin, poolAddr) public{

        owner = tx.origin; //set the owner of the contract

        _name = "Beagle";
        _decimals = 8;
        _symbol = "BEAGLE";

        _totalSupply = 10**9 * 10**uint(_decimals);  //1 billion tokens with 8 decimal places
		_balances[tx.origin] = _totalSupply; 
	}

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory){
        return _symbol;
    }

    function decimals() public view returns (uint8){
        return _decimals;
    }

}
