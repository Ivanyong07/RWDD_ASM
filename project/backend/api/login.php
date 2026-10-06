<?php

session_start();

require_once "../validation/UserValidation.php";

$email = validateEmail($_POST["email"] ?? "");
$password = validatePassword($_POST["password"] ?? "");

if ($email == null && $password == null) {
    header("Location: ../../frontend/user/dashboard.html");
    exit;
}
