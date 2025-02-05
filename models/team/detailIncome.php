<?php
    $bulan      = date("Y-m-d");
    $bln        = substr($bulan, 5,-3);
    $conv       = convertDateDBtoIndo($bulan);
    $sBulan     = substr($conv, 3, -5);
    $i = 1;
    // fb pusat
    $qfpBulan   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf, income_media.pemegang 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Facebook Pusat' AND MONTH(tanggal_tf)= '$bln' AND income_media.status = 'OK'");
    
    while ($ifpBulan = mysqli_fetch_array($qfpBulan)) {
        $i++;
        $incfpBulan      = $ifpBulan["jumlah_tf"];
        $totfpBulan[$i]  = $incfpBulan;
        $hifpBulan       = array_sum($totfpBulan);
    }

    $qfp   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf, income_media.pemegang 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Facebook Pusat' AND income_media.status = 'OK'");
    
    while ($ifp = mysqli_fetch_array($qfp)) {
        $i++;
        $incfp      = $ifp["jumlah_tf"];
        $totfp[$i]  = $incfp;
        $hifp       = array_sum($totfp);
    }

    // fb taman
    $qftBulan   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Facebook Taman' AND MONTH(tanggal_tf)= '$bln' AND income_media.status = 'OK'");

    while ($iftBulan = mysqli_fetch_array($qftBulan)) {
        $i++;
        $incftBulan      = $iftBulan["jumlah_tf"];
        $totftBulan[$i]  = $incftBulan;
        $hiftBulan       = array_sum($totftBulan);

    }

    $qft   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Facebook Taman' AND income_media.status = 'OK'");

    while ($ift = mysqli_fetch_array($qft)) {
        $i++;
        $incft      = $ift["jumlah_tf"];
        $totft[$i]  = $incft;
        $hift       = array_sum($totft);

    }

    // fb bogor
    $qfbBulan   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Facebook Bogor' AND MONTH(tanggal_tf)= '$bln' AND income_media.status = 'OK'");

    while ($ifbBulan = mysqli_fetch_array($qfbBulan)) {
        $i++;
        $incfbBulan      = $ifbBulan["jumlah_tf"];
        $totfbBulan[$i]  = $incfbBulan;
        $hifbBulan       = array_sum($totfbBulan);

    }

    $qfb   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Facebook Bogor' AND income_media.status = 'OK'");

    while ($ifb = mysqli_fetch_array($qfb)) {
        $i++;
        $incfb      = $ifb["jumlah_tf"];
        $totfb[$i]  = $incfb;
        $hifb       = array_sum($totfb);

    }

    // instagram bojong
    $qibBulan   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Instagram Bojong' AND MONTH(income_media.tanggal_tf)= '$bln' AND income_media.status = 'OK'");

    while ($iibBulan = mysqli_fetch_array($qibBulan)) {
        $i++;
        $incibBulan      = $iibBulan["jumlah_tf"];
        $totibBulan[$i]  = $incibBulan;
        $hiibBulan       = array_sum($totibBulan);

    }

    $qib   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Instagram Bojong' AND income_media.status = 'OK'");

    while ($iib = mysqli_fetch_array($qib)) {
        $i++;
        $incib      = $iib["jumlah_tf"];
        $totib[$i]  = $incib;
        $hiib       = array_sum($totib);

    }

    // instagram taman
    $qitBulan   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Instagram Taman' AND MONTH(tanggal_tf)= '$bln' AND income_media.status = 'OK'");

    while ($iitBulan = mysqli_fetch_array($qitBulan)) {
        $i++;
        $incitBulan      = $iitBulan["jumlah_tf"];
        $totitBulan[$i]  = $incitBulan;
        $hiitBulan       = array_sum($totitBulan);
    }

    $qit   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Instagram Taman' AND income_media.status = 'OK'");

    while ($iit = mysqli_fetch_array($qit)) {
        $i++;
        $incit      = $iit["jumlah_tf"];
        $totit[$i]  = $incit;
        $hiit       = array_sum($totit);
    }

    // instagram taman
    $qimBulan   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Instagram Meruyung' AND MONTH(tanggal_tf)= '$bln' AND income_media.status = 'OK'");

    while ($iimBulan = mysqli_fetch_array($qimBulan)) {
        $i++;
        $incimBulan      = $iimBulan["jumlah_tf"];
        $totimBulan[$i]  = $incimBulan;
        $hiimBulan       = array_sum($totimBulan);
    }

    $qim   = mysqli_query($conn, "SELECT data_akun.id_pengurus, data_akun.nama_akun, data_akun.team, income_media.jumlah_tf 
    FROM data_akun JOIN income_media ON income_media.nama_akun = data_akun.nama_akun WHERE data_akun.team = 'Instagram Meruyung' AND income_media.status = 'OK'");

    while ($iim = mysqli_fetch_array($qim)) {
        $i++;
        $incim      = $iim["jumlah_tf"];
        $totim[$i]  = $incim;
        $hiim       = array_sum($totim);
    }


?>

<div class="row pt-4">
    <?php if ($_SESSION["username"] == "facebook_depok") { ?>
    <div class="col-xxl-6 col-md-6">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Facebook Pusat
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hifpBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hifp, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xxl-6 col-md-6">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Facebook Taman
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hiftBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hift, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php } elseif ($_SESSION["username"] == "facebook_bogor" || $_SESSION["id_pengurus"] == "kepala_cabang") { ?>
    <div class="col-xxl-4 col-md-4">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Facebook Bogor
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hifbBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hifb, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php } elseif ($_SESSION["username"] == "instagram") { ?>
    <div class="col-xxl-4 col-md-4">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Instagram Bojong
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hiibBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hiib, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xxl-4 col-md-4">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Instagram Taman
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hiitBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hiit, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xxl-4 col-md-4">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Instagram Meruyung
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hiimBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hiim, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php } else { ?>
    <div class="col-xxl-4 col-md-4">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Facebook Pusat
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hifpBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hifp, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xxl-4 col-md-4">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Facebook Taman
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hiftBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hift, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xxl-4 col-md-4">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Facebook Bogor
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hifbBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hifb, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xxl-4 col-md-4">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Instagram Bojong
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hiibBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hiib, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xxl-4 col-md-4">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Instagram Taman
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hiitBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hiit, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xxl-4 col-md-4">
        <div class="card info-card customers-card">
            <div class="card-body">
                <h5 class="card-title">
                    Instagram Meruyung
                </h5>

                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-credit-card"></i>
                    </div>
                    <div class="ps-3">
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="<?= $sBulan; ?>">
                            Rp. <?= number_format($hiimBulan, 0,"." , "."); ?> <i
                                class="bi bi-question-diamond-fill"></i>
                        </h6>
                        <h6 data-bs-toggle="tooltip" data-bs-placement="right" title="Tahunan">
                            Rp. <?= number_format($hiim, 0,"." , "."); ?> <i class="bi bi-question-diamond-fill"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php } ?>
</div>