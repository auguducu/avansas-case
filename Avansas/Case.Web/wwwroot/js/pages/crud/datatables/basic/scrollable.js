"use strict";
var KTDatatablesBasicScrollable = function() {

	var initTable1 = function() {
		var table = $('#kt_table_1');

		// begin first table
		table.DataTable({
			scrollY: '50vh',
			scrollX: true,
			scrollCollapse: true,
		});
	};

	var initTable2 = function() {
		var table = $('#kt_table_2');

		// begin second table
		table.DataTable({
			scrollY: true,
			scrollX: true,
			scrollCollapse: true,
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
			initTable2();
		},

	};

}();

jQuery(document).ready(function() {
	KTDatatablesBasicScrollable.init();
});