<?php

require_once __DIR__ . "/../../config/Database.php";
require_once __DIR__ . "/../../controllers/DashboardControllers.php";
require_once __DIR__ . "/../../helpers/common.php";

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$method = $_POST["_method"] ?? $_SERVER["REQUEST_METHOD"];
$controllers = new DashboardController($conn);

header("Content-Type: application/json");

$userId = requireUser();

// where the pictures are saved on the computer, and the path that is saved in the database
$imageFolder = __DIR__ . "/../../../frontend/images/submissions/";

$imagePath = "images/submissions/";

switch ($method) {

    case "POST":

        $challengeId = (int)($_POST["challenge_id"] ?? 0);

        // check the challenge BEFORE saving the photo (must be joined and the time must still be running)
        $controllers->assertCanSubmit($userId, $challengeId);

        $photo = saveImage("photo", $imageFolder, $imagePath);

        if ($photo === null) {
            http_response_code(422);
            echo json_encode(["error" => "Please choose a photo to upload"]);
            exit;
        }

        if ($photo === false) {
            http_response_code(422);
            echo json_encode(["error" => "The photo must be a JPG, PNG or WEBP image of 2 MB or less"]);
            exit;
        }

        echo json_encode($controllers->createSubmission($userId, $challengeId, $photo));
        exit;

    default:

        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
}
