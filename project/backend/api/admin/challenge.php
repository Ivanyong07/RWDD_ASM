<?php

require_once __DIR__  . "/../../config/Database.php";
require_once __DIR__ . "/../../controllers/ChallengeControllers.php";
require_once __DIR__ . "/../../model/Challenges.php";
require_once __DIR__ . "/../../helpers/common.php";

if (session_start() === PHP_SESSION_NONE) {
    session_start();
}

$method = $_POST["_method"] ?? $_SERVER["REQUEST_METHOD"];
$controllers = new ChallengeController($conn);

$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);

$imageFolder = __DIR__ . "/../../../frontend/images/challenges";

$imagePath = "images/challenge";

switch ($method) {

    case "GET":

        header("Content-Type: application/json");

        $result = $controllers->getAllChallenge();

        echo json_encode(["success" => true, "data" => $result]);
        exit;

    case "POST":

        requireAdmin("../../../frontend/admin/challenges.php?auth=not_allowed");

        $title = $_POST["title"];
        $quantity = (int)$_POST["quantity"];
        $description = $_POST["description"];
        $category = $_POST["category"];
        $points_reward = (int)$_POST["points_reward"];
        $xp_reward = (int)$_POST["xp_reward"];
        $deadline = $_POST["deadline"];
        $image = saveImage("image", $imageFolder, $imagePath);

        if ($image === false) {
            goBack("../../../frontend/admin/challenges.php?error=image_failed");
        }

        $location = $_POST["location"];
        $created_by = (int)$_SESSION["user_id"];

        $challenge = new Challenges(
            $title,
            $quantity,
            $description,
            $category,
            $points_reward,
            $xp_reward,
            $deadline,
            $location,
            $created_by,
            $image
        );
        $result = $controllers->createChallenge($challenge);


        if ($result === false) {
            goBack("../../../frontend/admin/challenges.php?error=create_failed");
        } elseif ($result === 0) {
            goBack("../../../frontend/admin/challenges.php?error=no_changes");
        } else {
            goBack("../../../frontend/admin/challenges.php?success=created");
        }
        exit;

    case "PUT":

        requireAdmin("../../../frontend/admin/challenges.php?auth=not_allowed");

        if ($id === false || $id === null || $id <= 0) {
            goBack("../../../frontend/admin/challenges.php?id_failed=invalid_id");
        }

        $image = saveImage("image", $imageFolder, $imagePath);

        if ($image === false) {
            goBack("../../../frontend/admin/challenges.php?invaid_image");
        }

        $existingChallenge = $controllers->getChallengeId($id);

        if (!$existingChallenge) {
            goBack("../../../frontend/admin/challenges.php?error=challenge_not_found");
        }

        if ($image === null) {
            $image = $existingChallenge["image"];
        }

        $challenge = new Challenges(
            $_POST["title"],
            (int)$_POST["quantity"],
            $_POST["description"],
            $_POST["category"],
            (int)$_POST["points_reward"],
            (int)$_POST["xp_reward"],
            $_POST["deadline"],
            $_POST["location"],
            (int)$_SESSION["created_by"],
            $image
        );

        $result = $controllers->updateChallenge($id, $challenge);
        if ($result === false) {
            goBack("../../../frontend/admin/challenge.php?error=update_failed");
        } else {
            goBack("../../../frontend/admin/challenge.php?success=updated");
        }

        exit;

    case "DELETE":

        requireAdmin("../../../frontend/admin/challenges.php?auth=not_allowed");

        if ($id === false || $id === null || $id <= 0) {
            goBack("../../../frontend/challenges.php?id_failed=invalid_id");
        }

        $result = $controllers->deleteChallenge($id);

        if ($result === false || $result === 0) {
            goBack("../../../frontend/admin/challenges.php?error=delete_failed");
        } else {
            goBack("../../../frontend/admin/challenges.php?success=deleted");
        }

        exit;
}
