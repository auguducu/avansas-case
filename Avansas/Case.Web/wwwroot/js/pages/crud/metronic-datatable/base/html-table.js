"use strict";
// Class definition

var KTDatatableHtmlTableDemo = function () {
    // Private functions

    // demo initializer
    var demo = function () {
        
        var datatable = $('.kt-datatable').KTDatatable({
            search: {
                input: $('#generalSearch'),
            },
        });
        kt_form_birim
        $('#kt_form_status').on('change', function () {
            datatable.search($(this).val().toLowerCase(), datatable.options.columns[2].title);
            console.log("kt_form_status");
        });

        $('#kt_form_type').on('change', function () {
            datatable.search($(this).val().toLowerCase(), datatable.options.columns[4].title);
            console.log("kt_form_type");
        });

        $('#kt_form_birim').on('change', function () {
            datatable.search($(this).val().toLowerCase(), datatable.options.columns[3].title);
            console.log("kt_form_birim");
        });

        $('#kt_form_status,#kt_form_type,#kt_form_birim').selectpicker();

    };

    return {
        // Public functions
        init: function () {
            // init dmeo
            demo();
        },
    };
}();

jQuery(document).ready(function () {
    KTDatatableHtmlTableDemo.init();
});