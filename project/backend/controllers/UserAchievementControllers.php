<?php
// =================================
// * Filename : UserAchievementControllers.php
// * Date : 10/11/2026
// * Author : Ivan Yong
// * Description : For unlocking, getting and removing user achievements
// =================================

require_once __DIR__ . '/../model/UserAchievement.php';
require_once __DIR__ . "/../controllers/UserControllers.php";
require_once __DIR__ . "/../controllers/AchievementControllers.php";

class UserAchievementControllers
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Create (unlock an achievement for a user)
    public function createUserAchievement(UserAchievement $userAchievement)
    {
        $user_id        = $userAchievement->getUserId();
        $achievement_id = $userAchievement->getAchievementId();

        $stmt = mysqli_prepare($this->conn, "INSERT INTO user_achievement(user_id, achievement_id) VALUES (?,?)");
        mysqli_stmt_bind_param($stmt, "ii", $user_id, $achievement_id);

        // The table has a composite key and no auto-increment id, so return true/false
        return mysqli_stmt_execute($stmt);
    }

    public function checkAndUnlockedAchievement(int $user_id) {}

    public function getAllUserAchievement()
    {
        $result = mysqli_query($this->conn, "SELECT
            ua.user_id,
            u.username,
            ua.achievement_id,
            ua.unlocked_at,
            a.achievement_name,
            a.achievement_description,
            a.achievement_image,
            a.requirement_value
        FROM user_achievement ua
        JOIN achievement a
            ON a.achievement_id = ua.achievement_id
        JOIN user u
            ON u.user_id = ua.user_id");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function getUserAchievement(int $user_id) // display all the achievement unlocked by a user
    {
        $stmt = mysqli_prepare($this->conn, "SELECT ua.user_id, ua.achievement_id, ua.unlocked_at, a.achievement_name, 
        a.achievement_description, a.achievement_image, a.requirement_value FROM user_achievement ua JOIN achievement a ON 
        a.achievement_id = ua.achievement_id WHERE ua.user_id = ?");

        mysqli_stmt_bind_param($stmt, "i", $user_id);
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);

        return mysqli_fetch_assoc($result);
    }

    public function deleteUserAchievement(int $user_id, int $achievement_id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM user_achievement WHERE user_id = ? AND achievement_id = ?");
        mysqli_stmt_bind_param($stmt, "ii", $user_id, $achievement_id);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_stmt_affected_rows($stmt);
    }
}
