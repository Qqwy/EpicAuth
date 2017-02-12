// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// var height = document.body.offsetHeight;
// self.resizeTo(500, height);
arguments = [];
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
    request_json.requests.forEach(function(request){
        // TODO: Check if I have this request thingy.
        var field = $(".hidden.field.placeholder").clone();
        field.removeClass("placeholder");
        $("label", field).html(request.type);
        switch(request.type){
        case 'phone':
            $('i', field).addClass("phone icon")
            break;
        case 'email':
            $('i', field).addClass("mail outline icon")
            break;
        };
        console.log(field);
        $(".requests_form").prepend(field);
    });
}
