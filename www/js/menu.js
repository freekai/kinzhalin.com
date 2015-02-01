/*global define: false, console: false */
define(["jquery", "text!html/msgs/somethingwentwrong.html"], function ($, wrongText) {
    "use strict";
    
    var menuItems = {
        blog: {
            title: "Blog",
            content: "html/blog.html",
            byDefault: true
        },
        social: {
            title: "Social",
            content: "html/social.html"
        },
        archive: {
            title: "Archive",
            content: "html/archive.html"
        },
        about: {
            title: "About&nbsp;me",
            content: "html/about.html"
        }
    };
    
    function setupMenus() {
        var menuContainer = $("#menu");
        Object.keys(menuItems).forEach(function (item) {
            $("<span>", {
                "class": "menu-item",
                id: item,
                html: menuItems[item].title,
                "data-content": menuItems[item].content
            })
                .on("click", function () {
                    $.ajax(menuItems[item].content)
                        .done(function (data) {
                            $("#content").html(data);
                        })
                        .fail(function () {
                            $("#content").html(wrongText);
                        });
                })
                .appendTo(menuContainer);
        });
    }
    
    function getDefaultContent() {
        
        function findDefault() {
            var result;
            Object.keys(menuItems).forEach(function (item) {
                if (menuItems[item].byDefault) {
                    result = item;
                    return false;
                }
                return true;
            });
            return result;
        }
        
        var defaultItem = findDefault();
        
        if (defaultItem) {
            $("#menu > #" + defaultItem).click();
        } else {
            console.error("No default item in the menu!");
        }
    }
    
    return {
        setupMenus: setupMenus,
        getDefaultContent: getDefaultContent
    };
});