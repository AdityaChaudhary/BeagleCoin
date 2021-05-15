const BeagleCoin = artifacts.require("BeagleCoin");
const BN = web3.utils.BN;

let DECIMAL = new BN(1E8)
let TOTAL_SUPPLY = new BN(1E9).mul(DECIMAL) //1E9*1E8

contract('BeagleCoin', (accounts) => {
    it('should put 1Billion BeagleCoin in the first account', async () => {
        const beagleCoinInstance = await BeagleCoin.deployed();
        const balance = new BN(await beagleCoinInstance.balanceOf.call(accounts[0]));

        //console.log('TOTAL_SUPPLY', TOTAL_SUPPLY.toString(), balance.toString())
        //console.log('Balance1', (balance/1E8).toString())
        //console.log('Balance2', balance.div(DECIMAL).toString(), TOTAL_SUPPLY.div(DECIMAL).toString())
        //assert.equal(balance, TOTAL_SUPPLY, "1B wasn't in the first account");
        expect(balance).to.eql(TOTAL_SUPPLY, "1B wasn't in the first account");
    });


    it('should have 1B coins in cirulation', async () => {
        const beagleCoinInstance = await BeagleCoin.deployed();
        const totalSupply = new BN(await beagleCoinInstance.totalSupply.call());

        //console.log("Circulation", totalSupply.toString(), TOTAL_SUPPLY.toString())
        expect(totalSupply).to.eql(TOTAL_SUPPLY, "1B wasn't in the first account");
        //assert.equal(totalSupply.valueOf(), 1000000000*10^8, "10000 wasn't the total supply. " + totalSupply.valueOf());
    });


    it('should transfer coins correctly', async () => {
        const beagleCoinInstance = await BeagleCoin.deployed();
        // Setup 3 accounts.
        const accountOne = accounts[0];
        const accountTwo = accounts[1];
        const accountThree = accounts[2];

        // Get initial balances of first and second account.
        const accountOneStartingBalance = new BN(await beagleCoinInstance.balanceOf.call(accountOne));
        const accountTwoStartingBalance = new BN(await beagleCoinInstance.balanceOf.call(accountTwo));
        const accountThreeStartingBalance = new BN(await beagleCoinInstance.balanceOf.call(accountThree));

        // Make transaction from first account to second.
        const amount = new BN(100.99717651).mul(DECIMAL);
        const amount2 = new BN(995.541926).mul(DECIMAL);

        await beagleCoinInstance.transfer(accountTwo, amount.toString(), { from: accountOne });
        await beagleCoinInstance.transfer(accountThree, amount2.toString(), { from: accountOne });

        // Get balances of first and second account after the transactions.
        const accountOneEndingBalance = new BN(await beagleCoinInstance.balanceOf.call(accountOne));
        const accountTwoEndingBalance = new BN(await beagleCoinInstance.balanceOf.call(accountTwo));
        const accountThreeEndingBalance = new BN(await beagleCoinInstance.balanceOf.call(accountThree));

        console.log("ACC ", accountOneEndingBalance.toString(), accountOneEndingBalance.sub(amount.add(amount2)).toString())

        let amountReflected = amount.div(100)
        let amount2Reflected = amount2.mul(5)

        //converting to 2 string as .add function is somehow modifying the deep structure of BN making them unequal
        assert.equal(accountOneEndingBalance.toString(), accountOneStartingBalance.sub(amount.add(amount2)).toString(), "Amount wasn't correctly taken from the sender");
        assert.equal(accountTwoEndingBalance.toString(), accountTwoStartingBalance.add(amountReflected).toString(), "Amount wasn't correctly sent to the receiver - Account 2");
        assert.equal(accountThreeEndingBalance.toString(), accountThreeStartingBalance.add(amount2Reflected).toString(), "Amount wasn't correctly sent to the receiver - Account 3");

        //console.log("ACC 3", accountThreeEndingBalance)
        //console.log("ACC 3+", accountThreeStartingBalance.add(amount2))
        //expect(accountThreeEndingBalance).to.eql(accountThreeStartingBalance.add(amount2), "Amount wasn't correctly sent to the receiver - Account 3");
    });


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