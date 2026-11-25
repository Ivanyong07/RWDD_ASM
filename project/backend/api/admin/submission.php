<?php

require_once __DIR__ . "/../../config/Database.php";
require_once __DIR__ . "/../../controllers/SubmissionControllers.php";
require_once __DIR__ . "/../../helpers/common.php";

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$method = $_POST["_method"] ?? $_SERVER["REQUEST_METHOD"];
$controllers = new SubmissionController($conn);

$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);

header("Content-Type: application/json");

$adminId = requireAdminApi();

switch ($method) {

    case "GET":

        $result = $controllers->getAllSubmission();

        // the photo is saved as images/submissions/xxx.jpg, the admin pages are one folder deeper
        foreach ($result as &$row) {
            $row["photo"] = $row["photo_path"] ? "../" . $row["photo_path"] : "";
            unset($row["photo_path"]);
        }
        unset($row);

        echo json_encode(["success" => true, "submission" => $result]);
        exit;

    case "PUT":

        // approve or reject: id, action ("approve" or "reject"), reason
        $action = $_POST["action"] ?? "";
        $reason = trim($_POST["reason"] ?? "");

        if ($id === false || $id === null || $id <= 0) {
            http_response_code(422);
            echo json_encode(["error" => "Invalid submission id"]);
            exit;
        }

        if (!in_array($action, ["approve", "reject"], true)) {
            http_response_code(422);
            echo json_encode(["error" => 'Action must be "approve" or "reject"']);
            exit;
        }

        $result = $controllers->reviewSubmission($id, $adminId, $action, $reason);

        echo json_encode(["success" => true, "data" => $result]);
        exit;

    default:

        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
}