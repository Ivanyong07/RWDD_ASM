<?php

require_once __DIR__ . "/../../config/Database.php";
require_once __DIR__ . '/../../controllers/AchievementControllers.php';
require_once __DIR__ . '/../../model/Achievement.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header("Content-Type: application/json");

$method = $_POST["_method"] ?? $_SERVER["REQUEST_METHOD"];
$controllers = new AchievementControllers($conn);

$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);

switch ($method) {

    case "GET":

        $result = $controllers->getAllAchievement();

        $result = $controllers->getAllAchievement();

        echo json_encode(["success" => true, "data" => $result]);
        exit;

    case "POST":

        if (($_SESSION["role"] ?? "") !== "admin") {
            header("Location: ../../../frontend/admin/achievement.php?auth=not_allowed");
            exit;
        }

        $achievement_name = $_POST["achievement_name"];
        $achievement_description = $_POST["ahcievement_description"];
        $achievement_image = $_POST["achievement_image"];
        $requirement_value = (int)$_POST["requirement_value"];

        $achievement = new Achievement($achievement_name, $achievement_description, $achievement_image, $requirement_value);

        $result = $controllers->createAchievement($achievement);

        if ($result === false) {
            header("Location: ../../../frontend/admin/achievement.php?error=update_failed");
        } elseif ($result === 0) {
            header("Location: ../../../frontend/admin/achievement.php?error=no_changes");
        } else {
            header("Location: ../../../frontend/admin/achievement.php?success=updated");
        }

        exit;


    case "PUT":

        if (($_SESSION["role"] ?? "") !== "admin") {
            header("Location: ../../../frontend/admin/achievement.php?auth=not_allowed");
            exit;
        }

        if (!$id) {
            header("Location: ../../../frontend/admin/achievement.php?id_failed=invalid_id");
            exit;
        }

        $achievement = new Achievement(
            $_POST["achievement_name"],
            $_POST["achievement_description"],
            $_POST["achievement_image"],
            $_POST["requirement_value"]
        );

        $result = $controllers->updateAchievement($id, $achievement);
        if ($result === false || $result === 0) {
            header("Location: ../../../frontend/admin/achievement.php?error=update_failed");
        } else {
            header("Location: ../../../frontend/admin/achievement.php?success=updated");
        }

        exit;

    case "DELETE":

        if (($_SESSION["role"] ?? "") !== "admin") {
            header("Location: ../../../frontend/achievement.php?auth=not_allowed");
            exit;
        }

        if (!$id) {
            header("Location: ../../../frontend/achievement.php?id_failed=invalid_id");
            exit;
        }

        $result = $controllers->deleteAchievement($id);

        if ($result === false || $result === 0) {
            header("Location: ../../../frontend/admin/achievement.php?error=delete_failed");
        } else {
            header("Location: ../../../frontend/admin/achievement.php?success=deleted");
        }

        exit;
}
