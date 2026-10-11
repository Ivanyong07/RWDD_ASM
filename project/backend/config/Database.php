<?php

$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "fun_collectors";

try {
    $conn = mysqli_connect(
        $db_server,
        $db_user,
        $db_pass,
        $db_name
    );
    mysqli_set_charset($conn, "utf8mb");
} catch (mysqli_sql_exception $e) {
    die("Could not connect: " . $e->getMessage());
}
