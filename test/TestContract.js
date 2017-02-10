var TestContract = artifacts.require("./TestContract.sol");
contract('TestContract', function(accounts) {
  it("Test user account", function() {
    // Get a reference to the deployed MetaCoin contract, as a JS object.
    var meta = TestContract.deployed();

    // Get the MetaCoin balance of the first account and assert that it's 10000.
    return meta.getMe.call(accounts[0]).then(function(balance) {
      assert.equal(balance.getValue(), accounts[0], "account is not equal");
    });
  });
});