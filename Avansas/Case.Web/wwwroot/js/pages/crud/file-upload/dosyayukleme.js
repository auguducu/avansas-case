"use strict";
// Class definition

var KTDropzoneDemo = function () {
    // Private functions

    var demo100 = function () {
        // set the dropzone container id
        var id = '#kt_dropzone_100';

        // set the preview element template
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone4 = new Dropzone(id, { // Make the whole body a dropzone
            paramName: "file100",
            url: frm.attr('action'), // Set the url for your upload script location
            parallelUploads: 1,
            previewTemplate: previewTemplate,
            maxFilesize: 100, // Max filesize in MB
            maxFiles: 1,
            acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx",
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        });

        //var theFile = { name: "yüklenmisDosyaAdi.pdf", size: 12345, type: 'application/pdf' };
        //myDropzone4.options.addedfile.call(myDropzone4, theFile);
        //$(document).find(id + ' .dropzone-item').css('display', '');

        myDropzone4.on("addedfile", function (file) {
            // Hookup the start button
            file.previewElement.querySelector(id + " .dropzone-start").onclick = function () { myDropzone4.enqueueFile(file); };
            $(document).find(id + ' .dropzone-item').css('display', '');
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
        });

        // Update the total progress bar
        myDropzone4.on("totaluploadprogress", function (progress) {
            $(this).find(id + " .progress-bar").css('width', progress + "%");
        });

        myDropzone4.on("sending", function (file) {
            // Show the total progress bar when upload starts
            $(id + " .progress-bar").css('opacity', '1');
            // And disable the start button
            file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone4.on("complete", function (progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function () {
                $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
            }, 300)

        });

        // Setup the buttons for all transfers
        document.querySelector(id + " .dropzone-upload").onclick = function () {
            myDropzone4.enqueueFiles(myDropzone4.getFilesWithStatus(Dropzone.ADDED));
        };

        // Setup the button for remove all files
        document.querySelector(id + " .dropzone-remove-all").onclick = function () {
            $.ajax({
                type: "POST",
                url: "/api/DosyaSil", //silme olayý gelecek
                data: {
                    "data": "dosya100-adi",
                },
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                success: function (result) {
                    $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
                },
                error: function (req, status, error) {
                    console.log("hata");
                }
            });
            myDropzone4.removeAllFiles(true);
        };

        // On all files completed upload
        myDropzone4.on("queuecomplete", function (progress) {
            $(id + " .dropzone-upload").css('display', 'none');
        });

        // On all files removed
        myDropzone4.on("removedfile", function (file) {
            console.log(file);
            if (myDropzone4.files.length < 1) {
                $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            }
        });
    }

    var demo101 = function () {
        // set the dropzone container id
        var id = '#kt_dropzone_101';

        // set the preview element template
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone4 = new Dropzone(id, { // Make the whole body a dropzone
            paramName: "file101",
            url: frm.attr('action'), // Set the url for your upload script location
            parallelUploads: 1,
            previewTemplate: previewTemplate,
            maxFilesize: 100, // Max filesize in MB
            maxFiles: 1,
            acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx",
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        });

        //var theFile = { name: "yüklenmisDosyaAdi.pdf", size: 12345, type: 'application/pdf' };
        //myDropzone4.options.addedfile.call(myDropzone4, theFile);
        //$(document).find(id + ' .dropzone-item').css('display', '');

        myDropzone4.on("addedfile", function (file) {
            // Hookup the start button
            file.previewElement.querySelector(id + " .dropzone-start").onclick = function () { myDropzone4.enqueueFile(file); };
            $(document).find(id + ' .dropzone-item').css('display', '');
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
        });

        // Update the total progress bar
        myDropzone4.on("totaluploadprogress", function (progress) {
            $(this).find(id + " .progress-bar").css('width', progress + "%");
        });

        myDropzone4.on("sending", function (file) {
            // Show the total progress bar when upload starts
            $(id + " .progress-bar").css('opacity', '1');
            // And disable the start button
            file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone4.on("complete", function (progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function () {
                $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
            }, 300)

        });

        // Setup the buttons for all transfers
        document.querySelector(id + " .dropzone-upload").onclick = function () {
            myDropzone4.enqueueFiles(myDropzone4.getFilesWithStatus(Dropzone.ADDED));
        };

        // Setup the button for remove all files
        document.querySelector(id + " .dropzone-remove-all").onclick = function () {
            $.ajax({
                type: "POST",
                url: "/api/DosyaSil", //silme olayý gelecek
                data: {
                    "data": "dosya101-adi",
                },
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                success: function (result) {
                    $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
                },
                error: function (req, status, error) {
                    console.log("hata");
                }
            });
            myDropzone4.removeAllFiles(true);
        };

        // On all files completed upload
        myDropzone4.on("queuecomplete", function (progress) {
            $(id + " .dropzone-upload").css('display', 'none');
        });

        // On all files removed
        myDropzone4.on("removedfile", function (file) {
            if (myDropzone4.files.length < 1) {
                $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            }
        });
    }

    var demo102 = function () {
        // set the dropzone container id
        var id = '#kt_dropzone_102';

        // set the preview element template
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone4 = new Dropzone(id, { // Make the whole body a dropzone
            paramName: "file102",
            url: frm.attr('action'), // Set the url for your upload script location
            parallelUploads: 1,
            previewTemplate: previewTemplate,
            maxFilesize: 100, // Max filesize in MB
            maxFiles: 1,
            acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx",
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        });

        //var theFile = { name: "yüklenmisDosyaAdi.pdf", size: 12345, type: 'application/pdf' };
        //myDropzone4.options.addedfile.call(myDropzone4, theFile);
        //$(document).find(id + ' .dropzone-item').css('display', '');

        myDropzone4.on("addedfile", function (file) {
            // Hookup the start button
            file.previewElement.querySelector(id + " .dropzone-start").onclick = function () { myDropzone4.enqueueFile(file); };
            $(document).find(id + ' .dropzone-item').css('display', '');
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
        });

        // Update the total progress bar
        myDropzone4.on("totaluploadprogress", function (progress) {
            $(this).find(id + " .progress-bar").css('width', progress + "%");
        });

        myDropzone4.on("sending", function (file) {
            // Show the total progress bar when upload starts
            $(id + " .progress-bar").css('opacity', '1');
            // And disable the start button
            file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone4.on("complete", function (progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function () {
                $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
            }, 300)

        });

        // Setup the buttons for all transfers
        document.querySelector(id + " .dropzone-upload").onclick = function () {
            myDropzone4.enqueueFiles(myDropzone4.getFilesWithStatus(Dropzone.ADDED));
        };

        // Setup the button for remove all files
        document.querySelector(id + " .dropzone-remove-all").onclick = function () {
            $.ajax({
                type: "POST",
                url: "/api/DosyaSil", //silme olayý gelecek
                data: {
                    "data": "dosya102-adi",
                },
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                success: function (result) {
                    $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
                },
                error: function (req, status, error) {
                    console.log("hata");
                }
            });
            myDropzone4.removeAllFiles(true);
        };

        // On all files completed upload
        myDropzone4.on("queuecomplete", function (progress) {
            $(id + " .dropzone-upload").css('display', 'none');
        });

        // On all files removed
        myDropzone4.on("removedfile", function (file) {
            if (myDropzone4.files.length < 1) {
                $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            }
        });
    }

    var demo103 = function () {
        // set the dropzone container id
        var id = '#kt_dropzone_103';

        // set the preview element template
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone4 = new Dropzone(id, { // Make the whole body a dropzone
            paramName: "file103",
            url: frm.attr('action'), // Set the url for your upload script location
            parallelUploads: 1,
            previewTemplate: previewTemplate,
            maxFilesize: 100, // Max filesize in MB
            maxFiles: 1,
            acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx",
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        });

        //var theFile = { name: "yüklenmisDosyaAdi.pdf", size: 12345, type: 'application/pdf' };
        //myDropzone4.options.addedfile.call(myDropzone4, theFile);
        //$(document).find(id + ' .dropzone-item').css('display', '');

        myDropzone4.on("addedfile", function (file) {
            // Hookup the start button
            file.previewElement.querySelector(id + " .dropzone-start").onclick = function () { myDropzone4.enqueueFile(file); };
            $(document).find(id + ' .dropzone-item').css('display', '');
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
        });

        // Update the total progress bar
        myDropzone4.on("totaluploadprogress", function (progress) {
            $(this).find(id + " .progress-bar").css('width', progress + "%");
        });

        myDropzone4.on("sending", function (file) {
            // Show the total progress bar when upload starts
            $(id + " .progress-bar").css('opacity', '1');
            // And disable the start button
            file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone4.on("complete", function (progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function () {
                $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
            }, 300)

        });

        // Setup the buttons for all transfers
        document.querySelector(id + " .dropzone-upload").onclick = function () {
            myDropzone4.enqueueFiles(myDropzone4.getFilesWithStatus(Dropzone.ADDED));
        };

        // Setup the button for remove all files
        document.querySelector(id + " .dropzone-remove-all").onclick = function () {
            $.ajax({
                type: "POST",
                url: "/api/DosyaSil", //silme olayý gelecek
                data: {
                    "data": "dosya103-adi",
                },
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                success: function (result) {
                    $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
                },
                error: function (req, status, error) {
                    console.log("hata");
                }
            });
            myDropzone4.removeAllFiles(true);
        };

        // On all files completed upload
        myDropzone4.on("queuecomplete", function (progress) {
            $(id + " .dropzone-upload").css('display', 'none');
        });

        // On all files removed
        myDropzone4.on("removedfile", function (file) {
            if (myDropzone4.files.length < 1) {
                $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            }
        });
        var demo103 = function () {
            // set the dropzone container id
            var id = '#kt_dropzone_103';

            // set the preview element template
            var previewNode = $(id + " .dropzone-item");
            previewNode.id = "";
            var previewTemplate = previewNode.parent('.dropzone-items').html();
            previewNode.remove();

            var myDropzone4 = new Dropzone(id, { // Make the whole body a dropzone
                paramName: "file103",
                url: frm.attr('action'), // Set the url for your upload script location
                parallelUploads: 1,
                previewTemplate: previewTemplate,
                maxFilesize: 100, // Max filesize in MB
                maxFiles: 1,
                acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx",
                autoQueue: false, // Make sure the files aren't queued until manually added
                previewsContainer: id + " .dropzone-items", // Define the container to display the previews
                clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
            });

            //var theFile = { name: "yüklenmisDosyaAdi.pdf", size: 12345, type: 'application/pdf' };
            //myDropzone4.options.addedfile.call(myDropzone4, theFile);
            //$(document).find(id + ' .dropzone-item').css('display', '');

            myDropzone4.on("addedfile", function (file) {
                // Hookup the start button
                file.previewElement.querySelector(id + " .dropzone-start").onclick = function () { myDropzone4.enqueueFile(file); };
                $(document).find(id + ' .dropzone-item').css('display', '');
                $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
            });

            // Update the total progress bar
            myDropzone4.on("totaluploadprogress", function (progress) {
                $(this).find(id + " .progress-bar").css('width', progress + "%");
            });

            myDropzone4.on("sending", function (file) {
                // Show the total progress bar when upload starts
                $(id + " .progress-bar").css('opacity', '1');
                // And disable the start button
                file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
            });

            // Hide the total progress bar when nothing's uploading anymore
            myDropzone4.on("complete", function (progress) {
                var thisProgressBar = id + " .dz-complete";
                setTimeout(function () {
                    $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
                }, 300)

            });

            // Setup the buttons for all transfers
            document.querySelector(id + " .dropzone-upload").onclick = function () {
                myDropzone4.enqueueFiles(myDropzone4.getFilesWithStatus(Dropzone.ADDED));
            };

            // Setup the button for remove all files
            document.querySelector(id + " .dropzone-remove-all").onclick = function () {
                $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
                myDropzone4.removeAllFiles(true);
            };

            // On all files completed upload
            myDropzone4.on("queuecomplete", function (progress) {
                $(id + " .dropzone-upload").css('display', 'none');
            });

            // On all files removed
            myDropzone4.on("removedfile", function (file) {
                if (myDropzone4.files.length < 1) {
                    $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
                }
            });
        }
    }

    var demo104 = function () {
        // set the dropzone container id
        var id = '#kt_dropzone_104';

        // set the preview element template
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone4 = new Dropzone(id, { // Make the whole body a dropzone
            paramName: "file104",
            url: frm.attr('action'), // Set the url for your upload script location
            parallelUploads: 1,
            previewTemplate: previewTemplate,
            maxFilesize: 100, // Max filesize in MB
            maxFiles: 1,
            acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx",
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        });

        //var theFile = { name: "yüklenmisDosyaAdi.pdf", size: 12345, type: 'application/pdf' };
        //myDropzone4.options.addedfile.call(myDropzone4, theFile);
        //$(document).find(id + ' .dropzone-item').css('display', '');

        myDropzone4.on("addedfile", function (file) {
            // Hookup the start button
            file.previewElement.querySelector(id + " .dropzone-start").onclick = function () { myDropzone4.enqueueFile(file); };
            $(document).find(id + ' .dropzone-item').css('display', '');
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
        });

        // Update the total progress bar
        myDropzone4.on("totaluploadprogress", function (progress) {
            $(this).find(id + " .progress-bar").css('width', progress + "%");
        });

        myDropzone4.on("sending", function (file) {
            // Show the total progress bar when upload starts
            $(id + " .progress-bar").css('opacity', '1');
            // And disable the start button
            file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone4.on("complete", function (progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function () {
                $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
            }, 300)

        });

        // Setup the buttons for all transfers
        document.querySelector(id + " .dropzone-upload").onclick = function () {
            myDropzone4.enqueueFiles(myDropzone4.getFilesWithStatus(Dropzone.ADDED));
        };

        // Setup the button for remove all files
        document.querySelector(id + " .dropzone-remove-all").onclick = function () {
            $.ajax({
                type: "POST",
                url: "/api/DosyaSil", //silme olayý gelecek
                data: {
                    "data": "dosya104-adi",
                },
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                success: function (result) {
                    $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
                },
                error: function (req, status, error) {
                    console.log("hata");
                }
            });
            myDropzone4.removeAllFiles(true);
        };

        // On all files completed upload
        myDropzone4.on("queuecomplete", function (progress) {
            $(id + " .dropzone-upload").css('display', 'none');
        });

        // On all files removed
        myDropzone4.on("removedfile", function (file) {
            if (myDropzone4.files.length < 1) {
                $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            }
        });
    }

    var demo105 = function () {
        // set the dropzone container id
        var id = '#kt_dropzone_105';

        // set the preview element template
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone4 = new Dropzone(id, { // Make the whole body a dropzone
            paramName: "file105",
            url: frm.attr('action'), // Set the url for your upload script location
            parallelUploads: 1,
            previewTemplate: previewTemplate,
            maxFilesize: 100, // Max filesize in MB
            maxFiles: 1,
            acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx",
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        });

        //var theFile = { name: "yüklenmisDosyaAdi.pdf", size: 12345, type: 'application/pdf' };
        //myDropzone4.options.addedfile.call(myDropzone4, theFile);
        //$(document).find(id + ' .dropzone-item').css('display', '');

        myDropzone4.on("addedfile", function (file) {
            // Hookup the start button
            file.previewElement.querySelector(id + " .dropzone-start").onclick = function () { myDropzone4.enqueueFile(file); };
            $(document).find(id + ' .dropzone-item').css('display', '');
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
        });

        // Update the total progress bar
        myDropzone4.on("totaluploadprogress", function (progress) {
            $(this).find(id + " .progress-bar").css('width', progress + "%");
        });

        myDropzone4.on("sending", function (file) {
            // Show the total progress bar when upload starts
            $(id + " .progress-bar").css('opacity', '1');
            // And disable the start button
            file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone4.on("complete", function (progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function () {
                $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
            }, 300)

        });

        // Setup the buttons for all transfers
        document.querySelector(id + " .dropzone-upload").onclick = function () {
            myDropzone4.enqueueFiles(myDropzone4.getFilesWithStatus(Dropzone.ADDED));
        };

        // Setup the button for remove all files
        document.querySelector(id + " .dropzone-remove-all").onclick = function () {
            $.ajax({
                type: "POST",
                url: "/api/DosyaSil", //silme olayý gelecek
                data: {
                    "data": "dosya105-adi",
                },
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                success: function (result) {
                    $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
                },
                error: function (req, status, error) {
                    console.log("hata");
                }
            });
            myDropzone4.removeAllFiles(true);
        };

        // On all files completed upload
        myDropzone4.on("queuecomplete", function (progress) {
            $(id + " .dropzone-upload").css('display', 'none');
        });

        // On all files removed
        myDropzone4.on("removedfile", function (file) {
            if (myDropzone4.files.length < 1) {
                $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            }
        });
    }

    var demo106 = function () {
        // set the dropzone container id
        var id = '#kt_dropzone_106';

        // set the preview element template
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone4 = new Dropzone(id, { // Make the whole body a dropzone
            paramName: "file106",
            url: frm.attr('action'), // Set the url for your upload script location
            parallelUploads: 1,
            previewTemplate: previewTemplate,
            maxFilesize: 100, // Max filesize in MB
            maxFiles: 1,
            acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx",
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
        });

        //var theFile = { name: "yüklenmisDosyaAdi.pdf", size: 12345, type: 'application/pdf' };
        //myDropzone4.options.addedfile.call(myDropzone4, theFile);
        //$(document).find(id + ' .dropzone-item').css('display', '');

        myDropzone4.on("addedfile", function (file) {
            // Hookup the start button
            file.previewElement.querySelector(id + " .dropzone-start").onclick = function () { myDropzone4.enqueueFile(file); };
            $(document).find(id + ' .dropzone-item').css('display', '');
            $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'inline-block');
        });

        // Update the total progress bar
        myDropzone4.on("totaluploadprogress", function (progress) {
            $(this).find(id + " .progress-bar").css('width', progress + "%");
        });

        myDropzone4.on("sending", function (file) {
            // Show the total progress bar when upload starts
            $(id + " .progress-bar").css('opacity', '1');
            // And disable the start button
            file.previewElement.querySelector(id + " .dropzone-start").setAttribute("disabled", "disabled");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone4.on("complete", function (progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function () {
                $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress, " + thisProgressBar + " .dropzone-start").css('opacity', '0');
            }, 300)

        });

        // Setup the buttons for all transfers
        document.querySelector(id + " .dropzone-upload").onclick = function () {
            myDropzone4.enqueueFiles(myDropzone4.getFilesWithStatus(Dropzone.ADDED));
        };

        // Setup the button for remove all files
        document.querySelector(id + " .dropzone-remove-all").onclick = function () {
            $.ajax({
                type: "POST",
                url: "/api/DosyaSil", //silme olayý gelecek
                data: {
                    "data": "dosya106-adi",
                },
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                success: function (result) {
                    $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
                },
                error: function (req, status, error) {
                    console.log("hata");
                }
            });
            myDropzone4.removeAllFiles(true);
        };

        // On all files completed upload
        myDropzone4.on("queuecomplete", function (progress) {
            $(id + " .dropzone-upload").css('display', 'none');
        });

        // On all files removed
        myDropzone4.on("removedfile", function (file) {
            if (myDropzone4.files.length < 1) {
                $(id + " .dropzone-upload, " + id + " .dropzone-remove-all").css('display', 'none');
            }
        });
    }

    return {
        // public functions
        init: function () {
            demo100();
            demo101();
            demo102();
            demo103();
            demo104();
            demo105();
            demo106();
        }
    };
}();

KTUtil.ready(function () {
    KTDropzoneDemo.init();
});