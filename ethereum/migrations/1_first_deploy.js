var RevocationToken = artifacts.require("RevocationToken.sol");
var Identity = artifacts.require("Identity.sol");
var Token = artifacts.require("Token.sol");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Identity);
  deployer.deploy(RevocationToken);
  deployer.deploy(Token);
};