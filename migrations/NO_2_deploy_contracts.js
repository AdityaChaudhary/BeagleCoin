//const ConvertLib = artifacts.require("ConvertLib");
//const MetaCoin = artifacts.require("MetaCoin");
const { upgradeProxy, deployProxy } = require('@openzeppelin/truffle-upgrades');
const { exception } = require('console');

const BeagleCoin = artifacts.require("BeagleCoin");
const BeagleCoinV2 = artifacts.require("BeagleCoin");

async function deploy(deployer, network, accounts) {
  console.log("[#] Deploying...")
  const instance = await deployProxy(BeagleCoin, ["0xaa51546B5286500a698CcEcC0D09605054c43B17"], { deployer });
  console.log('[+] Deployed', instance.address);
}

async function upgrade(deployer, network, accounts) {
  
  const existing = await BeagleCoin.deployed();
  console.log("[#] Updating...")
  const instance = await upgradeProxy(existing.address, BeagleCoinV2, { deployer });
  console.log("[+] Upgraded", instance.address);
}

module.exports = async function (deployer, network, accounts) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  // if (network == 'test' || network == 'development')
  //   deployer.deploy(BeagleCoin,
  //     "0xaa51546B5286500a698CcEcC0D09605054c43B17",
  //   );

  //const existing = await BeagleCoin.deployed();

  try{
    await upgrade(deployer, network, accounts);
  }catch(e){
    console.error("[!] ERROR", e.message);

    if(e.message.includes("doesn't look like an EIP 1967 proxy") || e.message.includes("has not been deployed to detected network (network/artifact mismatch)")){
      console.log("[#] Attempting Deploy...")
      await deploy(deployer, network, accounts);
    }else{
      console.log("[!] Unknown Error. Skipping Deployment!")
    }
  }

  // if (existing.address) {
  //   console.log("[#] Already exists", existing.address)

  // } else {
  //   console.log("[#] No instance found", existing ? existing.address : existing)

  // }

};
