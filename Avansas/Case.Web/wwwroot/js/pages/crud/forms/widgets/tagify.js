// Class definition
var KTTagify = function () {

    // Private functions

    var demo5 = function () {
        // Init autocompletes
        var toEl = document.getElementById('kt_tagify_5');
        var tagifyTo = new Tagify(toEl, {
            delimiters: ", ", // add new tags when a comma or a space character is entered
            maxTags: 10,
            blacklist: ["fuck", "shit", "pussy"],
            keepInvalidTags: true, // do not remove invalid tags (but keep them marked as invalid)
            whitelist: [
                {
                    value: 'Alp Üğüdücü',
                    email: 'alpuguducu@maltepe.edu.tr',
                    initials: '',
                    initialsState: '',
                    pic: './media/users/100_1.jpg',
                    class: 'tagify__tag--brand'
                },{
                    value: 'Fatih Güler',
                    email: 'fatihguler@maltepe.edu.tr',
                    initials: '',
                    initialsState: '',
                    pic: './media/users/100_1.jpg',
                    class: 'tagify__tag--brand'
                }],
            templates: {
                dropdownItem: function (tagData) {
                    try {
                        return '<div class="tagify__dropdown__item">' +
                            '<div class="kt-media-card">' +
                            '    <span class="kt-media kt-media--' + (tagData.initialsState ? tagData.initialsState : '') + '" style="background-image: url(' + tagData.pic + ')">' +
                            '        <span>' + tagData.initials + '</span>' +
                            '    </span>' +
                            '    <div class="kt-media-card__info">' +
                            '        <a href="#" class="kt-media-card__title">' + tagData.value + '</a>' +
                            '        <span class="kt-media-card__desc">' + tagData.email + '</span>' +
                            '    </div>' +
                            '</div>' +
                            '</div>';
                    }
                    catch (err) { }
                }
            },
            transformTag: function (tagData) {
                tagData.class = 'tagify__tag tagify__tag--brand';
            },
            dropdown: {
                classname: "color-blue",
                enabled: 1,
                maxItems: 5
            }
        });
    }

    return {
        // public functions
        init: function () {
            demo5();
        }
    };
}();

jQuery(document).ready(function () {
    KTTagify.init();
});
