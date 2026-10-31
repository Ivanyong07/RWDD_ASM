<!-- =================================
* Filename : ChallengeControllers.php
* Date : 16/10/2026
* Author : Ivan Yong
* Description : For delete, login, get all list of users, and upate challenge
================================= -->

<?php

require_once __DIR__ . "/../model/Challenge.php";

class ChallengeController
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function createChallenge(Challenge $challenge)
    {
        $title = $challenge->getTitle();
        $description = $challenge->getDescription();
        $category = $challenge->getCategory();
        $points_reward = $challenge->getPointsReward();
        $xp_reward = $challenge->getXpReward();
        $deadline = $challenge->getDeadline();
        $centre_id = $challenge->getCentreId();
        $created_by = $challenge->getCreatedBy();

        $stmt = mysqli_prepare($this->conn, "INSERT INTO challenge(title, description, category, points_reward, xp_reward, deadline, centre_id, created_by) VALUES (?,?,?,?,?,?,?,?)");
        mysqli_stmt_bind_param($stmt, "sssiisii", $title, $description, $category, $points_reward, $xp_reward, $deadline, $centre_id, $created_by);
        mysqli_stmt_execute($stmt);
        return mysqli_insert_id($this->conn);
    }

    public function getAllChallenge()
    {
        $result = mysqli_query($this->conn, "SELECT challenge_id, title, description, category, points_reward, xp_reward, deadline, centre_id, created_by FROM challenge");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function deleteChallenge(int $challenge_id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM challenge WHERE challenge_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $challenge_id);
        mysqli_stmt_execute($stmt);
        return mysqli_stmt_affected_rows($stmt);
    }

    public function updateChallenge(int $challenge_id, Challenge $challenge)
    {
        $title = $challenge->getTitle();
        $description = $challenge->getDescription();
        $category = $challenge->getCategory();
        $points_reward = $challenge->getPointsReward();
        $xp_reward = $challenge->getXpReward();
        $deadline = $challenge->getDeadline();
        $centre_id = $challenge->getCentreId();
        $created_by = $challenge->getCreatedBy();

        $stmt = mysqli_prepare($this->conn, "UPDATE challenge SET title = ?, description = ?, category = ?, points_reward = ?, xp_reward = ?, deadline = ?, centre_id = ?, created_by = ? WHERE challenge_id = ?");

        mysqli_stmt_bind_param($stmt, "sssiisiii", $title, $description, $category, $points_reward, $xp_reward, $deadline, $centre_id, $created_by, $challenge_id);

        mysqli_stmt_execute($stmt);

        return mysqli_stmt_affected_rows($stmt);
    }
}
