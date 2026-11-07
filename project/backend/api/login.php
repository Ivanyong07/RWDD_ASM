<?php

session_start();
require_once __DIR__ . "/../validation/DataValidation.php";
require __DIR__ . "/../config/Database.php";
require __DIR__ . "/../controllers/UserControllers.php";

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";

    $emailError = validateEmail($email);

    if ($emailError) {
        $error = $emailError;
    } else if ($password === "") {
        $error = "Please fill in both line";
    } else {
        $controller = new UserControllers($conn);

        $user = $controller->login($email, $password);

        if ($user) {
            session_regenerate_id(true);

            $_SESSION["user_id"] = $user["user_id"];
            $_SESSION["role"] = $user["role"];

            if ($user["role"] === "admin") {
                header("Location: ../../frontend/admin/index.php");
            } else {
                header("Location: ../../frontend/user/index.php");
            }
            exit;
        } else {
            $error = "Wrong email or password";
        }
    }
}

if ($error) {
    echo $error;
}

// $hash = password_hash("12345678", PASSWORD_DEFAULT);
// echo "{$hash} <br>";
// var_dump(password_verify("12345678", $hash));
