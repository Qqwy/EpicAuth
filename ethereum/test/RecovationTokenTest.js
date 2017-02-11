var RevocationToken = artifacts.require("./RevocationToken.sol");

contract('RevocationTokenTest', function(accounts) {
    it('should have at least one signature', function() {
        return RevocationToken.deployed().then(function(instance) {
            return instance.getSignatures.call();
        }).then(function(signatures) {
            assert.equal(signatures.length, 1, 'does not have a signature.');
        });
    });
});