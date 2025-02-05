<?php
/*
 * DataTables example server-side processing script.
 *
 * Please note that this script is intentionally extremely simple to show how
 * server-side processing can be implemented, and probably shouldn't be used as
 * the basis for a large complex system. It is suitable for simple use cases as
 * for learning.
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */
 
// DB table to use
$table = '2022_log_aktivity';
 
// Table's primary key
$primaryKey = 'id';
 
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array( 'db' => 'id', 'dt' => 0 ),
    array( 'db' => 'nama', 'dt' => 1 ),
    array( 'db' => 'posisi', 'dt' => 2 ),
    array( 'db' => 'ip',  'dt' => 3 ),
    array(
        'db'        => 'tanggal',
        'dt'        => 4,
        'formatter' => function( $d, $row ) {
            $tanggal = date( 'd F Y', strtotime($d));
            return $tanggal;
        }
    ),
    array(
        'db'        => 'tanggal',
        'dt'        => 5,
        'formatter' => function( $d, $row ) {
            $jam = date('H:i:s', strtotime($d));
            return $jam;
        }
    ),
    array(
        'db'        => 'aktivitas',     
        'dt'        => 6,
        'formatter' => function( $d, $row ) {
            $deskripsi = ucwords($d);
            return $deskripsi;
        }
    )
);
 
// SQL server connection information
$sql_details = array(
    'user' => 'root',
    'pass' => '',
    'db'   => 'ebudgeting',
    'host' => 'localhost'
);
 
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */
 
require( '../ssp.class.php' );
 
echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);