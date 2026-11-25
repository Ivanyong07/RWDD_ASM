<?php
// =================================
// * Filename : SeasonControllers.php
// * Date : 23/11/2026
// * Author : Ivan Yong
// * Description : For create, get, update and delete seasons
// =================================

require_once __DIR__ . '/../model/Season.php';

class SeasonControllers
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Create
    public function createSeason(Season $season)
    {
        $start_date = $season->getStartDate();
        $end_date   = $season->getEndDate();
        $is_active  = (int) $season->getIsActive();

        $stmt = mysqli_prepare($this->conn, "INSERT INTO season(start_date, end_date, is_active) VALUES (?,?,?)");
        mysqli_stmt_bind_param($stmt, "ssi", $start_date, $end_date, $is_active);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_insert_id($this->conn);
    }

    public function getAllSeason()
    {
        $result = mysqli_query($this->conn, "SELECT season_id, start_date, end_date, is_active FROM season");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function getSeasonId(int $season_id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT season_id, start_date, end_date, is_active FROM season WHERE season_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $season_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    public function getActiveSeason()
    {
        $result = mysqli_query($this->conn, "SELECT season_id, start_date, end_date, is_active FROM season WHERE is_active = 1 LIMIT 1");
        return mysqli_fetch_assoc($result);
    }

    public function updateSeason(int $season_id, Season $season)
    {
        $start_date = $season->getStartDate();
        $end_date   = $season->getEndDate();
        $is_active  = (int) $season->getIsActive();

        $stmt = mysqli_prepare(
            $this->conn,
            "UPDATE season
            SET start_date = ?, end_date = ?, is_active = ?
          WHERE season_id = ?"
        );
        mysqli_stmt_bind_param($stmt, "ssii", $start_date, $end_date, $is_active, $season_id);

        return mysqli_stmt_execute($stmt);
    }

    public function deleteSeason(int $season_id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM season WHERE season_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $season_id);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_stmt_affected_rows($stmt);
    }
}
