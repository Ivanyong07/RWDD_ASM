<!-- =================================
* Filename : EventControllers.php
* Date : 16/10/2026
* Author : Ivan Yong
* Description : create, edit, update, get all the events, and specific events
================================= -->

<?php

require_once __DIR__ . "/../config/Database.php";

class EventsControllers
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Create
    public function createEvents(Events $events)
    {
        $title = $events->getTitle();
        $location = $events->getLocation();
        $events_date = $events->getEventDate();
        $points_reward = $events->getPointsReward();
        $xp_reward = $events->getXpReward();
        $created_by = $events->getCreatedBy();

        $stmt = mysqli_prepare($this->conn, "INSERT INTO events(title, location, event_date, points_reward, xp_reward, created_by) VALUES (?,?,?,?,?)");
        mysqli_stmt_bind_param($stmt, "sssiis", $title, $location, $events_date, $points_reward, $xp_reward, $created_by);
        mysqli_stmt_execute($stmt);
        return mysqli_insert_id($this->conn);
    }

    // Read all
    public function getAll()
    {
        $result = mysqli_query($this->conn, "SELECT event_id, title, location, event_date, points_reward, xp_reward, created_by");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    // Read one
    public function getById(int $event_id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT event_id, title, location, event_date, points_reward, xp_reward, created_at FROM event WHERE event_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $event_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    // Update
    public function updateEvents(int $event_id, $title, $location, $event_date, $points_reward, $xp_reward)
    {
        $stmt = mysqli_prepare($this->conn, "UPDATE events SET title = ?, location = ?, event_date = ?, points_reward = ?, xp_reward = ?, created_by = ? WHERE event_id = ?");
        mysqli_stmt_bind_param($stmt, "sssiii", $title, $location, $event_date, $points_reward, $xp_reward, $created_by);
        mysqli_stmt_execute($stmt);
        return mysqli_stmt_affected_rows($stmt);
    }

    // Delete
    public function deleteEvents(int $event_id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM events WHERE event_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $event_id);
        mysqli_stmt_execute($stmt);
        return mysqli_stmt_affected_rows($stmt);
    }
}
