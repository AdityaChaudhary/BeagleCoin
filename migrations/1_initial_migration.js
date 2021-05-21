const Migrations = artifacts.require("Migrations");

module.exports = function (deployer, network, accounts) {
  if (network === 'development' || network === 'test') {
    deployer.deploy(Migrations);
  }
};
