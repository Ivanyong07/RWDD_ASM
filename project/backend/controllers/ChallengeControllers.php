<?php
// =================================
// * Filename : ChallengeControllers.php
// * Date : 16/10/2026
// * Author : Ivan Yong
// * Description : Create challenge
// Get all challenges
// Get challenge by ID
// Update challenge
// Delete challenge
// ================================= 

require_once __DIR__ . "/../model/Challenges.php";

class ChallengeController
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function createChallenge(Challenges $challenge)
    {
        $title = $challenge->getTitle();
        $quantity = $challenge->getQuantity();
        $description = $challenge->getDescription();
        $category = $challenge->getCategory();
        $points_reward = $challenge->getPointsReward();
        $xp_reward = $challenge->getXpReward();
        $deadline = $challenge->getDeadline();
        $image = $challenge->getImage();
        $location = $challenge->getLocation();
        $created_by = $challenge->getCreatedBy();

        $stmt = mysqli_prepare($this->conn, "INSERT INTO challenges(title, quantity, description, category, points_reward, xp_reward, deadline, image, location,  created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "sissiisssi", $title, $quantity, $description, $category, $points_reward, $xp_reward, $deadline, $image, $location, $created_by);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_insert_id($this->conn);
    }

    public function getAllChallenge()
    {
        $result = mysqli_query($this->conn, "SELECT challenge_id, title, quantity, description, category, points_reward, xp_reward, deadline, image, location, created_by, created_at FROM challenges");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function deleteChallenge(int $challenge_id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM challenges WHERE challenge_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $challenge_id);
        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }
        return mysqli_stmt_affected_rows($stmt);
    }

    public function updateChallenge(int $challenge_id, Challenges $challenge)
    {
        $title = $challenge->getTitle();
        $quantity = $challenge->getQuantity();
        $description = $challenge->getDescription();
        $category = $challenge->getCategory();
        $points_reward = $challenge->getPointsReward();
        $xp_reward = $challenge->getXpReward();
        $deadline = $challenge->getDeadline();
        $location = $challenge->getLocation();
        $image = $challenge->getImage();
        $created_by = $challenge->getCreatedBy();

        $stmt = mysqli_prepare($this->conn, "UPDATE challenges SET title = ?, quantity = ?, description = ?, category = ?, points_reward = ?, xp_reward = ?, deadline = ?, image = ?, location = ?, created_by = ? WHERE challenge_id = ?");

        mysqli_stmt_bind_param($stmt, "sissiissssi", $title, $quantity, $description, $category, $points_reward, $xp_reward, $deadline, $image, $location, $created_by, $challenge_id);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_stmt_affected_rows($stmt);
    }

    public function getChallengeId(int $challenge_id)
    {

        $stmt = mysqli_prepare($this->conn, "SELECT challenge_id, title, quantity, description, category, points_reward, xp_reward, deadline, image, location, created_by, created_at FROM challenges WHERE challenge_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $challenge_id);
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    public function joinChallenge(int $user_id, int $challenge_id)
    {

        $stmt = mysqli_prepare($this->conn, "INSERT INTO submissions(user_id, challenge_id, status) VALUES (?, ?, pending)");
        mysqli_stmt_bind_param($stmt, "ii", $user_id, $challenge_id);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_insert_id($this->conn);
    }
}
