<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION["user_id"])) {
    header("Location: /RSWW/project/frontend/auth/index.html");
    exit;
}

if ($_SESSION["role"] !== "admin") {
    header("Location: /RSWW/project/frontend/user/index.php");
    exit;
}
