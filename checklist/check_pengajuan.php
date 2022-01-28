<?php
    if ($_GET["id_checklist"] == "checklist_pengajuan" || $_GET["id_checklist"] == "checklist_verifikasi" || $_GET["id_checklist"] == "checklist_laporan") {
        $q  = mysqli_query($conn, "SELECT * FROM 2022_program WHERE laporan = 'Belum Laporan' AND status = 'Pending' ORDER BY `tgl_pengajuan` DESC");
        $s = $q->num_rows;
        
        $q2  = mysqli_query($conn, "SELECT * FROM 2022_program WHERE laporan = 'Belum Laporan' AND status = 'OK' ORDER BY `tgl_pengajuan` DESC");
        $s2 = $q2->num_rows;

        $q3  = mysqli_query($conn, "SELECT * FROM 2022_program WHERE laporan = 'Menunggu Verifikasi' ORDER BY `tgl_pengajuan` DESC");
        $s3 = $q3->num_rows;

    } elseif ($_GET["id_checklist"] == "checklist_pengajuanPaudqu" || $_GET["id_checklist"] == "checklist_verifikasiPaudqu" || $_GET["id_checklist"] == "checklist_laporanPaudqu") {
        $q  = mysqli_query($conn, "SELECT * FROM 2022_paudqu WHERE laporan = 'Belum Laporan' AND status = 'Pending' ORDER BY `tgl_pengajuan` DESC");
        $s = $q->num_rows;
        
        $q2  = mysqli_query($conn, "SELECT * FROM 2022_paudqu WHERE laporan = 'Belum Laporan' AND status = 'OK' ORDER BY `tgl_pengajuan` DESC");
        $s2 = $q2->num_rows;

        $q3  = mysqli_query($conn, "SELECT * FROM 2022_paudqu WHERE laporan = 'Menunggu Verifikasi' ORDER BY `tgl_pengajuan` DESC");
        $s3 = $q3->num_rows;

    } elseif ($_GET["id_checklist"] == "checklist_pengajuanAset" || $_GET["id_checklist"] == "checklist_verifikasiAset" || $_GET["id_checklist"] == "checklist_laporanAset") {
        $q  = mysqli_query($conn, "SELECT * FROM 2022_aset_yayasan WHERE laporan = 'Belum Laporan' AND status = 'Pending' ORDER BY `tgl_dibuat` DESC");
        $s = $q->num_rows;
        
        $q2  = mysqli_query($conn, "SELECT * FROM 2022_aset_yayasan WHERE laporan = 'Belum Laporan' AND status = 'OK' ORDER BY `tgl_dibuat` DESC");
        $s2 = $q2->num_rows;

        $q3  = mysqli_query($conn, "SELECT * FROM 2022_aset_yayasan WHERE laporan = 'Menunggu Verifikasi' ORDER BY `tgl_dibuat` DESC");
        $s3 = $q3->num_rows;

    } elseif ($_GET["id_checklist"] == "checklist_pengajuanUangmakan" || $_GET["id_checklist"] == "checklist_verifikasiUangmakan" || $_GET["id_checklist"] == "checklist_laporanUangmakan") {
        $q  = mysqli_query($conn, "SELECT * FROM 2022_uang_makan WHERE laporan = 'Belum Laporan' AND status = 'Pending' ORDER BY `tgl_dibuat` DESC");
        $s = $q->num_rows;
        
        $q2  = mysqli_query($conn, "SELECT * FROM 2022_uang_makan WHERE laporan = 'Belum Laporan' AND status = 'OK' ORDER BY `tgl_dibuat` DESC");
        $s2 = $q2->num_rows;

        $q3  = mysqli_query($conn, "SELECT * FROM 2022_uang_makan WHERE laporan = 'Menunggu Verifikasi' ORDER BY `tgl_dibuat` DESC");
        $s3 = $q3->num_rows;
    
    } elseif ($_GET["id_checklist"] == "checklist_pengajuanGajikaryawan" || $_GET["id_checklist"] == "checklist_verifikasiGajikaryawan" || $_GET["id_checklist"] == "checklist_laporanGajikaryawan") {
        $q  = mysqli_query($conn, "SELECT * FROM 2022_gaji_karyawan WHERE laporan = 'Belum Laporan' AND status = 'Pending' ORDER BY `tgl_dibuat` DESC");
        $s = $q->num_rows;
        
        $q2  = mysqli_query($conn, "SELECT * FROM 2022_gaji_karyawan WHERE laporan = 'Belum Laporan' AND status = 'OK' ORDER BY `tgl_dibuat` DESC");
        $s2 = $q2->num_rows;

        $q3  = mysqli_query($conn, "SELECT * FROM 2022_gaji_karyawan WHERE laporan = 'Menunggu Verifikasi' ORDER BY `tgl_dibuat` DESC");
        $s3 = $q3->num_rows;

    } elseif ($_GET["id_checklist"] == "checklist_pengajuanAnggaranlain" || $_GET["id_checklist"] == "checklist_verifikasiAnggaranlain" || $_GET["id_checklist"] == "checklist_laporanAnggaranlain") {
        $q  = mysqli_query($conn, "SELECT * FROM 2022_anggaran_lain WHERE laporan = 'Belum Laporan' AND status = 'Pending' ORDER BY `tgl_dibuat` DESC");
        $s = $q->num_rows;
        
        $q2  = mysqli_query($conn, "SELECT * FROM 2022_anggaran_lain WHERE laporan = 'Belum Laporan' AND status = 'OK' ORDER BY `tgl_dibuat` DESC");
        $s2 = $q2->num_rows;

        $q3  = mysqli_query($conn, "SELECT * FROM 2022_anggaran_lain WHERE laporan = 'Menunggu Verifikasi' ORDER BY `tgl_dibuat` DESC");
        $s3 = $q3->num_rows;

    } elseif ($_GET["id_checklist"] == "checklist_pengajuanMaintenance" || $_GET["id_checklist"] == "checklist_verifikasiMaintenance" || $_GET["id_checklist"] == "checklist_laporanMaintenance") {
        $q  = mysqli_query($conn, "SELECT * FROM 2022_maintenance WHERE laporan = 'Belum Laporan' AND status = 'Pending' ORDER BY `tgl_dibuat` DESC");
        $s = $q->num_rows;
        
        $q2  = mysqli_query($conn, "SELECT * FROM 2022_maintenance WHERE laporan = 'Belum Laporan' AND status = 'OK' ORDER BY `tgl_dibuat` DESC");
        $s2 = $q2->num_rows;

        $q3  = mysqli_query($conn, "SELECT * FROM 2022_maintenance WHERE laporan = 'Menunggu Verifikasi' ORDER BY `tgl_dibuat` DESC");
        $s3 = $q3->num_rows;

    } elseif ($_GET["id_checklist"] == "checklist_pengajuanOperasional" || $_GET["id_checklist"] == "checklist_verifikasiOperasional" || $_GET["id_checklist"] == "checklist_laporanOperasional") {
        $q  = mysqli_query($conn, "SELECT * FROM 2022_operasional_yayasan WHERE laporan = 'Belum Laporan' AND status = 'Pending' ORDER BY `tgl_dibuat` DESC");
        $s = $q->num_rows;
        
        $q2  = mysqli_query($conn, "SELECT * FROM 2022_operasional_yayasan WHERE laporan = 'Belum Laporan' AND status = 'OK' ORDER BY `tgl_dibuat` DESC");
        $s2 = $q2->num_rows;

        $q3  = mysqli_query($conn, "SELECT * FROM 2022_operasional_yayasan WHERE laporan = 'Menunggu Verifikasi' ORDER BY `tgl_dibuat` DESC");
        $s3 = $q3->num_rows;

    } elseif ($_GET["id_checklist"] == "checklist_pemasukanMedia") {

        $q  = mysqli_query($conn, "SELECT * FROM 2022_income WHERE status = 'Menunggu Verifikasi' ORDER BY `tgl_pemasukan` DESC");
        $s = $q->num_rows;
        
        $q2  = mysqli_query($conn, "SELECT * FROM 2022_incometanparesi WHERE status = 'Menunggu Verifikasi' ORDER BY `tgl_pemasukan` DESC");
        $s2 = $q2->num_rows;
        
    } else {
        $q  = mysqli_query($conn, "SELECT * FROM 2022_logistik WHERE laporan = 'Belum Laporan' AND status = 'Pending' ORDER BY `tgl_pengajuan` DESC");
        $s = $q->num_rows;
        
        $q2  = mysqli_query($conn, "SELECT * FROM 2022_logistik WHERE laporan = 'Belum Laporan' AND status = 'OK' ORDER BY `tgl_pengajuan` DESC");
        $s2 = $q2->num_rows;

        $q3  = mysqli_query($conn, "SELECT * FROM 2022_logistik WHERE laporan = 'Menunggu Verifikasi' ORDER BY `tgl_pengajuan` DESC");
        $s3 = $q3->num_rows;
    }
