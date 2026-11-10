<?php

require_once __DIR__ . "/../../config/Database.php";
require_once __DIR__ . "/../../controllers/RewardControllers.php";
require_once __DIR__ . "/../../model/Rewards.php";
require_once __DIR__ . "/../../helpers/common.php";

if (session_start() === PHP_SESSION_NONE) {
    session_start();
}

$method = $_POST["_method"] ?? $_SERVER["REQUEST_METHOD"];
$controllers = new RewardControllers($conn);

$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);

$imageFolder = __DIR__ . "/../../../frontend/images/rewards";

$imagePath = "images/rewards";

switch ($method) {
    case "GET":

        header("Content-Type: application/json");

        $result = $controllers->getAllReward();

        echo json_encode([
            "success" => true,
            "data" => $result
        ]);

        exit;

    case "POST":

        requireAdmin("../../../frontend/admin/rewards.php?auth=not_allowed");

        $reward_item = $_POST["reward_item"];
        $description = $_POST["description"];
        $points_cost = (int)$_POST["points_cost"];
        $stock = (int)$_POST["stock"];
        $image = saveImage("image", $imageFolder, $imagePath);

        if ($image === false) {
            goBack("../../../frontend/admin.rewards.php?error=image_failed");
        }

        $reward = new Rewards($reward_item, $description, $points_cost, $stock, $image);

        $result = $controllers->createReward($reward);

        if ($result === false) {
            goBack("../../../frontend/admin/rewards.php?error=create_failed");
        } elseif ($result === 0) {
            goBack("../../../frontend/admin/rewards.php?error=no_changes");
        } else {
            goBack("../../../frontend/admin/rewards.php?success=created");
        }

        exit;

    case "PUT":

        requireAdmin("../../../frontend/admin/rewards.php?auth=not_allowed");

        if ($id === false || $id === null || $id <= 0) {
            goBack("../../../frontend/admin/rewards.php?id_failed=invalid_id");
        }

        $image = saveImage(
            "image",
            $imageFolder,
            $imagePath
        );

        if ($image === false) {
            goBack("../../../frontend/admin/rewards.php?error=invalid_image");
        }

        $existingReward = $controllers->getRewardId($id);

        if (!$existingReward) {
            goBack("../../../frontend/admin/rewards.php?error=reward_not_found");
        }

        if ($image === null) {
            $image = $existingReward["image"];
        }

        $reward = new Rewards(
            $_POST["reward_item"],
            $_POST["description"],
            (int)$_POST["points_cost"],
            (int)$_POST["stock"],
            $image
        );

        $result = $controllers->updateReward($id, $reward);

        if ($result === false) {
            goBack("../../../frontend/admin/rewards.php?error=update_failed");
        } else {
            goBack("../../../frontend/admin/rewards.php?success=updated");
        }

        exit;

    case "DELETE":

        requireAdmin("../../../frontend/admin/rewards.php?auth=not_allowed");

        if ($id === false || $id === null || $id < 0) {
            goBack("../../../frontend/rewards.php?id_failed=invalid_id");
        }

        $result = $controllers->deleteReward($id);

        if ($result === false || $result === 0) {
            goBack("../../../frontend/admin/rewards.php?error=delete_failed");
        } else {
            goBack("../../../frontend/admin/rewards.php?success=deleted");
        }

        exit;
}
