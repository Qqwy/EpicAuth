var Identity = artifacts.require("./Identity.sol");
var Service = artifacts.require("./Service.sol");
var RevocationToken = artifacts.require("./RevocationToken.sol");
var Token = artifacts.require("./Token.sol");

contract('SiteLoginTest', function(accounts) {
    it('can login to website', function() {
        let test_user = Identity.new()
        let test_service = Service.new({from:accounts[1]})
        let test_revocation_token = RevocationToken.new({from:accounts[2]})

        return Promise
        .all([test_user, test_service, test_revocation_token])
        .then( ([alice, bithug, revoke_token]) => {
            // alice requests login - NOP
            return [alice, bithug]
        })
        .then( ([alice, bithug]) => {
            // Site returns list of demands
            let demands = {
                "request": [
                    {
                        type: "email",
                        optional: false,
                        validated_by: [
                            {
                                site: "github.com",
                                address: 0xDEADBEEF
                            },
                            {
                                site: "google.com",
                                address: 0xCAFEBABE
                            }
                        ]
                    },
                    {
                        type: "phone",
                        optional: true,
                        validated_by: [
                            {
                                site: "github.com",
                                address: 0xDEADCAFE
                            },
                            {
                                site: "google.com",
                                address: 0xCAFEBABE
                            }
                        ]
                    }
                ],
                "title": "Login to Bithug website",
                "explanation": "You you want to use our service, please allow us to send you spam on your mail and maybe call you on inpropriate times."
            }
            return [alice, bithug, demands]
        })
        .then( ([alice, bithug, demands]) => {
            // Alice still wants to login and creates a auth request
            // and sends a challange response
            assert.equal(demands['request'][0]['type'], "email", "no email")
            assert.equal(demands['request'][1]['type'], "phone", "no phone")
            let response = {
                "my_contract": accounts[0],
                "share_data": [
                    {
                        "key": "email",
                        "subject": accounts[0],
                        "data": "test@epicauth.org",
                        "revocation_ref": "123456789",
                        "verifier_id": 0xDEADBEEF,
                        "verifier_signature": "AFEA234253235"
                    },
                    {
                        "key": "phone",
                        "subject": accounts[0],
                        "data": "+123456789",
                        "revocation_ref": "123456789",
                        "verifier_id": "facebook.com",
                        "verifier_signature": "ASDAFGARASASD2342346"
                    },
                ]
            };

            return [alice, bithug, response]
        })
        .then( ([alice, bithug, response]) => {
            // server checks if it's to it's standards
            assert.equal(response['my_contract'], accounts[0], "no email");
            // TODO: temp token, and create token
            let token = "SOME ENCRYPTED JSON TOKEN"
            return [alice, bithug,token];
        })
        .then( ([alice, bithug, token]) => {
            // receive token and rights by client
            // create token contract
            // subdivide rights
            return  Token.new(web3.fromAscii(token,32))
            .then(token_instance => {
                // add new token instance to user
                let contract_id = token_instance.contract.address
                assert.isDefined(contract_id, "Token has not been added");
                return alice.addToken.sendTransaction(contract_id)
            })
            .then(success => {
                console.log(success)
                assert.isTrue(success, "Token has not been added");
                return [alice, bithug, addToken];
            })
        })
        .then( ([alice, bithug, added_task]) => {
            // receive token and rights by client
            // create token contract
            // subdivide rights
            console.log(added_task)
            return [alice, bithug, addToken];
        })
    });
});