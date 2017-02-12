// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// var height = document.body.offsetHeight;
// self.resizeTo(500, height);

$(function(){

    var epicauth = require("./lib/EpicAuth.js");
    epicauth.factory.getTestAccounts().then(listUsers => {

        navigator.registerProtocolHandler("web+epicauth", self.location + '?q=%s', "EpicAuth URI");

        // Check if opened by calling with epicauth URL scheme.
        var remote = require('electron').remote;
        arguments = remote.getGlobal('sharedObject').encoded_token;
        console.log(arguments);
        var url = "";
        if (arguments.length > 2 && arguments[2] == '--'){
            // Run login-request mode.
            url = arguments[3];
            console.log("Login Request Mode!");
        } else {
            url = "epicauth://eyJyZXR1cm5fdXJsIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL2hvb2tzL3Rva2VuLyR0b2tlbiIsImVycm9yX3VybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9lcnJvci8iLCJ0aXRsZSI6IkxvZ2luIHRvIEJpdGh1ZyB3ZWJzaXRlIiwiZXhwbGFuYXRpb24iOiJZb3UgeW91IHdhbnQgdG8gdXNlIG91ciBzZXJ2aWNlLCBwbGVhc2UgYWxsb3cgdXMgdG8gc2VuZCB5b3Ugc3BhbSBvbiB5b3VyIG1haWwgYW5kIG1heWJlIGNhbGwgeW91IG9uIGlucHJvcHJpYXRlIHRpbWVzLiIsInJlcXVlc3RzIjpbeyJ0eXBlIjoiZW1haWwiLCJvcHRpb25hbCI6ZmFsc2UsInZhbGlkYXRlZF9ieSI6W3sic2l0ZSI6ImdpdGh1Yi5jb20iLCJhZGRyZXNzIjozNzM1OTI4NTU5fSx7InNpdGUiOiJnb29nbGUuY29tIiwiYWRkcmVzcyI6MzQwNTY5MTU4Mn1dfSx7InR5cGUiOiJwaG9uZSIsIm9wdGlvbmFsIjp0cnVlLCJ2YWxpZGF0ZWRfYnkiOlt7InNpdGUiOiJnaXRodWIuY29tIiwiYWRkcmVzcyI6MzczNTkzMTY0Nn0seyJzaXRlIjoiZ29vZ2xlLmNvbSIsImFkZHJlc3MiOjM0MDU2OTE1ODJ9XX1dfQ==";
            // Run general mode.
            console.log("General Mode!", arguments.length, arguments[0], arguments[1]);
        }
        var request_json = parseEpicAuthRequestURI(url);
        console.log("Request json:", request_json);
        renderRequestJSON(request_json, listUsers[0]);

        $('#user_accounts').html("");
        $(listUsers).each(function (i, u){
            console.log(u,i);
            var new_object = $("<a/>")
             .text(u.getName())
             .addClass(i == 0 ? "item active specialtabs": "item specialtabs")
             .attr("data-tab","tab" + i)
             .click(function (){
                 $(".specialtabs").removeClass("active");
                 $(this).addClass("active");
                 renderRequestJSON(request_json, listUsers[i]);
             });
            $('#user_accounts').append(new_object);
        });

        console.log("TEST");
        $(".ui.tabular.menu .item").tab();
        $(".ui.dropdown").dropdown({direction: 'downward'});

        $('.cancel_button').click(function(){
            window.close();
        });
        $("form.requests_form").submit(function(event){
            event.preventDefault();
            console.log(request_json.intermediate_url);
            $.post(request_json.intermediate_url, $(this).serialize(), function (postResult){

                console.log("TODO: Retrieve token as answer");
                handleStorageOfToken(postResult.token);
                submitRequestResponse(request_json.return_url, postResult.token);
                window.close();
            });
        });
        $(".active.dimmer").removeClass("active");
    });



});

function handleStorageOfToken(token){
    var do_save = confirm("Do you want to save this token to your personal blockchain wallet?");
    console.log("TODO: Actually save token");
    return {then: (callback) => callback(true)};
}


function parseEpicAuthRequestURI(raw_uri){
    var uri = raw_uri.split("://")[1];
    var buf = Buffer.from(uri, 'base64').toString("ascii");
    var json = JSON.parse(buf);
    return json;
}

function renderRequestJSON(request_json, current_user){
    console.log(request_json);
    console.log(current_user.getName());
    // $(".form_elements").html("")
    $('#identity').html(current_user.getName());
    $('.custom_object').remove();
    $('.request_explanation').html(request_json.explanation);
    $('.service_name').html(request_json.title);
    console.log(request_json.requests);
    request_json.requests.forEach(r => fillInSingleRequest(r, current_user));
    $('#form_details').html("");


}

function fillInSingleRequest(request, current_user){
    let type = request.type;
    let trusted = request.validated_by.map(a => a.site);
    console.log(trusted);
    current_user.getItemsFilteredBy(type)
    .then(items =>{
        // TODO: Check if I have this request thingy.
        var field = $(".hidden.field.placeholder").clone();
        field.removeClass("placeholder");
        let optional = request.optional ? " (optional)" : "";
        $("label", field).html(type + optional);
        $("i", field).addClass(requestIconClass(type));
        items.forEach(function(datasnippet){
            let validated = trusted.indexOf(datasnippet.verifier_label) >= 0;
            let icon = validated ? "<i class='checkmark icon'></i>" : "<i class='warning sign icon'></i>";
            $(".menu", field).append("<div class='item' value='" + datasnippet.data + "'>" + icon + datasnippet.data  +" (" + datasnippet.verifier_label  +")</div>");
        });
        field.addClass("custom_object");
        $(".requests_form").prepend(field);
         $(".ui.tabular.menu .item").tab();
        $(".ui.dropdown").dropdown({direction: 'downward'});
        console.log(field);
    });

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

function submitRequestResponse(url, token){
    console.log("TODO: Submit request response")
    console.log("TODO: parse answer request response")
    shell = require('electron').shell;
    let tokenized_url = url.replace("$token", token)
    shell.openExternal(tokenized_url);
}
