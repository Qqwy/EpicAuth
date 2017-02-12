// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// var height = document.body.offsetHeight;
// self.resizeTo(500, height);

$(function(){
    console.log("TEST");
    $(".ui.tabular.menu .item").tab();
    $(".ui.dropdown").dropdown({direction: 'downward'});
    navigator.registerProtocolHandler("web+epicauth", self.location + '?q=%s', "EpicAuth URI");

    // Check if opened by calling with epicauth URL scheme.
    var remote = require('electron').remote;
    arguments = remote.getGlobal('sharedObject').encoded_token;
    console.log(arguments);
    if (arguments.length > 2 && arguments[2] == '--'){
        // Run login-request mode.
        console.log("Login Request Mode!")
        var request_json = parseEpicAuthRequestURI(arguments[3]);
        console.log("Request json:", request_json);
        renderRequestJSON(request_json);

        $('.cancel_button').click(function(){
            window.close();
        });
        $(".submit_button").click(function(){
            submitRequestResponse();
            console.log("TODO: Retrieve token as answer")
            window.close();
        });
    } else {
        // Run general mode.
        console.log("General Mode!", arguments.length, arguments[0], arguments[1])
    }

});

function parseEpicAuthRequestURI(raw_uri){
    var uri = raw_uri.split("://")[1];
    var buf = Buffer.from(uri, 'base64').toString("ascii");
    var json = JSON.parse(buf);
    return json;
}

function renderRequestJSON(request_json){
    console.log(request_json);
    $('.request_explanation').html(request_json.explanation);
    $('.service_name').html(request_json.title);
    console.log(request_json.requests);
    request_json.requests.forEach(fillInSingleRequest);
}

function fillInSingleRequest(request){
    // TODO: Check if I have this request thingy.
    var field = $(".hidden.field.placeholder").clone();
    field.removeClass("placeholder");
    $("label", field).html(request.type);
    $("i", field).addClass(requestIconClass(request.type));
    console.log(field);

    var stub_data = [{
        "key": "email",
        "subject": 0xDEADBEEF,
        "data": "test@epicauth.org",
        "revocation_ref": 0xDEADBEEF2,
        "verifier_id": 0xDEADBABE,
        "verifier_signature": "AFEA234253235"
    }, {
        "key": "phone",
        "subject": 0xCAFEBABE,
        "data": "+312141516",
        "revocation_ref": 0xCAFEBABE2,
        "verifier_id": 0xCAFEBEEF,
        "verifier_signature": "AFEA234253235"
    }];
    stub_data.forEach(function(datasnippet){
        $(".menu", field).append("<div class='item' value='" + datasnippet.data + "'>" +  +"</div>");
    });

    $(".requests_form").prepend(field);
    console.log(field);

}

function requestIconClass(request_type){
    switch(request_type){
    case 'phone':
        return "phone icon";
    case 'email':
        return "mail outline icon";
    default:
        return "question icon";
    };
}

function submitRequestResponse(){
    console.log("TODO: Submit request response")
    console.log("TODO: parse answer request response")
    shell = require('electron').shell;
    shell.openExternal('http://example.com/?q=todo_hardcoded_url');
}
