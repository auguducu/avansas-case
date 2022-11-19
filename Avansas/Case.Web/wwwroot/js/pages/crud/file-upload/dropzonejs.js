"use strict";
// Class definition

var KTDropzoneDemo = function () {
    // Private functions
    var demo1 = function () {
        // single file upload
        $('#kt_dropzone_1').dropzone({
            url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
            paramName: "file", // The name that will be used to transfer the file
            maxFiles: 1,
            maxFilesize: 5, // MB
            addRemoveLinks: true,
            accept: function (file, done) {
                if (file.name == "justinbieber.jpg") {
                    done("Naha, you don't.");
                } else {
                    done();
                }
            }
        });

        // multiple file upload
        $('#kt_dropzone_2').dropzone({
            url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
            paramName: "file", // The name that will be used to transfer the file
            maxFiles: 10,
            maxFilesize: 10, // MB
            addRemoveLinks: true,
            accept: function (file, done) {
                if (file.name == "justinbieber.jpg") {
                    done("Naha, you don't.");
                } else {
                    done();
                }
            }
        });

        // file type validation
        $('#kt_dropzone_3').dropzone({
            url: "", // Set the url for your upload script location
            paramName: "FormOlustur", // The name that will be used to transfer the file
            maxFiles: 1,
            maxFilesize: 25, // MB
            addRemoveLinks: true,
            acceptedFiles: "image/*,application/pdf,.psd",
            accept: function (file, done) {
                if (file.name == "justinbieber.jpg") {
                    done("Naha, you don't.");
                } else {
                    done();
                }
            }
        });
    }

    var demo10 = function () {
        // set the dropzone container id
        var id = '#kt_dropzone_44';

        // set the preview element template
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone44 = new Dropzone(id, { // Make the whole body a dropzone
            paramName: "file222",
            url: frm.attr('action'), // Set the url for your upload script location
            parallelUploads: 1,
            previewTemplate: previewTemplate,
            maxFiles: 1,
            acceptedFiles: "application/pdf,.pdf",
            maxFilesize: 1, // Max filesize in MB
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        });

        myDropzone44.on("addedfile", function (file) {
            // Hookup the start button
            file.previewElement.querySelector(id + " .dropzone-start").onclick = function () { myDropzone44.enqueueFile(file); };
            $(document).find(id + ' .dropzone-item').css('display', '');
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
        });

        // Update the total progress bar
        myDropzone44.on("totaluploadprogress", function (progress) {
            $(this).find(id + " .progress-bar").css('width', progress + "%");
        });

        myDropzone44.on("sending", function (file) {
            // Show the total progress bar when upload starts
            $(id + " .progress-bar").css('opacity', '1');
            // And disable the start button
            file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone44.on("complete", function (progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function () {
                $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
            }, 300)

        });

        // Setup the buttons for all transfers
        document.querySelector(id + " .dropzone-upload").onclick = function () {
            myDropzone44.enqueueFiles(myDropzone44.getFilesWithStatus(Dropzone.ADDED));
        };

        // Setup the button for remove all files
        document.querySelector(id + " .dropzone-remove-all").onclick = function () {
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            myDropzone44.removeAllFiles(true);
        };

        // On all files completed upload
        myDropzone44.on("queuecomplete", function (progress) {
            $(id + " .dropzone-upload").css('display', 'none');
        });

        // On all files removed
        myDropzone44.on("removedfile", function (file) {
            if (myDropzone44.files.length < 1) {
                $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            }
        });
    }




    return {
        // public functions
        init: function () {
            demo1();
            demo10();
        }
    };
}();

KTUtil.ready(function () {
    KTDropzoneDemo.init();
});