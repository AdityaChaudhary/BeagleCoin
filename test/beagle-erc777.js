// Based on https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/test/examples/SimpleToken.test.js

//const { accounts, contract } = require('@openzeppelin/test-environment');
const chai = require('chai')
    , expect = chai.expect
    , should = chai.should();

const { BN, expectEvent, expectRevert, singletons, constants } = require('@openzeppelin/test-helpers');
// Enable and inject BN dependency
chai.use(require('chai-bn')(BN));

//const console = require('console');
//const BN = require('bn.js');
/* require('@openzeppelin/test-helpers/configure')({
    provider: web3.currentProvider,
    singletons: {
        abstraction: 'truffle',
    },
}); */


//const console = require('console');
const { ZERO_ADDRESS } = constants;

const BeagleCoin = artifacts.require("BeagleCoin");

contract('BeagleCoin', function (accounts) {

    //const [registryFunder, _, defaultOperatorA, defaultOperatorB, newOperator, anyone] = accounts;
    const [registryFunder, holder, defaultOperatorA, defaultOperatorB, newOperator, anyone] = accounts;

    const defaultOperators = [defaultOperatorA, defaultOperatorB];



    const creator = accounts[0];
    const initialSupply = new BN('10000000000000000000000000000');

    const poolAddr = "0xaa51546B5286500a698CcEcC0D09605054c43B17";


    beforeEach(async function () {
        this.erc1820 = await singletons.ERC1820Registry(registryFunder);
        this.token = await BeagleCoin.new({ from: creator });
        this.token.initialize(poolAddr);
    });

    /*  it('contract created', async function(){
         expect(await this.token.owner()).to.equal(creator);
 
         await expectEvent.inConstruction(this.token, 'ContractCreated');
     }); */

    describe('Basic Information', function () {
        it('total supply is 10 Billion', async function () {
            let total = await this.token.totalSupply();
            //console.log("TOTAL Supply ", total.toString());
            //console.log("TOTAL Supply ", total.toString() == (new BN('10000000000000000000000000000')).toString());
            initialSupply.should.be.bignumber.equal(total);
            //expect(total.toString()).to.eql((new BN('10000000000000000000000000000')).toString()); // compare to BigNumber

        });

        it('has a name: Beagle', async function () {
            let name = await this.token.name.call();
            //console.log("Token Name", name);
            (await this.token.name()).should.equal('Beagle');
        });

        it('has a symbol: BEAGLE', async function () {
            (await this.token.symbol()).should.equal('BEAGLE');
        });

        it('assigns the initial total supply to the creator', async function () {
            const totalSupply = await this.token.totalSupply();
            const creatorBalance = await this.token.balanceOf(creator);

            //console.log("Creator", creator)

            creatorBalance.should.be.bignumber.equal(totalSupply, "Balance not matching");

            /* let eventExpected = {
                from: ZERO_ADDRESS,
                to: creator,
                value: totalSupply,
            };
            console.log("Expected Event", eventExpected, eventExpected, this.token.transactionHash);
            await expectEvent.inConstruction(this.token, 'Transfer', eventExpected); */
        });


        /* it('default operators are operators for all accounts', async function () {
            for (const operator of defaultOperators) {
              expect(await this.token.isOperatorFor(operator, anyone)).to.equal(true);
            }
          }); */

    });

    describe('Burn', function () {
        it('allows operator burn', async function () {
            const creatorBalance = await this.token.balanceOf(creator);
            const data = web3.utils.sha3('BeagleCoin');
            const operatorData = web3.utils.sha3('BeagleCoinOperatorData');

            let operator = defaultOperatorA;

            await this.token.authorizeOperator(operator, { from: creator });
            await this.token.operatorBurn(creator, creatorBalance, data, operatorData, { from: operator });
            (await this.token.balanceOf(creator)).should.be.bignumber.equal("0");

        });

        //only allow burn to msg.sender's account
        it('allows burn permission check', async function () {

            let holdings = new BN(100000)

            await this.token.transfer(accounts[2], holdings);
            let balanceA2 = await this.token.balanceOf(accounts[2]);

            holdings.should.be.bignumber.equal(balanceA2, "Balance mismatch - tranfer from creator");

            await this.token.burn(holdings, web3.utils.asciiToHex("Burn Test"));
            alanceA2 = await this.token.balanceOf(accounts[2]);

            //console.log(`Balance - old: ${balanceA2} | new: ${alanceA2}`);
            alanceA2.should.be.bignumber.not.equal(new BN(0), "Burn permission bug. Allowed owner to burn account2");
        });

        it('allows burn', async function () {

            let holdings = new BN(100000)

            await this.token.transfer(accounts[2], holdings);
            let balanceA2 = await this.token.balanceOf(accounts[2]);

            
            await this.token.burn(holdings, web3.utils.asciiToHex("Burn Test"), { from: accounts[2] });
            alanceA2 = await this.token.balanceOf(accounts[2]);
            //console.log(`Balance - old: ${balanceA2} | new: ${alanceA2}`);

            alanceA2.should.be.bignumber.equal(new BN(0), "Burn failed");
        });

    });

    describe('Transfer', function () {
        it('reverts - when the owner is the zero address', async function () {
            await expectRevert(this.token.transferFrom(ZERO_ADDRESS, anyone, initialSupply),
                'ERC777: transfer from the zero address',
            );
        });

        it('reverts - when the owner has 0 balance', async function () {
            await expectRevert(this.token.transferFrom(anyone, defaultOperatorB, '1000'),
                'ERC777: transfer amount exceeds balance',
            );
        });

        it('correct fees tranfered - 4%', async function () {
            /* await expectRevert(this.token.transferFrom(creator, defaultOperatorB, 0),
              'ERC777: transfer amount exceeds allowance',
            ); */

            let holdings = new BN("100000000")

            //await this.token.approve(creator, holdings);
            //await this.token.transferFrom(creator, accounts[2], holdings);

            await this.token.transfer(accounts[2], holdings);
            let balanceA2 = await this.token.balanceOf(accounts[2]);

            holdings.should.be.bignumber.equal(balanceA2, "Balance mismatch - tranfer from creator");

            let transferAmount = new BN(Math.floor(Math.random() * parseInt(holdings.toString())));
            //let transferAmount = balanceA2;
            //console.log(`Transferring: ${transferAmount} | Balance: ${balanceA2}`, ((transferAmount.div(new BN(100))).mul(new BN(4))).toString());

            await this.token.transfer(accounts[3], transferAmount, { from: accounts[2] });
            let balanceA3 = await this.token.balanceOf(accounts[3]);
            let balancePool = await this.token.balanceOf(poolAddr);

            balancePool.should.be.bignumber.equal(transferAmount.sub(balanceA3), "Fees mismatch");

            balancePool.should.be.bignumber.at.most((transferAmount.divRound(new BN(100))).mul(new BN(5)), "Fees mismatch - 4 percent not transfered");
        });

        it('correct amount & fees tranfered', async function () {
            /* await expectRevert(this.token.transferFrom(creator, defaultOperatorB, 0),
              'ERC777: transfer amount exceeds allowance',
            ); */

            let holdings = new BN(100000)

            //await this.token.approve(creator, holdings);
            //await this.token.transferFrom(creator, accounts[2], holdings);

            await this.token.transfer(accounts[2], holdings);
            let balanceA2 = await this.token.balanceOf(accounts[2]);

            holdings.should.be.bignumber.equal(balanceA2, "Balance mismatch - tranfer from creator");

            let transferAmount = (Math.floor(Math.random() * parseInt(holdings.toString()))).toString();
            //console.log(`Transferring: ${transferAmount} | Balance: ${balanceA2}`);

            await this.token.transfer(accounts[3], transferAmount, { from: accounts[2] });
            let balanceA3 = await this.token.balanceOf(accounts[3]);
            let balancePool = await this.token.balanceOf(poolAddr);

            transferAmount.should.be.bignumber.equal(balanceA3.add(balancePool), "Balance mismatch - tranfer from Account2");
        });
    });


});