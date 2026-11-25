<?php

require_once __DIR__ . "/../config/Database.php";
require_once __DIR__ . "/../controllers/UserAchievementControllers.php";
require_once __DIR__ . "/../model/UserAchievement.php";
require_once __DIR__ . "/../helpers/common.php";


if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$method = $_POST["_method"] ?? $_SERVER["REQUEST_METHOD"];
$controllers = new UserAchievementControllers($conn);


$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);

switch ($method) {

    case "GET":

        requireLogin();

        if ($_SESSION["role"] === "admin") {
            $result = $controllers->getAllUserAchievement();
        } else {
            $user_id = $_SESSION["user_id"];
            $result = $controllers->getUserAchievement($user_id);
        }

        echo json_encode(["success" => true, "data" => $result]);

        exit;

    case "POST":
        requireLogin();



    case "DELETE":
        requireAdmin("../../../frontend/admin/history.php?auth=not_allowed");

        if ($id === false || $id === null || $id <= 0) {
            goBack("../../frontend/admin/history.php?id_failed=invalid_id");
        } else {
            goBack("../../frontend/admin/history.php/success=deleted");
        }

        exit;
}
