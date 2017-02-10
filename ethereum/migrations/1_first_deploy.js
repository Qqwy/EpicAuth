var TestContract = artifacts.require("TestContract.sol");
var RevocationToken = artifacts.require("RevocationToken.sol");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(TestContract);
  deployer.deploy(RevocationToken);
};