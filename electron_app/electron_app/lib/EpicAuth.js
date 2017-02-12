var Web3 = require('web3');

class EpicAuth {
    constructor(profile) {
        this.profile = profile;
    }

    getName() {
        return this.profile.name;
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
    getTypes() {
        console.log("TODO: simulate storage on blockchain");
        this.profile.verified_data_chain
            .map(data_object => data_object.key).unique()
        return {
            then: callback => callback(types)
        };
    }

    getItemsFilteredBy(type) {
        console.log("TODO: getting avaialble types for type " + type);
        return {
            then: callback => {
                let result = this.profile.verified_data_chain
                    .filter(data_object => data_object.key == type)
                callback(result);
            }
        };
    }
}



$(function() {
    let ef = new EpicAuthFactory();
    let accounts_promise = ef.getTestAccounts()
    accounts_promise.then(accounts => {
        let first_account = accounts[0]
        first_account.checkService("wicked")
            .then(function(result) {
                console.log("Is the service valid? : " + result);
            });

        first_account.storeOnBlockChain("wicked")
            .then(function(result) {
                console.log("Is the key stored on the blockchain? : " + result);
            });

        first_account.getItemsFilteredBy("email")
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
    getListWithTestOptions(){
        return [
            ["email", "test1@epicauth.org", "ing.nl"],
            ["email", "gunter@gmail.com", "gmail.com"],
            ["email", "gunter@gmail.com", "google.com"],
            ["email", "bernard@dutchchain.com", "epicauth.org"],
            ["phone", "+311234567", "telfort.nl"],
            ["phone", "+123456789", "digid.nl"],
            ["phone", "+133333337", "epicauth.org"],
        ];
    }
    createSomeAccounts(address, verification_account){
        return Promise.all(this.getListWithTestOptions()
            .map(([type, data, verifier]) => {
                return RevocationFactory.new({from: verification_account,gas: 1000000 })
                .then(revoke => {
                    return {
                        "key": type,
                        "subject": address,
                        "data": data,
                        "revocation_ref": revoke.address,
                        "verifier_id": verification_account,
                        "verifier_label": verifier,
                        "verifier_signature": "AFEA234253235"
                    }
                })
            }))
    }

    bootstrapCreation() {
        web3.setProvider(provider);
        var account1 = web3.eth.accounts[0]
        var account2 = web3.eth.accounts[1]
        var verification_account = web3.eth.accounts[3]
        let id1 = IdentityFactory.new({
            from: account1,
            gas: 1000000
        });
        let id2 = IdentityFactory.new({
            from: account2,
            gas: 1000000
        });
        let createAccountsUser1 = this.createSomeAccounts(id1.address,verification_account)
        let createAccountsUser2 = this.createSomeAccounts(id2.address,verification_account)
        return Promise.all([id1, id2, createAccountsUser1, createAccountsUser2])
    }

    getTestAccounts() {
            return this.bootstrapCreation().then(([id1, id2, created1, created2]) => {
                return [
                    new EpicAuth({
                        name: "Satoshi",
                        account: id1.address,
                        verified_data_chain: created1
                    }),
                    new EpicAuth({
                        name: "Work Account",
                        account: id2,
                        verified_data_chain: created2
                    }),
                ]
            })
    }
}

exports.factory = new EpicAuthFactory
    // // Write
    // storage.set('foobar', { foo: 'bar' }).then(function() {

//     // Read
//     storage.get('foobar').then(function(object) {
//         console.log(object.foo);
//         // will print "bar"
//     });

// });