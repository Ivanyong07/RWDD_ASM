<!-- =================================
* Filename : EventRegistrationControllers.php
* Date : 16/10/2026
* Author : Ivan Yong
* Description : count how many student are attend the event, and assign the marker
================================= -->

<?php
require_once __DIR__ . "/../config/Database.php";
class EventRegistrationControllers
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }


    // Create
    public function createUser(EventRegistrations $register)
    {

        $user_id = $register->getUserId();
        $event_id = $register->getEventId();
        $attended = $register->getAttended();
        $verified_by = $register->getVerifiedBy();

        $stmt = mysqli_prepare($this->conn, "INSERT INTO event_registrations(user_id, event_id, attended, verified_by) VALUES (?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "iiis", $user_id, $event_id, $attended, $verified_by);
        mysqli_stmt_execute($stmt);
        return mysqli_insert_id($this->conn);
    }

    // Delete
    public function deleteEventRegistration(int $registration_id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM event_registrations WHERE registration_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $registration_id);
        mysqli_stmt_execute($stmt);
        return mysqli_stmt_affected_rows($stmt);
    }

    // Update
    public function updateEventRegistration(int $registration_id, int $user_id, int $event_id, int $attended, string $verified_by)
    {
        $stmt = mysqli_prepare($this->conn, "UPDATE event_registrations SET user_id = ?, event_id = ?, attended = ?, verified_by = ? WHERE registration_id = ?");
        mysqli_stmt_bind_param($stmt, "iiisi", $registration_id, $user_id, $event_id, $attended, $verified_by, $registration_id);
        mysqli_stmt_execute($stmt);
        return mysqli_stmt_affected_rows($stmt);
    }

    // Read one
    public function getUserEventRegistration(int $registration_id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT registration_id, user_id, event_id, attended, verified_by FROM event_registrations WHERE registration_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $registration_id);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    // Read All
    public function getAllEventRegistration()
    {
        $result = mysqli_query($this->conn, "SELECT registration_id, user_id, event_id, attended, verified_by FROM event_registrations");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
}
