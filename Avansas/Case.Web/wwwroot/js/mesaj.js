var frm = $('#YeniForm');
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
            if (data.durum == 'Basarili') {
                swal.fire("Kaydedildi!!", "Oluşturduğunuz sınav başarıyla kaydedildi.", "success").then((result) => {
                    if (result.value) {
                        window.location.href = "/Home";
                    }
                });
            } else {
                swal.fire("Hata!", data.mesaj, "error");
            }

        },
        error: function (data) {
            KTApp.unblockPage();
            alert(data);
            swal.fire("Hata!", data, "error");
        },
    });
});