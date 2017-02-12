
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