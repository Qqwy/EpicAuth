var Identity = artifacts.require("./Identity.sol");

contract('IdentityTest', function(accounts) {
    it('should contain one public key', function() {
        return Identity.new().then(instance => {
            instance.addPublicKey.sendTransaction({
                    from: accounts[0]
                })
                .then(success => {
                    assert.isTrue(success, "Failed to add the new key")
                    return instance.getPubKeys.call()
                }).then(function(pubkeys) {
                    return assert.isAbove(pubkeys.length, 1, 'does not have a signature.');
                });
        })
    });

    it('should not be able to hack the other key', function() {
        return Identity.new().then(instance => {
            instance.addPublicKey.sendTransaction({
                    from: accounts[1]
                })
                .then(success => {
                    assert.isFalse(success, "You should not be albe to add a new pubkey")
                    return instance.getPubKeys.call()
                }).then(function(pubkeys) {
                    return assert.equal(pubkeys.length, 0, 'Somehow there someone slipped in.');
                });
        })
    });

    it('can have one or more tokens', function() {
        return Identity.new().then(instance => {
            // console.dir(instance)
            return instance.getTokens.call()
        }).then(tokens => {
            return assert.equal(tokens.length, 0, 'does not have a signature.');
        });
    });
});