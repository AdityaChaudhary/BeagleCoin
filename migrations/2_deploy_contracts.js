//const ConvertLib = artifacts.require("ConvertLib");
//const MetaCoin = artifacts.require("MetaCoin");
const BeagleCoin = artifacts.require("BeagleCoin");

module.exports = function (deployer, network, accounts) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  if (network == 'test' || network == 'development')
    deployer.deploy(BeagleCoin,
      "0xaa51546B5286500a698CcEcC0D09605054c43B17",
    );
};
