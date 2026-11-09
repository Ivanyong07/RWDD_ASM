<?php

require_once __DIR__ . "/../../config/Database.php";
require_once __DIR__ . '/../../controllers/AchievementControllers.php';
require_once __DIR__ . '/../../model/Achievement.php';
require_once __DIR__ . '/../../helpers/common.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$method = $_POST["_method"] ?? $_SERVER["REQUEST_METHOD"];
$controllers = new AchievementControllers($conn);

$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);

// where the pictures are saved on the computer, and the path that is saved in the database
$imageFolder = __DIR__ . "/../../../frontend/images/achievement/";

$imagePath = "images/achievement/";

switch ($method) {

    case "GET":

        header("Content-Type: application/json");

        $result = $controllers->getAllAchievement();

        echo json_encode(["success" => true, "data" => $result]);
        exit;

    case "POST":

        requireAdmin("../../../frontend/admin/achievement.php?auth=not_allowed");

        $achievement_name = $_POST["achievement_name"];
        $achievement_description = $_POST["achievement_description"];
        $achievement_image = saveImage(
            "achievement_image",
            $imageFolder,
            $imagePath
        );

        if ($achievement_image === false) {
            goBack("../../../frontend/admin/achievement.php?error=image_failed");
        }
        $requirement_value = (int)$_POST["requirement_value"];

        $achievement = new Achievement($achievement_name, $achievement_description, $requirement_value, $achievement_image);

        $result = $controllers->createAchievement($achievement);

        if ($result === false) {
            goBack("../../../frontend/admin/achievement.php?error=create_failed");
        } elseif ($result === 0) {
            goBack("../../../frontend/admin/achievement.php?error=no_changes");
        } else {
            goBack("../../../frontend/admin/achievement.php?success=created");
        }

        exit;


    case "PUT":

        requireAdmin("../../../frontend/admin/achievement.php?auth=not_allowed");

        if ($id === false || $id === null || $id <= 0) {
            goBack("../../../frontend/admin/achievement.php?id_failed=invalid_id");
        }

        $achievement_image = saveImage(
            "achievement_image",
            $imageFolder,
            $imagePath
        );

        if ($achievement_image === false) {
            goBack("../../../frontend/admin/achievement.php?error=invalid_image");
        }

        $existingAchievement = $controllers->getAchievementId($id);

        if (!$existingAchievement) {
            goBack("../../../frontend/admin/achievement.php?error=achievement_not_found");
        }

        if ($achievement_image === null) {
            $achievement_image = $existingAchievement["achievement_image"];
        }

        $achievement = new Achievement(
            $_POST["achievement_name"],
            $_POST["achievement_description"],
            (int)$_POST["requirement_value"],
            $achievement_image
        );

        $result = $controllers->updateAchievement($id, $achievement);
        if ($result === false) {
            goBack("../../../frontend/admin/achievement.php?error=update_failed");
        } else {
            goBack("../../../frontend/admin/achievement.php?success=updated");
        }

        exit;

    case "DELETE":

        requireAdmin("../../../frontend/admin/achievement.php?auth=not_allowed");

        if ($id === false || $id === null || $id <= 0) {
            goBack("../../../frontend/achievement.php?id_failed=invalid_id");
        }

        $result = $controllers->deleteAchievement($id);

        if ($result === false || $result === 0) {
            goBack("../../../frontend/admin/achievement.php?error=delete_failed");
        } else {
            goBack("../../../frontend/admin/achievement.php?success=deleted");
        }

        exit;
}
