var BeagleCoin = artifacts.require("BeagleCoin.sol");
var solc = require('solc');

module.exports = function(callback) {

    BeagleCoin.web3.eth.getGasPrice(function(error, result){ 
        var gasPrice = Number(result);
        console.log("Gas Price is " + gasPrice + " wei"); // "10000000000000"

        var BeagleCoinContract = new web3.eth.Contract(BeagleCoin._json.abi);
        var contractData = BeagleCoinContract.getData({data: BeagleCoin._json.bytecode});
        var gas = Number(web3.eth.estimateGas({data: contractData}))


        console.log("gas estimation = " + gas + " units");
        console.log("gas cost estimation = " + (gas * gasPrice) + " wei");
        console.log("gas cost estimation = " + MetaCoin.web3.fromWei((gas * gasPrice), 'ether') + " ether");

    });
};