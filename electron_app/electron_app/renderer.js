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
});

console.log("TEST");
