var TestContract = artifacts.require("TestContract.sol");


module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(TestContract);
};