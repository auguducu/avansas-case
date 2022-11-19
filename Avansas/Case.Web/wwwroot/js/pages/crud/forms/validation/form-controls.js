// Class definition

var KTFormControls = function () {
    // Private functions

    var demo1 = function () {
        $("#kt_form_1").validate({
            // define validation rules
            rules: {
                email: {
                    required: true,
                    email: true,
                    minlength: 10
                },
                url: {
                    required: true
                },
                digits: {
                    required: true,
                    digits: true
                },
                creditcard: {
                    required: true,
                    creditcard: true
                },
                phone: {
                    required: true,
                    phoneUS: true
                },
                option: {
                    required: true
                },
                options: {
                    required: true,
                    minlength: 2,
                    maxlength: 4
                },
                memo: {
                    required: true,
                    minlength: 10,
                    maxlength: 100
                },

                checkbox: {
                    required: true
                },
                checkboxes: {
                    required: true,
                    minlength: 1,
                    maxlength: 2
                },
                radio: {
                    required: true
                }
            },

            errorPlacement: function (error, element) {
                var group = element.closest('.input-group');
                if (group.length) {
                    group.after(error.addClass('invalid-feedback'));
                } else {
                    element.after(error.addClass('invalid-feedback'));
                }
            },

            //display error alert on form submit
            invalidHandler: function (event, validator) {
                var alert = $('#kt_form_1_msg');
                alert.removeClass('kt--hide').show();
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                //form[0].submit(); // submit the form
            }
        });
    }

    var demo2 = function () {
        $("#kt_form_2").validate({
            // define validation rules
            rules: {
                //= Client Information(step 3)
                // Billing Information
                FirstName: {
                    required: true
                },
                LastName: {
                    required: true
                },
                Email: {
                    required: true,
                    email: true,
                    minlength: 10
                },
                PhoneNumber: {
                    required: true,
                    phoneUS: true
                },
                BirthDate: {
                    required: true
                },
                Password: {
                    required: true
                },
                billing_card_exp_year: {
                    required: true
                },
                billing_card_cvv: {
                    required: true,
                    minlength: 2,
                    maxlength: 3
                },

                // Billing Address
                billing_address_1: {
                    required: true
                },
                billing_address_2: {},
                billing_city: {
                    required: true
                },
                billing_state: {
                    required: true
                },
                billing_zip: {
                    required: true,
                    number: true
                },

                Role: {
                    required: true
                }
            },

            //display error alert on form submit
            invalidHandler: function (event, validator) {
                swal.fire({
                    "title": "",
                    "text": "Gönderiminizde bazı hatalar var. Lütfen düzeltin.",
                    "type": "error",
                    "confirmButtonClass": "btn btn-secondary",
                    "onClose": function (e) {
                        console.log('on close event fired!');
                    }
                });

                event.preventDefault();
            },

            submitHandler: function (form) {
                var frm = $('#kt_form_2');
                frm.submit(function (e) {
                    KTApp.blockPage({
                        overlayColor: '#000000',
                        type: 'v2',
                        state: 'success',
                        message: 'Lütfen Bekleyiniz...'
                    });
                    e.preventDefault();
                    $.ajax({
                        type: frm.attr('method'),
                        url: frm.attr('action'),
                        data: frm.serialize(),
                        success: function (data) {
                            KTApp.unblockPage();
                            if (data.status == 'success') {
                                swal.fire("Kaydedildi!!", "Yeni Kullanıcı Eklendi", "success").then((result) => {
                                    if (result.value) {
                                        window.location.href = "/Home";
                                    }
                                });
                            } else {
                                swal.fire("Hata!", data.message, "error");
                            }

                        },
                        error: function (data) {
                            KTApp.unblockPage();
                            alert(data);
                            swal.fire("Hata!", data, "error");
                        },
                    });
                });

                return false;
            }
        });
    }

    return {
        // public functions
        init: function () {
            demo1();
            demo2();
        }
    };
}();

jQuery(document).ready(function () {
    KTFormControls.init();
});