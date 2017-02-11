var Identity = artifacts.require("./Identity.sol");
var Service = artifacts.require("./Service.sol");

contract('SiteLoginTest', function(accounts) {
    it('can login to website', function() {
        let test_user = Identity.new()
        let test_service = Service.new({from:accounts[1]})

        return Promise
        .all([test_user, test_service])
        .then( ([alice, bithug]) => {
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
                        validated_by: ["github.com", "google.com"]
                    },
                    {
                        type: "phone",
                        optional: true,
                        validated_by: ["facebook.com", "google.com"]
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
                        "verifier_id": "google.com",
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

        })
    });
});