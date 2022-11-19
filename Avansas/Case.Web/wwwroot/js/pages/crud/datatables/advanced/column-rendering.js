"use strict";
var KTDatatablesAdvancedColumnRendering = function() {

	var initTable1 = function() {
		var table = $('#kt_table_1');

		// begin first table
		table.DataTable({
			responsive: true,
			paging: true,
			columnDefs: [
				{
					targets: 0,
					title: 'Ad Soya',
					render: function(data, type, full, meta) {
						var number = KTUtil.getRandomInt(1, 14);
						var output;
							var stateNo = KTUtil.getRandomInt(0, 7);
							var states = [
								'success',
								'brand',
								'danger',
								'success',
								'warning',
								'dark',
								'primary',
								'info'];
							var state = states[stateNo];

							output = `
                                <div class="kt-user-card-v2">
                                    <div class="kt-user-card-v2__pic">
                                        <div class="kt-badge kt-badge--xl kt-badge--` + state + `"><span>` + full[0].substring(0, 1) + `</div>
                                    </div>
                                    <div class="kt-user-card-v2__details">
                                        <span class="kt-user-card-v2__name">` + full[0] + `</span>
                                    </div>
                                </div>`;
						return output;
					},
				},
				{
					targets: 1,
					render: function(data, type, full, meta) {
						return '<a class="kt-link" href="mailto:' + data + '">' + data + '</a>';
					},
				},
				{
					targets: 4,
					render: function(data, type, full, meta) {
						var status = {
							2: {'title': 'User', 'class': 'kt-badge--brand'},
							1: {'title': 'Admin', 'class': ' kt-badge--danger'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
					},
				},
				{
					targets: 5,
					render: function(data, type, full, meta) {
						var status = {
							2: {'title': 'Pasif', 'state': 'danger'},
							1: {'title': 'Aktif', 'state': 'primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="kt-badge kt-badge--' + status[data].state + ' kt-badge--dot"></span>&nbsp;' +
							'<span class="kt-font-bold kt-font-' + status[data].state + '">' + status[data].title + '</span>';
					},
				},
			],
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		}
	};
}();

jQuery(document).ready(function() {
	KTDatatablesAdvancedColumnRendering.init();
});