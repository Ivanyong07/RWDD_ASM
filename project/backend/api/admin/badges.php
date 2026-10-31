<?php

require_once "../../config/database.php";

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {

    case "GET":

        break;

    case "POST":

        break;


    case "PUT":

        break;

    case "DELETE":

        break;

    default:
        http_response_code(405);
        return "Method not allowd";
}
