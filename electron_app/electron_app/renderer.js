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
            console.log("RL TEST MODE");
            url = arguments[3];
        } else {
            console.log("DEBUG MODE");
            url = "epicauth://eyJyZXR1cm5fdXJsIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwL2hvb2tzL3Rva2VuLyR0b2tlbiIsImludGVybWVkaWF0ZV91cmwiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvaG9va3MvY2hlY2tfZGVtYW5kX3Jlc3BvbnNlLyIsImVycm9yX3VybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9lcnJvci8iLCJ0aXRsZSI6IkxvZ2luIHRvIEJpdGh1ZyB3ZWJzaXRlIiwiZXhwbGFuYXRpb24iOiJZb3UgeW91IHdhbnQgdG8gdXNlIG91ciBzZXJ2aWNlLCBwbGVhc2UgYWxsb3cgdXMgdG8gc2VuZCB5b3Ugc3BhbSBvbiB5b3VyIG1haWwgYW5kIG1heWJlIGNhbGwgeW91IG9uIGlucHJvcHJpYXRlIHRpbWVzLiIsInJlcXVlc3RzIjpbeyJ0eXBlIjoiZW1haWwiLCJvcHRpb25hbCI6ZmFsc2UsInZhbGlkYXRlZF9ieSI6W3sic2l0ZSI6ImVwaWNhdXRoLm9yZyIsImFkZHJlc3MiOjM3MzU5Mjg1NTl9LHsic2l0ZSI6ImdpdGh1Yi5jb20iLCJhZGRyZXNzIjozNzM1OTI4NTU5fSx7InNpdGUiOiJnb29nbGUuY29tIiwiYWRkcmVzcyI6MzQwNTY5MTU4Mn1dfSx7InR5cGUiOiJwaG9uZSIsIm9wdGlvbmFsIjp0cnVlLCJ2YWxpZGF0ZWRfYnkiOlt7InNpdGUiOiJnaXRodWIuY29tIiwiYWRkcmVzcyI6MzczNTkzMTY0Nn0seyJzaXRlIjoiZXBpY2F1dGgub3JnIiwiYWRkcmVzcyI6MzczNTkzMTY0Nn0seyJzaXRlIjoiZ29vZ2xlLmNvbSIsImFkZHJlc3MiOjM0MDU2OTE1ODJ9XX1dfQ==";
            // Run general mode.
        }
        var request_json = parseEpicAuthRequestURI(url);
        console.log("Request json:", request_json);
        renderNewForm(request_json, listUsers[0]);

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
                 renderNewForm(request_json, listUsers[i]);
             });
            $('#user_accounts').append(new_object);
        });

        console.log("TEST");
        $(".ui.tabular.menu .item").tab();
        $(".ui.dropdown").dropdown({
            direction: 'downward',
            onChange: function(value, text, $selectedItem) {
                console.log("testst")
                validateForm();
            }
        });

        $('.cancel_button').click(function(){
            window.close();
        });
        $("form.requests_form").submit(function(event){
            event.preventDefault();
            console.log(request_json.intermediate_url);
            let value_indexes = $('.requests_form .dropdown').dropdown("get item")
            let json_objects = value_indexes.map(datasnippet => $(datasnippet).data('json_object'))
            let post_data = {postdata: JSON.stringify(json_objects)};
            $.post(request_json.intermediate_url,post_data , function (postResult){

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

function renderNewForm(request_json, current_user){
    console.log(request_json);
    console.log(current_user.getName());
    // $(".form_elements").html("")
    $('#identity').html(current_user.getName());
    $('.custom_object').remove();
    $('.request_explanation').html(request_json.explanation);
    $('.service_name').html(request_json.title);
    request_json.requests.forEach(r => renderNewFormElement(r, current_user));
    $('#form_details').html("");
    validateForm();


}

function renderNewFormElement(request, current_user){

    current_user.getItemsFilteredBy(request.type)
    .then(items => renderPicker(items, request.type, request));

}

function renderPicker(items, type, request){

    let trusted = request.validated_by.map(a => a.site);
    var field = $(".hidden.field.placeholder").clone();
        field.removeClass("placeholder");
        let optional = request.optional ? " (optional)" : "";
        $("label", field).html(type + optional);
        $("i", field).addClass(requestIconClass(type));
        $(".menu", field).append("<div class='item' data-value='-1'>Don't select anything</div>");
        renderItemsInPicker(field, items, trusted)
        field.addClass("custom_object");
        $(".requests_form").prepend(field);
        $(".ui.tabular.menu .item").tab();
        $(".ui.dropdown").dropdown({
            direction: 'downward',
            onChange: function(value, text, $selectedItem) {
                console.log("testst")
                validateForm();
            }

        });
}

function renderItemsInPicker(field, items, trusted){
    items.forEach(function(datasnippet, index){
            let validated = trusted.indexOf(datasnippet.verifier_label) >= 0;
            let icon = validated ? "<i class='checkmark icon'></i>" : "<i class='warning sign icon'></i>";
            let object = $("<div class='item' data-value='" + index + "'>" + icon + datasnippet.data  +" (" + datasnippet.verifier_label  +")</div>")
            object.data('valid', validated)
            object.data('json_object', datasnippet)
            $(".menu", field).append(object);
        });
}

function validateForm(){
    let value_indexes = $('.requests_form .dropdown').dropdown("get item")
    console.log(value_indexes)
    let json_objects = value_indexes.map(datasnippet => $(datasnippet).data('json_object'))

    let is_valid = value_indexes
    .map(datasnippet => $(datasnippet).data('valid'))
    .every(a => a == true)
    console.log(json_objects)
    console.log(is_valid)
    if(is_valid){
        $('.submit_button').prop("disabled", false);
    }else{
        $('.submit_button').prop("disabled", true);
    }
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

document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
        require('remote').getCurrentWindow().toggleDevTools();
    } else if (e.which === 116) {
        location.reload();
    }
});
