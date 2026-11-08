<?php

require_once __DIR__ . "/../../config/Database.php";
require_once __DIR__ . '/../../controllers/AchievementControllers.php';
require_once __DIR__ . '/../../model/Achievement.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$method = $_POST["_method"] ?? $_SERVER["REQUEST_METHOD"];
$controllers = new AchievementControllers($conn);

$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);

// where the pictures are saved on the computer, and the path that is saved in the database
$imageFolder = __DIR__ . "/../../../frontend/images/achievement/";

$imagePath = "images/achievement/";

function goBack(string $query)
{
    header("Location: ../../../frontend/admin/achievement.php?" . $query);
    exit;
}

function requireAdmin()
{

    if (($_SESSION["role"] ?? "") !== "admin") {
        goBack("auth=not_allowed");
    }
}

function saveImage(string $field, string $folder, string $path)
{
    // check is the file is uploaded
    if (!isset($_FILES[$field]) || $_FILES[$field]["error"] === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    //store the field into $_FILES
    // [
    //     "name" => "photo.jpg",
    //     "type" => "image/jpeg",
    //     "tmp_name" => "/tmp/php123",
    //     "error" => 0,
    //     "size" => 102400
    // ]
    $file = $_FILES[$field];

    if ($file["error"] !== UPLOAD_ERR_OK || $file["size"] > 2 * 1024 * 1024) {
        return false;
    }

    $types = ["image/jpeg" => "jpg", "image/png" => "png", "image/webp" => "webp"];
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file["tmp_name"]);

    if (!isset($types[$mime])) {
        return false;
    }

    if (!is_dir($folder)) {
        mkdir($folder, 0777, true);
    }

    $name = bin2hex(random_bytes(8)) . "." . $types[$mime];

    if (!move_uploaded_file($file["tmp_name"], $folder . $name)) {
        return false;
    }

    return $path . $name;
}

switch ($method) {

    case "GET":

        header("Content-Type: application/json");

        $result = $controllers->getAllAchievement();

        echo json_encode(["success" => true, "data" => $result]);
        exit;

    case "POST":

        requireAdmin();

        $achievement_name = $_POST["achievement_name"];
        $achievement_description = $_POST["achievement_description"];
        $achievement_image = saveImage(
            "achievement_image",
            $imageFolder,
            $imagePath
        );

        if ($achievement_image === false) {
            goBack("error=invalid_image");
        }
        $requirement_value = (int)$_POST["requirement_value"];

        $achievement = new Achievement($achievement_name, $achievement_description, $achievement_image, $requirement_value);

        $result = $controllers->createAchievement($achievement);

        if ($result === false) {
            header("Location: ../../../frontend/admin/achievement.php?error=create_failed");
        } elseif ($result === 0) {
            header("Location: ../../../frontend/admin/achievement.php?error=no_changes");
        } else {
            header("Location: ../../../frontend/admin/achievement.php?success=created");
        }

        exit;


    case "PUT":

        requireAdmin();

        if (!$id) {
            header("Location: ../../../frontend/admin/achievement.php?id_failed=invalid_id");
            exit;
        }

        $achievement_image = saveImage(
            "achievement_image",
            $imageFolder,
            $imagePath
        );

        if ($achievement_image === false) {
            goBack("error=invalid_image");
        }

        $existingAchievement = $controllers->getAchievementId($id);

        if (!$existingAchievement) {
            goBack("error=achievement_not_found");
        }

        if ($achievement_image === null) {
            $achievement_image = $existingAchievement["achievement_image"];
        }

        $achievement = new Achievement(
            $_POST["achievement_name"],
            $_POST["achievement_description"],
            $achievement_image,
            $_POST["requirement_value"]
        );

        $result = $controllers->updateAchievement($id, $achievement);
        if ($result === false) {
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
