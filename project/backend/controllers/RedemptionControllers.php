<?php
// =================================
// * Filename : RedemptionsControllers.php
// * Date : 10/11/2026
// * Author : Ivan Yong
// * Description : For create, get, update and delete redemptions
// =================================

require_once __DIR__ . '/../model/Redemptions.php';

class RedemptionsControllers
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Create
    public function createRedemption(Redemptions $redemption)
    {
        $user_id      = $redemption->getUserId();
        $reward_id    = $redemption->getRewardId();
        $points_spent = $redemption->getPointsSpent();

        $stmt = mysqli_prepare($this->conn, "INSERT INTO redemptions(user_id, reward_id, points_spent) VALUES (?,?,?)");
        mysqli_stmt_bind_param($stmt, "iii", $user_id, $reward_id, $points_spent);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_insert_id($this->conn);
    }

    public function getAllRedemptions()
    {
        $result = mysqli_query($this->conn, "SELECT redemption_id, user_id, reward_id, points_spent, redeemed_at FROM redemptions");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function getRedemptionId(int $redemption_id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT redemption_id, user_id, reward_id, points_spent, redeemed_at FROM redemptions WHERE redemption_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $redemption_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    public function getRedemptionsByUserId(int $user_id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT redemption_id, user_id, reward_id, points_spent, redeemed_at FROM redemptions WHERE user_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $user_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function updateRedemption(int $redemption_id, Redemptions $redemption)
    {
        $user_id      = $redemption->getUserId();
        $reward_id    = $redemption->getRewardId();
        $points_spent = $redemption->getPointsSpent();

        $stmt = mysqli_prepare(
            $this->conn,
            "UPDATE redemptions
            SET user_id = ?, reward_id = ?, points_spent = ?
          WHERE redemption_id = ?"
        );
        mysqli_stmt_bind_param($stmt, "iiii", $user_id, $reward_id, $points_spent, $redemption_id);

        return mysqli_stmt_execute($stmt);
    }

    public function deleteRedemption(int $redemption_id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM redemptions WHERE redemption_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $redemption_id);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_stmt_affected_rows($stmt);
    }
}
