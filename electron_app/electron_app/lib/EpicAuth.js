var Web3 = require('web3');

class EpicAuth {
    constructor(profile) {
        this.profile = profile;
    }


    checkService(service) {
        console.log("TODO: simulate check service");
        return {
            then: callback => callback(true)
        };
    }

    storeOnBlockChain() {
        console.log("TODO: simulate storage on blockchain");
        return {
            then: callback => callback(true)
        };
    }

    getAvailableTypes(type) {
        console.log("TODO: getting avaialble types for type " + type);
        return {
            then: callback => {
                let result = this.profile.verified_data_chain
                    .filter(a => a.key == type)
                callback(result);
            }
        };
    }
}



$(function() {
    let ef = new EpicAuthFactory();
    let accounts_promise = ef.getTestAccounts()
    accounts_promise.then( accounts =>{
        let first_account = accounts[0]
        first_account.checkService("wicked")
        .then(function(result) {
            console.log("Is the service valid? : " + result);
        });

        first_account.storeOnBlockChain("wicked")
            .then(function(result) {
                console.log("Is the key stored on the blockchain? : " + result);
            });

        first_account.getAvailableTypes("email")
            .then(function(result) {
                console.log("avaialble emails : ", result);
            });
    })



})


var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3();

var ContractFactory = require("truffle-contract");
var identity_contract_map = require("../../../ethereum/build/contracts/Identity.json");
var IdentityFactory = ContractFactory(identity_contract_map);
IdentityFactory.setProvider(provider);

var revocation_contract_map = require("../../../ethereum/build/contracts/RevocationToken.json");
var RevocationFactory = ContractFactory(revocation_contract_map);
RevocationFactory.setProvider(provider);

class EpicAuthFactory {

    getTestAccounts() {

        web3.setProvider(provider);

        var account1 = web3.eth.accounts[0]
        var account2 = web3.eth.accounts[1]
        var verification_account = web3.eth.accounts[3]

        let id1 = IdentityFactory.new({from: account1, gas:1000000});
        let id2 = IdentityFactory.new({from: account2, gas:1000000});
        let veri1 = RevocationFactory.new({from: verification_account, gas:1000000});
        let veri2 = RevocationFactory.new({from: verification_account, gas:1000000});
        let veri3 = RevocationFactory.new({from: verification_account, gas:1000000});
        let veri4 = RevocationFactory.new({from: verification_account, gas:1000000});

        return Promise.all([id1, id2, veri1, veri2, veri3, veri4])
        .then(([id1, id2, veri1, veri2, veri3, veri4]) => {
            console.dir(id1)
         return [
            new EpicAuth({
                account: id1.address,
                verified_data_chain: [{
                    "key": "email",
                    "subject": id1.address,
                    "data": "test@epicauth.org",
                    "revocation_ref": veri1.address,
                    "verifier_id": verification_account,
                    "verifier_signature": "AFEA234253235"
                }, {
                    "key": "phone",
                    "subject": id1.address,
                    "data": "+312141516",
                    "revocation_ref": veri2.address,
                    "verifier_id": verification_account,
                    "verifier_signature": "AFEA234253235"
                }]
            }),

            new EpicAuth({
                account: id2,
                verified_data_chain: [{
                    "key": "email",
                    "subject": id2.address,
                    "data": "test2@epicauth.org",
                    "revocation_ref": veri3.address,
                    "verifier_id": verification_account,
                    "verifier_signature": "AFEA234253235"
                }, {
                    "key": "phone",
                    "subject": id2.address,
                    "data": "+100001337",
                    "revocation_ref": veri4.address,
                    "verifier_id": verification_account,
                    "verifier_signature": "AFEA234253235"
                }]
            }),
        ]
        })
    }
}
// // Write
// storage.set('foobar', { foo: 'bar' }).then(function() {

//     // Read
//     storage.get('foobar').then(function(object) {
//         console.log(object.foo);
//         // will print "bar"
//     });

// });
