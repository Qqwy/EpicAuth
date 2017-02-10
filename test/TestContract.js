var TestContract = artifacts.require("./TestContract.sol");
contract('TestContract', function(accounts) {
  it("Test user account", function() {

    return TestContract.deployed().then(function(instance) {
      return instance.getMe.call();
    }).then(function(balance) {
      assert.equal(balance.valueOf(), accounts[0], "I'm not me!");
    });


  });
});