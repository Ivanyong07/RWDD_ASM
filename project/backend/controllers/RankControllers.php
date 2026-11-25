<?php
// =================================
// * Filename : RankControllers.php
// * Date : 23/11/2026
// * Author : Ivan Yong
// * Description : For create, get, update and delete ranks
// =================================

require_once __DIR__ . '/../model/Rank.php';

class RankControllers
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Create
    public function createRank(Rank $rank)
    {
        $rank_name  = $rank->getRankName();
        $xp_require = $rank->getXpRequire();

        // `rank` is a reserved word in MySQL 8, so it needs backticks
        $stmt = mysqli_prepare($this->conn, "INSERT INTO `rank`(rank_name, xp_require) VALUES (?,?)");
        mysqli_stmt_bind_param($stmt, "si", $rank_name, $xp_require);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_insert_id($this->conn);
    }

    public function getAllRank()
    {
        $result = mysqli_query($this->conn, "SELECT rank_id, rank_name, xp_require FROM `rank` ORDER BY xp_require ASC");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function getRankId(int $rank_id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT rank_id, rank_name, xp_require FROM `rank` WHERE rank_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $rank_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    public function updateRank(int $rank_id, Rank $rank)
    {
        $rank_name  = $rank->getRankName();
        $xp_require = $rank->getXpRequire();

        $stmt = mysqli_prepare(
            $this->conn,
            "UPDATE `rank`
            SET rank_name = ?, xp_require = ?
          WHERE rank_id = ?"
        );
        mysqli_stmt_bind_param($stmt, "sii", $rank_name, $xp_require, $rank_id);

        return mysqli_stmt_execute($stmt);
    }

    public function deleteRank(int $rank_id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM `rank` WHERE rank_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $rank_id);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_stmt_affected_rows($stmt);
    }
}
