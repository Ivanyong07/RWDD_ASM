<?php

session_start();
require_once "../validation/UserValidation.php";
$conn = null;
require "database.php";
require "controllers/UserControllers.php";

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = validateEmail(trim($_POST["email"] ?? ""));
    $password = validatePassword(trim($_POST("password") ?? ""));

    if ($email == "" || $email == null || $password == "" || $password == null) {
        $error = "Please fill in both line";
    } else {
        $controller = new UserControllers($conn);
        $user = $controller->getByEmail($email);

        if ($user && password_verify($password, $user["password"])) {
            session_regenerate_id(true);
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["role"] = $user["role"];

            if ($user["role"] == "admin") {
                header("Location: ../../frontend/admin/index.html");
            } else {
                header("Location: ../../frontend/user/index.html");
            }
        } else {
            $error = "Wrong username or password";
        }
    }
}
