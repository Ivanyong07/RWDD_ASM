<?php
// =================================
// * Filename : AchievementControllers.php
// * Date : 16/10/2026
// * Author : Ivan Yong
// * Description : For delete, login, get all list of users, and upate user
// =================================

require_once __DIR__ . '/../model/Achievement.php';

class AchievementControllers
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Create
    public function createAchievement(Achievement $achievement)
    {

        $achievement_name = $achievement->getAchievementName();
        $achievement_description = $achievement->getAchievementDescription();
        $achievement_image = $achievement->getAchievementImage();
        $requirement_value = $achievement->getRequirementValue();

        $stmt = mysqli_prepare($this->conn, "INSERT INTO achievement(achievement_name, achievement_description, achievement_image, requirement_value) VALUES (?,?,?,?)");
        mysqli_stmt_bind_param($stmt, "sssi", $achievement_name, $achievement_description, $achievement_image, $requirement_value);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_insert_id($this->conn);
    }

    public function getAllAchievement()
    {
        $result = mysqli_query($this->conn, "SELECT achievement_id, achievement_name, achievement_description, achievement_image, requirement_value FROM achievement");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function getAchievementId(int $achievement_id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT achievement_id, achievement_name, achievement_description, achievement_image, requirement_value FROM achievement WhERE achievement_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $achievement_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    public function updateAchievement(int $achievement_id, Achievement $achievement)
    {
        $name        = $achievement->getAchievementName();
        $description = $achievement->getAchievementDescription();
        $image       = $achievement->getAchievementImage();
        $requirement = $achievement->getRequirementValue();

        $stmt = mysqli_prepare(
            $this->conn,
            "UPDATE achievement
            SET achievement_name = ?, achievement_description = ?,
                achievement_image = ?, requirement_value = ?
          WHERE achievement_id = ?"
        );
        mysqli_stmt_bind_param($stmt, "sssii", $name, $description, $image, $requirement, $achievement_id);

        return mysqli_stmt_execute($stmt);
    }

    public function deleteAchievement(int $achievement_id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM achievement WHERE achievement_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $achievement_id);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_stmt_affected_rows($stmt);
    }
}
