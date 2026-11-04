<?php

require_once __DIR__ . "/../../config/Database.php";
require_once __DIR__ . "/../../controllers/UserControllers.php";
require_once __DIR__ . "/../../model/User.php";

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header("Content-Type: application/json");

$method = $_POST["_method"] ?? $_SERVER["REQUEST_METHOD"];
$controllers = new UserControllers($conn);


$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);

switch ($method) {

    case "GET":

        $result = $controllers->getAllUser();

        echo json_encode([
            "success" => true,
            "data" => $result
        ]);

        break;

    case "POST":

        $username = $_POST["username"];
        $password = $_POST["password"];
        $email = $_POST["email"];
        $age = $_POST["age"];
        $tp_number = $_POST["tp_number"];
        $course = $_POST["course"];

        $user = new User($username, $password, $email, $age, $tp_number, $course, "seed", 0, 0, "user");

        $result = $controllers->createUser($user);

        if ($result > 0) {
            header("Location: ../../../frontend/admin/users.php?success=created");
        } else {
            header("Loction: ../../../frontend/admin/users.php?error=create_failed");
        }

        exit;

    case "PUT":

        if (($_SESSION["role"] ?? "") !== "admin") {
            header("Location: ../../../frontend/admin/users.php?auth=not_allowed");
            exit;
        }

        if (!$id) {
            header("Location: ../../../frontend/admin/users.php?id_failed=invalid_id");
            exit;
        }

        $user = new User(
            $_POST["username"],
            "",
            $_POST["email"],
            (int)$_POST["age"],
            $_POST["tp_number"],
            $_POST["course"],
            $_POST["rank"],
            (int)$_POST["total_xp"],
            (int)$_POST["points_balance"],
            $_POST["role"]
        );

        $result = $controllers->updateUser($id, $user);
        if ($result === false || $result === 0) {
            header("Location: ../../../frontend/admin/users.php?error=update_failed");
        } else {
            header("Location: ../../../frontend/admin/users.php?success=updated");
        }

        exit;


    case "DELETE":

        if (($_SESSION["role"] ?? "") !== "admin") {
            header("Location: ../../../frontend/admin/users.php?auth=not_allowed");
            exit;
        }

        if (!$id) {
            header("Location: ../../../frontend/users.php?id_failed=id_not_found");
            exit;
        }

        $result = $controllers->deleteUser($id);

        if ($result === false || $result === 0) {
            header("Location: ../../../frontend/admin/users.php?error=delete_failed");
        } else {
            header("Location: ../../../frontend/admin/users.php?success=deleted");
        }

        exit;
}
