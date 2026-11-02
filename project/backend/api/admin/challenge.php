<?php

require_once __DIR__  . "/../../config/Database.php";
require_once __DIR__ . "/../../controllers/ChallengeControllers.php";
require_once __DIR__ . "/../../model/Challenge.php";

header("Content-Type: application/json");

$method = $_POST["_method"] ?? $_SERVER["REQUEST_METHOD"];
$controllers = new ChallengeController($conn);

$data = json_decode(file_get_contents("php://input"), true);

$id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);

switch ($method) {

    case "GET":
        $result = $controllers->getAllChallenge();

        echo json_encode(["success" => true, "data" => $result]);
        break;

    case "POST":

        session_start();

        $title = $_POST["title"];
        $description = $_POST["description"];
        $category = $_POST["category"];
        $points_reward = (int)$_POST["points_reward"];
        $xp_reward = (int)$_POST["xp_reward"];
        $deadline = $_POST["deadline"];
        $centre_id = (int)$_POST["centre_id"];
        $created_by = (int)$_SESSION["user_id"];


        $challenge = new Challenge(
            $title,
            $description,
            $category,
            $points_reward,
            $xp_reward,
            $deadline,
            $centre_id,
            $created_by
        );
        $controllers->createChallenge($challenge);


        header("Location: ../../../frontend/admin/challenges.php");
        exit;

    case "PUT":

        $challenge_id = $_POST["challenge_id"];
        $title = $_POST["title"];
        $description = $_POST["description"];
        $category = $_POST["category"];
        $points_reward = $_POST["points_reward"];
        $xp_reward = $_POST["xp_reward"];
        $deadline = $_POST["deadline"];
        $centre_id = $_POST["centre_id"];

        $challenge = new Challenge($title, $description, $category, $points_reward, $xp_reward, $deadline, $centre_id, $created_by);
        $controllers->createChallenge($challenge);

        break;

    case "DELETE":

        if (!$id) {
            http_response_code(400);

            echo json_encode([
                "sucess" => false,
                "error" => "Invalid challenge ID"
            ]);
        }

        $result = $controllers->deleteChallenge($id);

        echo json_encode([
            "success" => $result,
            "message" => "Challenge deleted successfully"
        ]);
        break;
}
