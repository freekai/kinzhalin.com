/*global define: false, require: false */

require.config({
    baseUrl: "/",
    paths: {
        "menu": "js/menu",
        "text": "js/3rd/text",
        "jquery": "js/3rd/jquery-2.1.3.min"
    }
});

define(["jquery", "menu", "text!html/shortdescription.html"], function ($, menu, sdescText) {
    "use strict";
    
    menu.setupMenus();
    
    menu.getDefaultContent();
    
    $("#description").html(sdescText);
    
    return {};
    
});