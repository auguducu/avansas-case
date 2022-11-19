"use strict";

var KTPortletDraggable = function () {

    return {
        //main function to initiate the module
        init: function () {
            $("#kt_sortable_portlets").sortable({
                connectWith: ".kt-portlet__head",
                items: ".kt-portlet",
                opacity: 0.8,
                handle : '.kt-portlet__head',
                coneHelperSize: true,
                placeholder: 'kt-portlet--sortable-placeholder',
                forcePlaceholderSize: true,
                tolerance: "pointer",
                helper: "clone",
                tolerance: "pointer",
                forcePlaceholderSize: !0,
                helper: "clone",
                cancel: ".kt-portlet--sortable-empty", // cancel dragging if portlet is in fullscreen mode
                revert: 250, // animation in milliseconds
                update: function(b, c) {
                    if (c.item.prev().hasClass("kt-portlet--sortable-empty")) {
                        c.item.prev().before(c.item);
                        console.log(KTPortletDraggable);
                    }                    
                }
            });
        }
    };
}();

jQuery(document).ready(function () {
    $(".kt-portlet").each(function (i) {
        var item = $(this);
        var item_clone = item.clone();
        item.data("clone", item_clone);
        var position = item.position();
        item_clone
            .css({
                left: position.left,
                top: position.top,
                visibility: "hidden"
            })
            .attr("data-pos", i + 1);
        $("#cloned-slides").append(item_clone);
    });

    $("#kt_sortable_portlets").sortable({

        axis: "y",
        revert: true,
        scroll: false,
        placeholder: "sortable-placeholder",
        cursor: "move",

        start: function (e, ui) {
            ui.helper.addClass("exclude-me");
        },

        stop: function (e, ui) {
            $("#kt_sortable_portlets .kt-portlet.exclude-me").each(function () {
                var item = $(this);
                var clone = item.data("clone");
                var position = item.position();

                clone.css("left", position.left);
                clone.css("top", position.top);
                clone.show();

                item.removeClass("exclude-me");
            });

            $("#kt_sortable_portlets .soru").each(function () {
                var soru = $(this);
                soru.attr("data-pos", soru.index());
                $("#kt_sortable_portlets .bolum").each(function () {
                    var bolum = $(this);
                    if (soru.index() > bolum.index()) {
                        var SoruValue = soru[0].children[0].children[0].children[0].children[1];
                        SoruValue.value = bolum[0].children[0].value;
                    }
                });
            });

        },

        change: function (e, ui) {
            $("#kt_sortable_portlets .kt-portlet:not(.exclude-me)").each(function () {
                var item = $(this);
                var clone = item.data("clone");
                clone.stop(true, false);
                var position = item.position();
                clone.animate({
                    left: position.left,
                    top: position.top
                }, 200);
            });
        }

    });
    KTPortletDraggable.init();
});

