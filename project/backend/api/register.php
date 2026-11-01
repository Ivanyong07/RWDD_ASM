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

        $controller = new UserControllers($conn);
        $existingUser = $controller->checkExistingUser($email, $username, $password, $tp_number);

        if ($existingUser) {
            if ($existingUser["email"] === $email) {
                $error = "This email is already registered";
            } elseif ($existingUser["username"] === $username) {
                $error = "This username is aleady registered";
            } elseif ($existingUser["password"] === $password) {
                $error = "This password is already registered";
            } elseif ($existingUser["tp_number"] === $tp_number) {
                $error = "This Tp Number is already registered";
            }
        } else {
            $user = new Users($username, $password, $email, (int)$age, $tp_number, $course, "seed", 0, 0, "user");

            $newId = $controller->createUser($user);

            session_regenerate_id(true);
            $_SESSION["user_id"] = $newId;
            $_SESSION["role"] = "user";

            header("Location: /RSWW/project/frontend/user/index.php");
            exit;
        }
    }
}

if ($error) {
    header("Location: ../../frontend/auth/index.html?error=" . urlencode($error));
    exit;
}
