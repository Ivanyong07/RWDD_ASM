<?php

session_start();

require_once __DIR__ . "/../config/Database.php";
require_once __DIR__ . "/../controllers/UserControllers.php";
require_once __DIR__ . "/../validation/DataValidation.php";
require_once __DIR__ . "/../model/User.php";

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $username  = trim($_POST["username"] ?? "");
    $email     = trim($_POST["email"] ?? "");
    $password  = $_POST["password"] ?? "";
    $age       = trim($_POST["age"] ?? "");
    $tp_number = trim($_POST["tp_number"] ?? "");
    $course    = trim($_POST["course"] ?? "");

    $emailError    = validateEmail($email);
    $passwordError = validatePassword($password);
    $ageError      = validateAge($age);
    $tpError       = validateTpNumber($tp_number);


    if ($username === "") {
        $error = "Please enter a username";
    } elseif ($emailError !== null) {
        $error = $emailError;
    } elseif ($passwordError !== null) {
        $error = $passwordError;
    } elseif ($ageError !== null) {
        $error = $ageError;
    } elseif ($tpError !== null) {
        $error = $tpError;
    } elseif ($course === "") {
        $error = "Please enter a course";
    } else {
        $user = new User($username, $password, $email, (int)$age, $tp_number, $course);
        $controller = new UserControllers($conn);
        $newId = $controller->createUser($user);

        session_regenerate_id(true);
        $_SESSION["user_id"] = $newId;
        $_SESSION["role"] = "user";

        header("Location: /RSWW/project/frontend/auth/index.html");
        exit;
    }
}

if ($error) {
    echo $error;
}
