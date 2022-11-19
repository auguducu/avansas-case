'use strict';
// Class definition

var KTDefaultDatatableDemo = function () {
    // Private functions

    // basic demo
    var demo = function () {

        var datatable = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/FormSonuclariListele/Tumu',
                    },
                },
                pageSize: 5, // display 20 records per page
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },

            // layout definition
            layout: {
                scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
                minHeight: null, // datatable's body's fixed height
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: true,

            // toolbar
            toolbar: {
                // toolbar placement can be at top or bottom or both top and bottom repeated
                placement: ['bottom'],

                // toolbar items
                items: {
                    // pagination
                    pagination: {
                        // page size select
                        pageSizeSelect: [5, 10, 20, 30, 50], // display dropdown to select pagination size. -1 is used for "ALl" option
                    },
                },
            },

            search: {
                input: $('#generalSearch'),
            },

            // columns definition
            columns: [
                {
                    field: 'id',
                    title: '#',
                    sortable: false,
                    width: 30,
                    type: 'number',
                    selector: { class: 'kt-checkbox--solid' },
                    textAlign: 'center',
                }, {
                    field: 'basvuruTipi',
                    title: 'Başvuru Tipi',
                }, {
                    field: 'cocukAdi',
                    title: 'Çocuk Adı',
                }, {
                    field: 'cocuksoyad',
                    title: 'Çocuk Soyadı',
                }, {
                    field: 'kacinciSinif',
                    title: 'Sınıfı',
                }, {
                    field: 'okuduguOkul',
                    title: 'Okulu',
                }, {
                    field: 'dogumTarihi',
                    title: 'Doğum Tarihi',
                    template: function (row, index, datatable) {
                        return moment(row.dogumTarihi).format("DD.MM.YYYY");
                    },
                }, {
                    field: 'enstruman',
                    title: 'Enstruman',
                }, {
                    field: 'calgi',
                    title: 'Çalgı',
                }, {
                    field: '#',
                    title: '#',
                    sortable: false,
                    width: 110,
                    overflow: 'visible',
                    autoHide: false,
                    template: function (row) {
                        return '\
						<a class="dropdown-item" href="/BasvuruGoruntule?basvuruID=' + row.id + '"><i class="la la-edit"></i>Görüntüle</a>\
					';
                    },
                }],

        });

        $('#kt_datatable_clear').on('click', function () {
            $('#kt_datatable_console').html('');
        });

        $("#kt_form_status").on("change", function () {
            datatable.search($(this).val().toLowerCase(), "status");
        });

        $('#kt_datatable_reload').on('click', function () {
            datatable.reload();
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

    };

    return {
        // public functions
        init: function () {
            demo();
        },
    };
}();

jQuery(document).ready(function () {
    KTDefaultDatatableDemo.init();
});