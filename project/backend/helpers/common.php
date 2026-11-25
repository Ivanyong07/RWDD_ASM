<?php

function goBack(string $location)
{
    header("Location: " . $location);
    exit;
}

function requireAdmin(string $redirectUrl)
{
    if (($_SESSION["role"] ?? "") !== "admin") {
        goBack($redirectUrl);
    }
}

function requireLogin()
{
    if (empty($_SESSION["user_id"])) {
        http_response_code(401);
        header("Content-Type: application/json");
        echo json_encode(["success" => false, "error" => "Not logged in"]);
        exit;
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
