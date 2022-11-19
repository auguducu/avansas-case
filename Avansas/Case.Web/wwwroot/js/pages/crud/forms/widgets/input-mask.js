// Class definition

var KTInputmask = function () {
    
    // Private functions
    var demos = function () {
        // date format
        $("#kt_inputmask_1").inputmask("99/99/9999", {
            "mask": "9",
            "repeat": 11,
            "greedy": false
        });

        // custom placeholder        
        $("#kt_inputmask_2").inputmask("99/99/9999", {
            "placeholder": "mm/dd/yyyy",
        });
        
        // phone number format
        $("#kt_inputmask_3").inputmask("mask", {
            "mask": "(999) 999 99 99"
        }); 

        // empty placeholder
        $("#kt_inputmask_4").inputmask({
            "mask": "99-9999999",
            placeholder: "" // remove underscores from the input mask
        });

        // repeating mask
        $("#kt_inputmask_5").inputmask({
            "repeat": 99,
            "mask": "9",
            "greedy": false
        }); // ~ mask "9" or mask "99" or ... mask "9999999999"
        
        // decimal format
        $("#kt_inputmask_6").inputmask('decimal', {
            rightAlignNumerics: false
        }); 
        
        // currency format
        $("#kt_inputmask_7").inputmask('€ 999.999.999,99', {
            numericInput: true
        }); //123456  =>  € ___.__1.234,56

        //ip address
        $("#kt_inputmask_8").inputmask({
            "mask": "999.999.999.999"
        });  

        //email addresss
        $("#kt_inputmask_9").inputmask({
            mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}.*[*{2,6}][.tr]",
            greedy: false,
            onBeforePaste: function (pastedValue, opts) {
                pastedValue = pastedValue.toLowerCase();
                return pastedValue.replace("mailto:", "");
            },
            definitions: {
                '*': {
                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                    cardinality: 1,
                    casing: "lower"
                }
            }
        });

        //@maltepe.edu.tr
        $("#kt_inputmask_10").inputmask({
            "mask": "999@maltepe.edu.tr"
        });

        $("#kt_inputmask_11").inputmask({
            "mask": "A9A9-9999-99",
            "greedy": false
        });

        $("#kt_inputmask_12").inputmask({
            "mask": "A9A9-9999-99",
            "greedy": false
        });

        $("#kt_inputmask_13").inputmask({
            "mask": "A9A9-9999-99",
            "greedy": false
        });

        $("#kt_inputmask_14").inputmask({
            "mask": "A9A9-9999-99",
            "greedy": false
        });

        $("#kt_inputmask_15").inputmask({
            "mask": "A9A9-9999-99",
            "greedy": false
        });

        $("#kt_inputmask_16").inputmask({
            "mask": "A9A9-9999-99",
            "greedy": false
        });
    }

    return {
        // public functions
        init: function() {
            demos(); 
        }
    };
}();

jQuery(document).ready(function() {
    KTInputmask.init();
});