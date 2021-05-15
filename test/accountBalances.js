const BeagleCoin = artifacts.require("BeagleCoin");
const BN = web3.utils.BN;

let DECIMAL = new BN(1E8)
let TOTAL_SUPPLY = new BN(1E9).mul(DECIMAL) //1E9*1E8

contract('BeagleCoin', async (accounts) => {

    it('display all balances', async () => {
        const beagleCoinInstance = await BeagleCoin.deployed();

        console.log("TOTAL SUPPLY", TOTAL_SUPPLY.toString())

        let total_supply = new BN(0)
        //let count = 0

        for (let index = 0; index < accounts.length; index++) {
            let account = accounts[index]
            let balance = new BN(0), whole = new BN(0), decimal = new BN(0)
            try {
                balance = new BN(await beagleCoinInstance.balanceOf.call(account))
                whole = balance.div(DECIMAL)
                decimal = balance.sub(whole.mul(DECIMAL))

                //console.log(`adding ${count}: ${balance} to ${total_supply}`)
                total_supply = total_supply.add(balance)
                //count += 1
            } catch {
            }
            console.log('[#] Account', index, account, `${whole}.${decimal}  || `, balance.toString())
            //web3.utils.toBN(balance), web3.fromWei(await web3.eth.getBalance(account)))
        }

        console.log("SUPPLY", total_supply.toString())
        expect(TOTAL_SUPPLY.toString()).to.eql(total_supply.toString(), "Total Supply Mismatch!!");
    });

});