// die(var_dump($s));
?>

<main id="main" class="main">
    <div class="pagetitle">
        <h1>Checklist Pengajuan & Laporan</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="<?= $_SESSION["username"] ?>.php">Dashboard</a></li>
                <li class="breadcrumb-item">Checklist</li>
                <li class="breadcrumb-item active">Pengajuan</li>
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <section class="section dashboard">
        <div class="row">
            <!-- Left side columns pengajuan-->
            <div class="col-lg-12" id="form-pengajuan">
                <div class="row">
                    <?php include '../models/checklist/pengajuan_models/pengajuan-nav.php'; ?>
                </div>

                <!-- Laporan  -->
                <div class="col-12">
                    <div class="card">
                        <?php if (
                            $_GET["id_checklist"] == "checklist_pengajuan" || 
                            $_GET["id_checklist"] == "checklist_verifikasi" || 
                            $_GET["id_checklist"] == "checklist_laporan" ||
                            $_GET["id_checklist"] == "checklist_pengajuanPaudqu" || 
                            $_GET["id_checklist"] == "checklist_verifikasiPaudqu" || 
                            $_GET["id_checklist"] == "checklist_laporanPaudqu"
                            ) { ?>
                        <?php include '../models/checklist/pengajuan_checklist/pengajuan_cekProgram.php'; ?>

                        <?php } elseif ($_GET["id_checklist"] == "checklist_pengajuanAset" || $_GET["id_checklist"] == "checklist_verifikasiAset" || $_GET["id_checklist"] == "checklist_laporanAset") { ?>
                        <?php include '../models/checklist/pengajuan_checklist/pengajuan_cekAset.php'; ?>

                        <?php } elseif ($_GET["id_checklist"] == "checklist_pengajuanUangmakan" || $_GET["id_checklist"] == "checklist_verifikasiUangmakan" || $_GET["id_checklist"] == "checklist_laporanUangmakan") { ?>
                        <?php include '../models/checklist/pengajuan_checklist/pengajuan_cekUangmakan.php'; ?>

                        <?php } elseif ($_GET["id_checklist"] == "checklist_pengajuanGajikaryawan" || $_GET["id_checklist"] == "checklist_verifikasiGajikaryawan" || $_GET["id_checklist"] == "checklist_laporanGajikaryawan") { ?>
                        <?php include '../models/checklist/pengajuan_checklist/pengajuan_cekGajikaryawan.php'; ?>

                        <?php } elseif ($_GET["id_checklist"] == "checklist_pengajuanAnggaranlain" || $_GET["id_checklist"] == "checklist_verifikasiAnggaranlain" || $_GET["id_checklist"] == "checklist_laporanAnggaranlain") { ?>
                        <?php include '../models/checklist/pengajuan_checklist/pengajuan_cekAnggaranlain.php'; ?>

                        <?php } elseif ($_GET["id_checklist"] == "checklist_pengajuanMaintenance" || $_GET["id_checklist"] == "checklist_verifikasiMaintenance" || $_GET["id_checklist"] == "checklist_laporanMaintenance") { ?>
                        <?php include '../models/checklist/pengajuan_checklist/pengajuan_cekMaintenance.php'; ?>

                        <?php } elseif ($_GET["id_checklist"] == "checklist_pengajuanOperasional" || $_GET["id_checklist"] == "checklist_verifikasiOperasional" || $_GET["id_checklist"] == "checklist_laporanOperasional") { ?>
                        <?php include '../models/checklist/pengajuan_checklist/pengajuan_cekOperasional.php'; ?>

                        <?php } elseif ($_GET["id_checklist"] == "checklist_pemasukanMedia" || $_GET["id_checklist"] == "checklist_pemasukanCashback") { ?>
                        <?php include '../models/checklist/pemasukan_checklist/pemasukan_cekPemasukan.php'; ?>

                        <?php } else { ?>
                        <?php include '../models/checklist/pengajuan_checklist/pengajuan_cekLogistik.php'; ?>
                        <?php } ?>
                    </div>
                </div><!-- End Laporan  -->
            </div><!-- End Left side columns -->
        </div>
    </section>
</main><!-- End #main -->