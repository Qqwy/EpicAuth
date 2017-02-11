var Service = artifacts.require("./Service.sol");

contract('ServiceTest', function(accounts) {
    let test_pubkey = "public key";
    it('should contain one public key', function() {
        return Service.new(test_pubkey).then(instance => {
            return instance.getPublicKey.call();
        }).then(pub_key => {
            let pub_key_ascii = web3.toAscii(pub_key).replace(/\u0000/g, '');
            assert.equal(pub_key_ascii, test_pubkey, "Public key is incorrect")
        })
    });
});