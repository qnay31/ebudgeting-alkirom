$(document).ready(function () {
    $("#modalDaily").on("hidden.bs.modal", function () {
        $(this).find("form").trigger("reset");
        $("#modalDaily #teman").empty();
        $("#modalDaily #keterangan").empty();
        $("#modalDaily #divImageMediaPreview").empty();
    });

    $("#modalLaporan").on("hidden.bs.modal", function () {
        $(this).find("form").trigger("reset");
    });

    $(".akun_media").on("hidden.bs.modal", function () {
        $(this).find("form").trigger("reset");
        $(".akun_media .mID").empty();
    });

    $(".admin_rp").mask("000.000.000", {
        reverse: true,
    });

    $(".show").click(function () {
        var toggleId = "menu" + $(this).data("id");
        // console.log(toggleId);
        $("." + toggleId).slideToggle();
    });

    $(".showEdit").click(function () {
        var toggleId = "menuEdit" + $(this).data("id");
        // console.log(toggleId);
        $("." + toggleId).slideToggle();
    });

    $(".showIncome").click(function () {
        var toggleId = "incomeEdit" + $(this).data("id");
        // console.log(toggleId);
        $("." + toggleId).slideToggle();
    });

    if (readCookie("login") == "kepala_income") {
        $('#namaPengurus').select2({
            placeholder: "- Pilih nama pengurus -",
            allowClear: true,
            language: "id"
        });
    }
    console.log(readCookie("login"));
    $('[data-bs-toggle="popover"]').popover({
        placement: 'right',
        trigger: 'focus'
    });

    $('.chk_boxes1').click(function () {
        if ($(this).is(':checked')) {
            $(this).closest('tr').addClass('removeRow');
        } else {
            $(this).closest('tr').removeClass('removeRow');
        }
    });


    $('#btn_delete').click(function () {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            var id = [];

            $(':checkbox:checked').each(function (i) {
                id[i] = $(this).val();
            });

            if (id.length === 0) {
                alert("Pilih minimal satu data");
            } else {
                $.ajax({
                    url: '../teaming/deleteTeam.php',
                    method: 'POST',
                    data: {
                        id: id
                    },
                    success: function () {
                        for (var i = 0; i < id.length; i++) {
                            $('tr#' + id[i] + '').fadeOut('slow');
                        }
                    }
                });
            }
        } else {
            return false;
        }
    });

    $('.check_all').click(function () {
        $('.chk_boxes1').prop('checked', this.checked);
        if ($(this).is(':checked')) {
            $('.check').addClass('removeRow');
        } else {
            $('.check').removeClass('removeRow');
        }
    });

    // modal laporan program
    $(".view_data_program").click(function () {
        var data_id = $(this).data("id");
        $.ajax({
            url: "../models/resi/resi_program.php",
            method: "POST",
            data: {
                data_id: data_id,
            },
            success: function (data) {
                $("#detail_user_program").html(data);
                $("#dataModal_program").modal("show");
            },
        });
    });

    // modal lapran paudqu
    $(".view_data_paudqu").click(function () {
        var data_id = $(this).data("id");
        $.ajax({
            url: "../models/resi/resi_paudqu.php",
            method: "POST",
            data: {
                data_id: data_id,
            },
            success: function (data) {
                $("#detail_user_paudqu").html(data);
                $("#dataModal_paudqu").modal("show");
            },
        });
    });

    // modal laporan logistik
    $(".view_data_logistik").click(function () {
        var data_id = $(this).data("id");
        $.ajax({
            url: "../models/resi/resi_logistik.php",
            method: "POST",
            data: {
                data_id: data_id,
            },
            success: function (data) {
                $("#detail_user_logistik").html(data);
                $("#dataModal_logistik").modal("show");
            },
        });
    });

    $(".view_data_management").click(function () {
        var data_id = $(this).data("id");
        var data_management = $(this).data("management");
        $.ajax({
            url: "../models/resi/resi_management.php",
            method: "POST",
            data: {
                data_id: data_id,
                data_management: data_management,
            },
            success: function (data) {
                $("#detail_user_management").html(data);
                $("#dataModal_management").modal("show");
            },
        });
    });

    // modal media
    $(".view_data_media").click(function () {
        var data_id = $(this).data("id");
        $.ajax({
            url: "../models/resi/resi_media.php",
            method: "POST",
            data: {
                data_id: data_id,
            },
            success: function (data) {
                $("#detail_user_media").html(data);
                $("#dataModal_media").modal("show");
            },
        });
    });

    // modal operasional
    $(".view_data_operasional").click(function () {
        var data_id = $(this).data("id");
        $.ajax({
            url: "../resi/isi_resi_operasional.php",
            method: "POST",
            data: {
                data_id: data_id,
            },
            success: function (data) {
                $("#detail_user_operasional").html(data);
                $("#dataModal_operasional").modal("show");
            },
        });
    });

    $(".maintenance").click(function () {
        Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Masih tahap pengembangan!",
        });
    });

    function Capitalize(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    // Admin CrossCheck
    var table = $("#tabel-data_databaseCrossCheck").DataTable({
        scrollX: true,
        processing: true,
        serverSide: false,
        ajax: "../ajax/data_income.php",
        deferRender: true,
        scrollCollapse: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "Plfrtip",
        rowGroup: {
            // Uses the 'row group' plugin
            dataSrc: 7,
            startRender: null,
            endRender: function (rows, group) {
                var collapsed = !!collapsedGroups[group];

                rows.nodes().each(function (r) {
                    r.style.display = collapsed ? "none" : "";
                });

                var intVal = function (i) {
                    return typeof i === "string" ?
                        i.replace(/[\Rp,.]/g, "") * 1 :
                        typeof i === "number" ?
                        i :
                        0;
                };

                var salary = rows
                    .data()
                    .pluck(9)
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                salary = $.fn.dataTable.render.number(".", "", 0).display(salary);

                // Add category name to the <tr>. NOTE: Hardcoded colspan
                return $("<tr/>")
                    .append("<td> </td>")
                    .append(
                        '<td colspan="8">' +
                        group +
                        " (" +
                        rows.count() +
                        ") " +
                        "/ Income: " +
                        " " +
                        salary +
                        "</td>"
                    )
                    .append("<td> " + salary + " </td>");
            },
        },
        searchPanes: {
            orderable: false,
        },

        columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            },
            {
                width: 150,
                targets: 1,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 200,
                targets: 2,
            },
            {
                width: 200,
                targets: 3,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 50,
                targets: 4,
                render: function (data) {
                    return data == "OK" ?
                        '<center><span class="badge bg-success">' +
                        data +
                        "</span></center>" :
                        '<center><span class="badge bg-danger">' +
                        data +
                        "</span></center>";
                },
            },
            {
                width: 100,
                targets: 5,
                render: function (data) {
                    var btn =
                        '<center><a href="../models/base_admin/hapus_income.php?id_unik=' +
                        data +
                        '" onclick="return confirm(\'Data akan dihapus?\')" class="btn btn-danger btn-xs"><i class="bi bi-trash"></i></a></center>';
                    return btn;
                },
            },
            {
                width: 200,
                targets: 6,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 150,
                targets: 7,
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
            {
                width: 100,
                targets: 8,
            },
            {
                width: 150,
                targets: 9,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [1, 2, 3, 6, 7, 8],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [4, 5, 9],
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(9).footer()).html("Rp. " + rupiah + "");
        },
    });

    // tabel data verifikasi
    $("#tabel-data_verifikasi").DataTable({
        scrollX: true,
        columnDefs: [{
                width: "20%",
                targets: 1,
            },
            {
                width: "15%",
                targets: 2,
            },
            {
                width: "20%",
                targets: 5,
            },
            {
                width: "10%",
                targets: 6,
            },
            {
                width: "20%",
                targets: 7,
            },
            {
                width: "15%",
                targets: 8,
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(8, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(8).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_aset").DataTable({
        scrollX: true,
        // "autoWidth": true,
        columnDefs: [{
                width: "10%",
                targets: 1,
            },
            {
                width: "10%",
                targets: 2,
            },
            {
                width: "15%",
                targets: 4,
            },
            {
                width: "10%",
                targets: 5,
            },
            {
                width: "18%",
                targets: 6,
            },
            {
                width: "8%",
                targets: 7,
            },
            {
                width: "8%",
                targets: 8,
            },
            {
                width: "12%",
                targets: 9,
            },
            {
                width: "15%",
                targets: 10,
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total anggaran
            pageTotal = api
                .column(10, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(10).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_verifMedia").DataTable({
        scrollX: true,
        scrollCollapse: true,
        columnDefs: [{
                width: 150,
                targets: 1,
            },
            {
                width: 150,
                targets: 2,
            },
            {
                width: 200,
                targets: 3,
            },
            {
                width: 150,
                targets: 4,
            },
            {
                width: 150,
                targets: 5,
            },
            {
                width: 200,
                targets: 6,
            },
            {
                width: 150,
                targets: 7,
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_verifMedia2").DataTable({
        scrollX: true,
        scrollCollapse: true,
        columnDefs: [{
                width: 150,
                targets: 1,
            },
            {
                width: 150,
                targets: 2,
            },
            {
                width: 200,
                targets: 3,
            },
            {
                width: 150,
                targets: 4,
            },
            {
                width: 150,
                targets: 5,
            },
            {
                width: 200,
                targets: 6,
            },
            {
                width: 150,
                targets: 7,
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_verifCashback").DataTable({
        scrollX: true,
        columnDefs: [{
                width: "13%",
                targets: 1,
            },
            {
                width: "15%",
                targets: 2,
            },
            {
                width: "10%",
                targets: 3,
            },
            {
                width: "20%",
                targets: 4,
            },
            {
                width: "15%",
                targets: 5,
            },
            {
                width: "15%",
                targets: 6,
            },
            {
                width: "15%",
                targets: 7,
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_verifIncomeMedia").DataTable({
        dom: "Plfrtip",
        scrollX: true,
        columnDefs: [{
                width: "15%",
                targets: 1,
            },
            {
                width: "13%",
                targets: 2,
            },
            {
                width: "5%",
                targets: 3,
            },
            {
                width: "15%",
                targets: 4,
            },
            {
                width: "15%",
                targets: 5,
            },
            {
                width: "5%",
                targets: 6,
            },
            {
                width: "15%",
                targets: 7,
            },
            {
                width: "20%",
                targets: 8,
            },
            {
                width: "20%",
                targets: 9,
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [0, 1, 7, 8, 9],
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                    orderable: false,
                },
                targets: [2, 3, 4, 5, 6],
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");
        },
    });

    // tabel log history
    $("#tabel-log").DataTable({
        scrollX: true,
        processing: true,
        serverSide: true,
        scrollCollapse: true,
        deferRender: true,
        dom: "lfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        lengthMenu: [
            [10, 25, 50, 100, 1000000],
            [10, 25, 50, 100, "All"],
        ],
        ajax: "../ajax/data_log.php",
        order: [
            [4, "desc"]
        ],
        // "autoWidth": true,
        columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            },
            {
                targets: 1,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                targets: [4],
                orderData: [0, 4],
            },
            {
                targets: [5],
                orderData: [1, 5],
            },
        ],
    });

    // tabel log admin
    $("#tabel-adminLog").DataTable({
        scrollX: true,
        processing: true,
        serverSide: true,
        scrollCollapse: true,
        deferRender: true,
        dom: "lfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        lengthMenu: [
            [10, 25, 50, 100, 1000000],
            [10, 25, 50, 100, "All"],
        ],
        ajax: "../ajax/data_log.php",
        order: [
            [4, "desc"]
        ],
        // "autoWidth": true,
        columnDefs: [{
                targets: 0,
                render: function (data) {
                    var btn =
                        '<center><a href="../models/base_admin/hapus_log.php?id_unik=' +
                        data +
                        '" onclick="return confirm(\'Hapus log history ini?\')" class="btn btn-danger btn-xs"><i class="bi bi-trash"></i></a></center>';
                    return btn;
                },
            },
            {
                targets: 1,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                targets: [4],
                orderData: [0, 4],
            },
            {
                targets: [5],
                orderData: [1, 5],
            },
        ],
    });

    // tabel laporan
    $("#tabel-data_laporan").DataTable({
        scrollX: true,
        responsive: true,
        // "autoWidth": true,
        columnDefs: [{
                width: "15%",
                targets: 1,
            },
            {
                width: "15%",
                targets: 2,
            },
            {
                width: "25%",
                targets: 4,
            },
            {
                width: "15%",
                targets: 6,
            },
            {
                width: "15%",
                targets: 7,
            },
            {
                width: "15%",
                targets: 8,
            },
        ],

        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };
            // Total over this page
            pageTotal = api
                .column(5, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(5).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(9).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(10, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(10).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_lapAset").DataTable({
        scrollX: true,
        responsive: true,
        // "autoWidth": true,
        columnDefs: [{
                width: "15%",
                targets: 1,
            },
            {
                width: "15%",
                targets: 2,
            },
            {
                width: "25%",
                targets: 4,
            },
            {
                width: "15%",
                targets: 6,
            },
            {
                width: "15%",
                targets: 7,
            },
            {
                width: "15%",
                targets: 8,
            },
        ],

        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };
            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html(rupiah + " Pcs");

            // Total over this page
            pageTotal = api
                .column(8, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(8).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(12, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(12).footer()).html(rupiah + " Pcs");

            // Total over this page
            pageTotal = api
                .column(13, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(13).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(14, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(14).footer()).html("Rp. " + rupiah + "");
        },
    });

    // tabel laporan cabang
    $("#tabel-data_lapCabang").DataTable({
        scrollX: true,
        responsive: true,
        // "autoWidth": true,
        columnDefs: [{
                width: "15%",
                targets: 1,
            },
            {
                width: "15%",
                targets: 2,
            },
            {
                width: "25%",
                targets: 4,
            },
            {
                width: "15%",
                targets: 6,
            },
            {
                width: "15%",
                targets: 7,
            },
            {
                width: "15%",
                targets: 8,
            },
        ],

        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };
            // Total over this page
            pageTotal = api
                .column(6, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(6).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(10, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(10).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(11, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(11).footer()).html("Rp. " + rupiah + "");
        },
    });

    // tabel database laporan
    $("#tabel-database_laporan").DataTable({
        scrollX: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        responsive: true,
        // "autoWidth": true,
        columnDefs: [{
                width: "15%",
                targets: 1,
            },
            {
                width: "15%",
                targets: 2,
            },
            {
                width: "25%",
                targets: 4,
            },
            {
                width: "15%",
                targets: 6,
            },
            {
                width: "15%",
                targets: 7,
            },
            {
                width: "15%",
                targets: 8,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [1],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [2, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                    orderable: false,
                },
                targets: [3],
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [4],
            },
        ],

        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };
            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(11, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(11).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(12, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(12).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-database_lapAset").DataTable({
        scrollX: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        responsive: true,
        // "autoWidth": true,
        columnDefs: [{
                width: "15%",
                targets: 1,
            },
            {
                width: "15%",
                targets: 2,
            },
            {
                width: "25%",
                targets: 4,
            },
            {
                width: "15%",
                targets: 6,
            },
            {
                width: "15%",
                targets: 7,
            },
            {
                width: "15%",
                targets: 8,
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [1],
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [2],
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                    orderable: false,
                },
                targets: [4],
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [5],
            },
        ],

        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };
            // Total over this page
            pageTotal = api
                .column(8, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(8).footer()).html(rupiah + " Pcs");

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(9).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(12, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(12).footer()).html(rupiah + " Pcs");

            // Total over this page
            pageTotal = api
                .column(14, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(14).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(15, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(15).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_databaseIncome").DataTable({
        scrollX: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        columnDefs: [{
                width: "10%",
                targets: 1,
            },
            {
                width: "13%",
                targets: 2,
            },
            {
                width: "13%",
                targets: 4,
            },
            {
                width: "10%",
                targets: 6,
            },
            {
                width: "20%",
                targets: 7,
            },
            {
                width: "10%",
                targets: 8,
            },
            {
                width: "15%",
                targets: 9,
            },
            {
                width: "15%",
                targets: 10,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [1],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [2],
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                    orderable: false,
                },
                targets: [4],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [5],
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(6, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(6).footer()).html(rupiah + " Pcs");

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(9).footer()).html("Rp. " + rupiah + "");
        },
    });

    // admin database income media global
    $("#tabel-data_adminDatabaseMedia").DataTable({
        scrollX: true,
        processing: true,
        serverSide: true,
        scrollCollapse: true,
        ajax: "../ajax/data_incomeGlobal.php",
        lengthMenu: [
            [10, 25, 50, 100, 100000],
            [10, 25, 50, 100, "All"],
        ],
        dom: "lfrtip",
        order: [
            [5, "desc"]
        ],
        columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            },
            {
                width: "10%",
                targets: 1,
                render: function (data) {
                    return data == "Terverifikasi" ?
                        '<center><span class="badge bg-success">' +
                        data +
                        "</span></center>" :
                        '<center><span class="badge bg-danger">' +
                        data +
                        "</span></center>";
                },
            },
            {
                width: "13%",
                targets: 2,
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
            {
                width: "13%",
                targets: 4,
            },
            {
                width: "10%",
                targets: 6,
                render: function (data) {
                    var btn =
                        '<center><a href="../models/base_admin/status_income.php?id_unik=' +
                        data +
                        '" onclick="return confirm(\'Sudah yakin ganti status?\')" class="btn btn-success btn-xs"><i class="bi bi-arrow-left-right"></i></a></center>';
                    return btn;
                },
            },
            {
                width: "20%",
                targets: 7,
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_adminDatabaseMedia2").DataTable({
        scrollX: true,
        scrollX: true,
        processing: true,
        serverSide: true,
        scrollCollapse: true,
        ajax: "../ajax/data_incomeGlobalresi.php",
        lengthMenu: [
            [10, 25, 50, 100, 100000],
            [10, 25, 50, 100, "All"],
        ],
        dom: "lfrtip",
        order: [
            [5, "desc"]
        ],
        columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            },
            {
                width: "10%",
                targets: 1,
                render: function (data) {
                    return data == "Terverifikasi" ?
                        '<center><span class="badge bg-success">' +
                        data +
                        "</span></center>" :
                        '<center><span class="badge bg-danger">' +
                        data +
                        "</span></center>";
                },
            },
            {
                width: "13%",
                targets: 2,
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
            {
                width: "13%",
                targets: 4,
            },
            {
                width: "10%",
                targets: 6,
                render: function (data) {
                    var btn =
                        '<center><a href="../models/base_admin/status_incomeNonresi.php?id_unik=' +
                        data +
                        '" onclick="return confirm(\'Sudah yakin ganti status?\')" class="btn btn-success btn-xs"><i class="bi bi-arrow-left-right"></i></a></center>';
                    return btn;
                },
            },
            {
                width: "20%",
                targets: 7,
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");
        },
    });

    $(".databaseMedia").DataTable({
        scrollX: true,
        processing: true,
        serverSide: false,
        ajax: "../ajax/data_pemasukan.php",
        deferRender: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            },
            {
                width: "11%",
                targets: 1,
            },
            {
                width: "13%",
                targets: 2,
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
            {
                width: "15%",
                targets: 3,
            },
            {
                width: "13%",
                targets: 4,
            },
            {
                width: "13%",
                targets: 5,
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
            {
                width: "10%",
                targets: 6,
                render: function (data) {
                    var verif = '<span class="badge bg-success">' + data + "</span>";
                    return "<center>" + verif + "</center>";
                },
            },
            {
                width: "20%",
                targets: 7,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [3, 4, 5],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [1, 2, 6, 7],
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-detailProgram").DataTable({
        scrollX: true,
        lengthMenu: [
            [12, 25, 50, 100, -1],
            [12, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        columnDefs: [{
                width: "11%",
                targets: 1,
            },
            {
                width: "15%",
                targets: 2,
            },
            {
                width: "15%",
                targets: 3,
            },
            {
                width: "10%",
                targets: 4,
            },
            {
                width: "20%",
                targets: 5,
            },
            {
                width: "12%",
                targets: 6,
            },
            {
                width: "15%",
                targets: 7,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [1],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [2],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [3],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [4],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [5],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [6],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [6],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [7],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [8],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [9],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [10],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [11],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [12],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [13],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [14],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [15],
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(2, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(2).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(3, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(3).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(4, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(4).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(5, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(5).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(6, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(6).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(8, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(8).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(9).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(10, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(10).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(11, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(11).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(12, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(12).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(13, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(13).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(14, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(14).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(15, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(15).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-detailLogistik").DataTable({
        scrollX: true,
        lengthMenu: [
            [12, 25, 50, 100, -1],
            [12, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        columnDefs: [{
                width: "11%",
                targets: 1,
            },
            {
                width: "15%",
                targets: 2,
            },
            {
                width: "15%",
                targets: 3,
            },
            {
                width: "10%",
                targets: 4,
            },
            {
                width: "20%",
                targets: 5,
            },
            {
                width: "12%",
                targets: 6,
            },
            {
                width: "15%",
                targets: 7,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [1],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [2],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [3],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [4],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [5],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [6],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [6],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [7],
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(2, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(2).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(3, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(3).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(4, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(4).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(5, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(5).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(6, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(6).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_lapMedia").DataTable({
        fixedHeader: true,
        scrollX: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "Plfrtip",
        columnDefs: [{
                width: 150,
                targets: [1, 3, 5, 19],
            },
            {
                width: 100,
                targets: [2, 4],
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [3, 4],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [
                    1,
                    2,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                ],
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(8, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(8).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }

            // Update footer
            $(api.column(9).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(10, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                number = number_string.substr(1),
                sisa = number.length % 3,
                rupiah = number.substr(0, sisa),
                ribuan = number.substr(sisa).match(/\d{3}/g);
            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }

            // Update footer
            $(api.column(10).footer()).html("-" + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(11, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(11).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(12, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(12).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(13, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(13).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(14, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(14).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(15, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(15).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(16, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(16).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(17, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(17).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(18, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(18).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(19, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(19).footer()).html(rupiah + "");
        },
    });

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    function readCookie(name) {
        name += '=';
        for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--)
            if (!ca[i].indexOf(name))
                return ca[i].replace(name, '');
    }

    $("#tabel-admin_lapMedia").DataTable({
        processing: true,
        serverSide: false,
        ajax: "../ajax/data_laporan.php",
        deferRender: true,
        scrollX: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            },
            {
                targets: 1,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 200,
                targets: 3,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                targets: 4,
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
            {
                targets: 5,
                render: function (data) {
                    var username = readCookie("login");
                    var btn =
                        username == "admin_web" ?
                        '<center><a href="../models/mediaSosial/hapus_laporan.php?id_unik=' +
                        data +
                        ' " onclick="return confirm(\'Laporan akan dihapur?\')" class="btn btn-danger btn-xs"><i class="bi bi-trash"></i></a></center>' :
                        '<center><a href="../admin/' +
                        username +
                        ".php?id_forms=edit_laporanMedia&id_unik=" +
                        data +
                        ' " onclick="return confirm(\'Laporan akan diedit?\')" class="btn btn-primary btn-xs"><i class="bi bi-pencil"></i></a> | <a href="../models/mediaSosial/hapus_laporan.php?id_unik=' +
                        data +
                        ' " onclick="return confirm(\'Laporan akan dihapur?\')" class="btn btn-danger btn-xs"><i class="bi bi-trash"></i></a></center>';
                    return btn;
                },
            },
            {
                width: 150,
                targets: [1, 5, 19],
            },
            {
                width: 100,
                targets: [2, 4],
            },
            {
                width: 50,
                targets: 11,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                    orderable: false,
                },
                targets: [1, 3, 4, 2, 5],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: 6,
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                render: function (data) {
                    return "<center>" + formatNumber(data) + "</center>";
                },
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(8, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(8).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }

            // Update footer
            $(api.column(9).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(10, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                number = number_string.substr(1),
                sisa = number.length % 3,
                rupiah = number.substr(0, sisa),
                ribuan = number.substr(sisa).match(/\d{3}/g);
            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }

            // Update footer
            $(api.column(10).footer()).html("-" + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(11, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(11).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(12, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(12).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(13, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(13).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(14, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(14).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(15, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(15).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(16, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(16).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(17, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(17).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(18, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(18).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(19, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(19).footer()).html(rupiah + "");
        },
    });

    $("#tabel-database_lapMedia").DataTable({
        processing: true,
        serverSide: false,
        ajax: "../ajax/data_laporan.php",
        deferRender: true,
        scrollX: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            },
            {
                targets: 1,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 200,
                targets: 3,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                targets: 4,
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
            {
                width: 150,
                targets: [1, 5, 19],
            },
            {
                width: 100,
                targets: [2, 4],
            },
            {
                width: 50,
                targets: 11,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                    orderable: false,
                },
                targets: [1, 3, 4, 2, 5],
            },
            {
                targets: 5,
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: 6,
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                render: function (data) {
                    return "<center>" + formatNumber(data) + "</center>";
                },
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(8, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(8).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }

            // Update footer
            $(api.column(9).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(10, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                number = number_string.substr(1),
                sisa = number.length % 3,
                rupiah = number.substr(0, sisa),
                ribuan = number.substr(sisa).match(/\d{3}/g);
            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }

            // Update footer
            $(api.column(10).footer()).html("-" + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(11, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(11).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(12, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(12).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(13, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(13).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(14, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(14).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(15, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(15).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(16, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(16).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(17, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(17).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(18, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(18).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(19, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(19).footer()).html(rupiah + "");
        },
    });

    $("#tabel-database_lapMedia2").DataTable({
        scrollX: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "Blfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        columnDefs: [{
                width: 150,
                targets: [1, 3, 18],
            },
            {
                width: 100,
                targets: [2, 4],
            },
            {
                width: 50,
                targets: 10,
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(8, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(8).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                number = number_string.substr(1),
                sisa = number.length % 3,
                rupiah = number.substr(0, sisa),
                ribuan = number.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(9).footer()).html("-" + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(10, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(10).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(11, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(11).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(12, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(12).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(13, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(13).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(14, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(14).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(15, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(15).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(16, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(16).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(17, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(17).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(18, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(18).footer()).html(rupiah + "");
        },
    });

    $("#tabel-detailMedia").DataTable({
        scrollX: true,
        lengthMenu: [
            [12, 25, 50, 100, -1],
            [12, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        columnDefs: [{
                width: "15%",
                targets: 1,
            },
            {
                width: "15%",
                targets: 2,
            },
            {
                width: "15%",
                targets: 3,
            },
            {
                width: "15%",
                targets: 4,
            },
            {
                width: "15%",
                targets: 5,
            },
            {
                width: "20%",
                targets: 6,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [1],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [2],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [3],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [4],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [5],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [6],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [6],
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(2, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(2).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(3, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(3).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(4, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(4).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(5, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(5).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(6, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(6).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_verifIncome").DataTable({
        scrollX: true,
        scrollCollapse: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "Plfrtip",
        columnDefs: [{
                width: "15%",
                targets: 1,
            },
            {
                width: "13%",
                targets: 2,
            },
            {
                width: "5%",
                targets: 3,
            },
            {
                width: "15%",
                targets: 4,
            },
            {
                width: "15%",
                targets: 5,
            },
            {
                width: "5%",
                targets: 6,
            },
            {
                width: "15%",
                targets: 7,
            },
            {
                width: "20%",
                targets: 8,
            },
            {
                width: "20%",
                targets: 9,
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [1, 3, 6, 7],
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [2, 4, 5],
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_databaseIncomeMedia2").DataTable({
        scrollX: true,
        processing: true,
        serverSide: false,
        scrollCollapse: true,
        deferRender: true,
        dom: "lfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        lengthMenu: [
            [10, 25, 50, 100, 1000000],
            [10, 25, 50, 100, "All"],
        ],
        ajax: "../ajax/data_income.php",

        columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            },
            {
                width: 150,
                targets: 1,
                orderData: [1, 0],
            },
            {
                searchable: false,
                orderable: false,
                targets: 2,
                width: 200,
                render: function (data) {
                    var key = "admin_web";
                    var btn =
                        '<center><a href="../admin/' +
                        key +
                        ".php?id_adminKey=edit_income&id_unik=" +
                        data +
                        '" onclick="return confirm(\'Data akan diedit oleh anda?\')" class="btn btn-primary btn-xs"><i class="bi bi-pencil"></i></a>|<a href="../models/base_admin/hapus_income.php?id_unik=' +
                        data +
                        '" onclick="return confirm(\'Sudah yakin dihapus\')" class="btn btn-danger btn-xs"><i class="bi bi-trash"></i></a></center>';
                    return btn;
                },
            },
            {
                width: 200,
                targets: 3,
                render: function (data) {
                    var textCapitalize =
                        '<span style="text-transform: capitalize">' + data + "</span>";
                    return textCapitalize;
                },
            },
            {
                width: 100,
                targets: 4,
                render: function (data) {
                    var success =
                        '<center><span class="badge bg-success">' +
                        data +
                        "</span></center>";
                    var pending =
                        '<center><span class="badge bg-warning">' +
                        data +
                        "</span></center>";
                    var batal =
                        '<center><span class="badge bg-danger">' +
                        data +
                        "</span></center>";
                    return data == "OK" ?
                        success :
                        data == "Dibatalkan" ?
                        batal :
                        pending;
                },
            },
            {
                width: 150,
                targets: 5,
            },
            {
                width: 200,
                targets: 6,
                render: function (data) {
                    var textCapitalize =
                        '<span style="text-transform: capitalize">' + data + "</span>";
                    return textCapitalize;
                },
            },
            {
                width: 150,
                targets: 7,
                orderData: [0, 7],
            },
            {
                width: 100,
                targets: 8,
            },
            {
                width: 150,
                targets: 9,
            },
        ],
        footerCallback: function () {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(9).footer()).html("Rp. " + rupiah + "");
        },
    });

    var collapsedGroups = {};
    var table = $("#tabel-data_databaseIncomeMedia").DataTable({
        scrollX: true,
        scrollCollapse: true,
        processing: true,
        serverSide: false,
        ajax: "../ajax/data_incomeYayasan.php",
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        order: [
            [1, "asc"]
        ],
        rowGroup: {
            // Uses the 'row group' plugin
            dataSrc: 1,
            startRender: null,
            endRender: function (rows, group) {
                var collapsed = !!collapsedGroups[group];

                rows.nodes().each(function (r) {
                    r.style.display = collapsed ? "none" : "";
                });

                var intVal = function (i) {
                    return typeof i === "string" ?
                        i.replace(/[\Rp,.]/g, "") * 1 :
                        typeof i === "number" ?
                        i :
                        0;
                };

                var salary = rows
                    .data()
                    .pluck(9)
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                salary = $.fn.dataTable.render.number(".", "", 0).display(salary);

                // Add category name to the <tr>. NOTE: Hardcoded colspan
                return $("<tr/>")
                    .append("<td> </td>")
                    .append(
                        '<td colspan="8">' +
                        group +
                        " (" +
                        rows.count() +
                        ") " +
                        "/ Income: " +
                        " " +
                        salary +
                        "</td>"
                    )
                    .append("<td> " + salary + " </td>")
                    .attr("data-name", group)
                    .toggleClass("collapsed", collapsed);
            },
        },
        searchPanes: {
            orderable: false,
        },
        columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            },
            {
                width: 150,
                targets: 1,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 200,
                targets: 2,
            },
            {
                width: 200,
                targets: 3,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 100,
                targets: 4,
            },
            {
                width: 150,
                targets: 5,
            },
            {
                width: 200,
                targets: 6,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 150,
                targets: 7,
            },
            {
                width: 100,
                targets: 8,
            },
            {
                width: 150,
                targets: 9,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [1, 2, 3, 5, 6, 7, 8],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [4, 9],
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(9).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-data_databaseIncomeMedia tbody").on(
        "click",
        "tr.group-end",
        function () {
            var name = $(this).data("name");
            collapsedGroups[name] = !collapsedGroups[name];
            table.draw(false);
        }
    );

    // data global tahunan
    $("#tabel-data_global_tahunan").DataTable({
        dom: "Blfrtip",
        buttons: ["excel", "pdf"],
        scrollX: true,
        // "autoWidth": true,
        columnDefs: [{
                width: "10%",
                targets: 1,
            },
            {
                width: "15%",
                targets: 2,
            },
            {
                width: "15%",
                targets: 4,
            },
            {
                width: "15%",
                targets: 3,
            },
            {
                width: "15%",
                targets: 4,
            },
            {
                width: "15%",
                targets: 5,
            },
            {
                width: "15%",
                targets: 6,
            },
            {
                width: "15%",
                targets: 7,
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total anggaran
            pageTotal = api
                .column(2, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(2).footer()).html("Rp. " + rupiah + "");

            // Total terpakai
            pageTotal2 = api
                .column(3, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string2 = pageTotal2.toString(),
                sisa2 = number_string2.length % 3,
                rupiah2 = number_string2.substr(0, sisa2),
                ribuan2 = number_string2.substr(sisa2).match(/\d{3}/g);

            if (ribuan2) {
                separator2 = sisa2 ? "." : "";
                rupiah2 += separator2 + ribuan2.join(".");
            }
            // Update footer
            $(api.column(3).footer()).html("Rp. " + rupiah2 + "");

            // Total cashbak
            pageTotal3 = api
                .column(4, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string3 = pageTotal3.toString(),
                sisa3 = number_string3.length % 3,
                rupiah3 = number_string3.substr(0, sisa3),
                ribuan3 = number_string3.substr(sisa3).match(/\d{3}/g);

            if (ribuan3) {
                separator3 = sisa3 ? "." : "";
                rupiah3 += separator3 + ribuan3.join(".");
            }
            // Update footer
            $(api.column(4).footer()).html("Rp. " + rupiah3 + "");

            pageTotal = api
                .column(5, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(5).footer()).html("Rp. " + rupiah + "");

            pageTotal = api
                .column(6, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(6).footer()).html("Rp. " + rupiah + "");

            pageTotal = api
                .column(7, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(7).footer()).html("Rp. " + rupiah + "");
        },
    });

    // tabel global bulanan
    $("#tabel-data_bulanan").DataTable({
        dom: "Blfrtip",
        buttons: ["excel", "pdf"],
        scrollX: true,
        autoWidth: true,
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this cashback
            pageTotal = api
                .column(5, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(5).footer()).html("Rp. " + rupiah + "");

            // Total over this anggaran
            pageTotal = api
                .column(8, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(8).footer()).html("Rp. " + rupiah + "");

            // Total over this anggaran
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(9).footer()).html("Rp. " + rupiah + "");
        },
    });

    // tabel akun pengurus
    $("#tabel-database_akunEbudget").DataTable({
        buttons: ["excel"],
        scrollX: true,
        autoWidth: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "Plfrtip",
        columnDefs: [{
                width: "10%",
                targets: 1,
            },
            {
                width: "20%",
                targets: 2,
            },
            {
                width: "10%",
                targets: 3,
            },
            {
                width: "20%",
                targets: 4,
            },
            {
                width: "20%",
                targets: 5,
            },
            {
                width: "20%",
                targets: 6,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [2],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [1, 3, 4, 5, 6],
            },
        ],
    });

    // dataSub
    $("#tabel-subIncomeMedia").DataTable({
        scrollX: true,
        scrollCollapse: true,
        processing: true,
        serverSide: false,
        ajax: "../ajax/data_subIncome.php",
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        order: [
            [1, "asc"]
        ],
        searchPanes: {
            orderable: false,
        },
        columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            },
            {
                width: 150,
                targets: 1,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 200,
                targets: 2,
            },
            {
                width: 200,
                targets: 3,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 100,
                targets: 4,
            },
            {
                width: 150,
                targets: 5,
            },
            {
                width: 200,
                targets: 6,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 150,
                targets: 7,
            },
            {
                width: 100,
                targets: 8,
            },
            {
                width: 150,
                targets: 9,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                },
                targets: [1, 2, 3, 5, 6, 7, 8],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [4, 9],
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(9).footer()).html("Rp. " + rupiah + "");
        },
    });

    $("#tabel-subLaporanMedia").DataTable({
        processing: true,
        serverSide: false,
        ajax: "../ajax/data_subLaporan.php",
        deferRender: true,
        scrollX: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
        ],
        dom: "PBlfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            },
            {
                targets: 1,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                width: 200,
                targets: 3,
                render: function (data) {
                    return Capitalize(data);
                },
            },
            {
                targets: 4,
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
            {
                width: 150,
                targets: [1, 5, 19],
            },
            {
                width: 100,
                targets: [2, 4],
            },
            {
                width: 50,
                targets: 11,
            },
            {
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                    orderable: false,
                },
                targets: [1, 3, 4, 2, 5],
            },
            {
                searchPanes: {
                    show: false,
                },
                targets: [6, 7, 8, , 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                render: function (data) {
                    return "<center>" + data + "</center>";
                },
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };

            // Total over this page
            pageTotal = api
                .column(8, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(8).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(9, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }

            // Update footer
            $(api.column(9).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(10, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                number = number_string.substr(1),
                sisa = number.length % 3,
                rupiah = number.substr(0, sisa),
                ribuan = number.substr(sisa).match(/\d{3}/g);
            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }

            // Update footer
            $(api.column(10).footer()).html("-" + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(11, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(11).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(12, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(12).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(13, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(13).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(14, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(14).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(15, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(15).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(16, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(16).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(17, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(17).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(18, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(18).footer()).html(rupiah + "");

            // Total over this page
            pageTotal = api
                .column(19, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(19).footer()).html(rupiah + "");
        },
    });

    $("#tabel-globalBulanan").DataTable({
        scrollX: true,
        responsive: true,
        dom: "Blfrtip",
        buttons: [{
                extend: "excelHtml5",
                footer: true,
            },
            "colvis",
        ],
        // "autoWidth": true,
        columnDefs: [{
                width: 150,
                targets: 1,
            },
            {
                width: 100,
                targets: 2,
            },
            {
                width: 150,
                targets: [3, 4, 5],
            },
        ],

        footerCallback: function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === "string" ?
                    i.replace(/[\Rp,.]/g, "") * 1 :
                    typeof i === "number" ?
                    i :
                    0;
            };
            // Total over this page
            pageTotal = api
                .column(3, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(3).footer()).html("Rp. " + rupiah);

            // Total over this page
            pageTotal = api
                .column(4, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(4).footer()).html("Rp. " + rupiah + "");

            // Total over this page
            pageTotal = api
                .column(5, {
                    page: "current",
                })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var number_string = pageTotal.toString(),
                sisa = number_string.length % 3,
                rupiah = number_string.substr(0, sisa),
                ribuan = number_string.substr(sisa).match(/\d{3}/g);

            if (ribuan) {
                separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }
            // Update footer
            $(api.column(5).footer()).html("Rp. " + rupiah + "");
        },
    });

    if (readCookie("login") == "kepala_income") {
        $("#tabel-dataTeamMedia").DataTable({
            scrollX: true,
            processing: true,
            serverSide: false,
            dom: "Plfrtip",
            ajax: "../ajax/data_pengurus.php",
            deferRender: true,
            'createdRow': function (row, data, dataIndex) {
                $(row).addClass('check');
            },
            // "autoWidth": true,
            columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            }, {
                targets: 1,
                width: 200,
                searchPanes: {
                    show: false,
                },
                render: function (data) {
                    return Capitalize(data);
                },
            }, {
                targets: 2,
                searchPanes: {
                    show: false,
                },
            }, {
                targets: 3,
                width: 200,
                searchPanes: {
                    show: false,
                },
                render: function (data) {
                    return Capitalize(data);
                },
            }, {
                targets: 4,
                width: 150,
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                    orderable: false,
                },
            }, {
                orderable: false,
                targets: 5,
                width: 50,
                render: function (data) {
                    return '<center><input type="checkbox" name="id[]" class="form-check-input chk_boxes1" value="' + data + '"/></center>';
                },
            }],
        });
    } else {
        $("#tabel-dataTeamMedia").DataTable({
            scrollX: true,
            processing: true,
            serverSide: false,
            dom: "Plfrtip",
            ajax: "../ajax/data_pengurus.php",
            deferRender: true,
            'createdRow': function (row, data, dataIndex) {
                $(row).addClass('check');
            },
            // "autoWidth": true,
            columnDefs: [{
                targets: 0,
                render: function (data, type, row, meta) {
                    var no = meta.row + meta.settings._iDisplayStart + 1;
                    return "<center>" + no + "</center>";
                },
            }, {
                targets: 1,
                width: 200,
                searchPanes: {
                    show: false,
                },
                render: function (data) {
                    return Capitalize(data);
                },
            }, {
                targets: 2,
                searchPanes: {
                    show: false,
                },
            }, {
                targets: 3,
                width: 200,
                searchPanes: {
                    show: false,
                },
                render: function (data) {
                    return Capitalize(data);
                },
            }, {
                targets: 4,
                width: 150,
                searchPanes: {
                    show: true,
                    initCollapsed: true,
                    orderable: false,
                },
            }],
        });
    }

});