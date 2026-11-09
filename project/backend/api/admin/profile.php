<?php

require_once __DIR__ . "/../../controllers/UserControllers.php";
require_once __DIR__ . "/../../config/Database.php";
require_once __DIR__ . "/../../model/Users.php";
require_once __DIR__ . "/../../validation/DataValidation.php";

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$user_id = $_SESSION["user_id"];


if (!$user_id) {
    http_response_code(401);
    header("Content-Type: application/json");
    echo json_encode([
        "success" => false,
        "error" => "Not logged in"
    ]);
    exit;
}

$method = $_POST["_method"] ?? $_SERVER["REQUEST_METHOD"];
$controllers = new UserControllers($conn);

switch ($method) {

    case "GET":

        header("Content-Type: application/json");

        $result = $controllers->getUserById($user_id);

        echo json_encode([
            "success" => true,
            "data" => $result
        ]);

        exit;

    case "PUT":


        $username = trim($_POST["username"] ?? "");
        $email = trim($_POST["email"] ?? "");
        $age = trim($_POST["age"] ?? "");
        $tp_number = trim($_POST["tp_number"] ?? "");
        $course = trim($_POST["course"] ?? "");

        if ($username === "" || $course === "" || validateEmail($email) !== null || validateAge($age) !== null || validateTpNumber($tp_number) != null) {
            header("Location: ../../../frontend/admin/profile.php?error=update_failed");
            exit;
        }

        if ($controllers->checkExistingUser($email, $tp_number)) {
            header("Location: ../../../frontend/admin/profile.php?error=already_used");
            exit;
        }

        $_SESSION["username"] = $username;

        header("Location: ../../../frontend/admin/profile.php?success=updated");
        exit;
}
