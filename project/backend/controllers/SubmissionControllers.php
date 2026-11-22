<?php
// =================================
// * Filename : SubmissionsControllers.php
// * Date : 10/11/2026
// * Author : Ivan Yong
// * Description : For create, get, update (verify) and delete submissions
// =================================

require_once __DIR__ . '/../model/Submissions.php';

class SubmissionsControllers
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Create
    public function createSubmission(Submissions $submission)
    {
        $user_id       = $submission->getUserId();
        $challenges_id = $submission->getChallengesId();
        $photo_path    = $submission->getPhotoPath();
        $status        = $submission->getStatus();

        $stmt = mysqli_prepare($this->conn, "INSERT INTO submissions(user_id, challenges_id, photo_path, status) VALUES (?,?,?,?)");
        mysqli_stmt_bind_param($stmt, "iiss", $user_id, $challenges_id, $photo_path, $status);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_insert_id($this->conn);
    }

    public function getAllSubmissions()
    {
        $result = mysqli_query($this->conn, "SELECT submission_id, user_id, challenges_id, photo_path, status, rejection_reason, verified_by, submitted_at, verified_at FROM submissions");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function getSubmissionId(int $submission_id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT submission_id, user_id, challenges_id, photo_path, status, rejection_reason, verified_by, submitted_at, verified_at FROM submissions WHERE submission_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $submission_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    public function getSubmissionsByUserId(int $user_id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT submission_id, user_id, challenges_id, photo_path, status, rejection_reason, verified_by, submitted_at, verified_at FROM submissions WHERE user_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $user_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function getSubmissionsByStatus(string $status)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT submission_id, user_id, challenges_id, photo_path, status, rejection_reason, verified_by, submitted_at, verified_at FROM submissions WHERE status = ?");
        mysqli_stmt_bind_param($stmt, "s", $status);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function updateSubmission(int $submission_id, Submissions $submission)
    {
        $photo_path       = $submission->getPhotoPath();
        $status           = $submission->getStatus();
        $rejection_reason = $submission->getRejectionReason();
        $verified_by      = $submission->getVerifiedBy();
        $verified_at      = $submission->getVerifiedAt();

        $stmt = mysqli_prepare(
            $this->conn,
            "UPDATE submissions
            SET photo_path = ?, status = ?, rejection_reason = ?,
                verified_by = ?, verified_at = ?
          WHERE submission_id = ?"
        );
        mysqli_stmt_bind_param($stmt, "sssisi", $photo_path, $status, $rejection_reason, $verified_by, $verified_at, $submission_id);

        return mysqli_stmt_execute($stmt);
    }

    public function deleteSubmission(int $submission_id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM submissions WHERE submission_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $submission_id);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_stmt_affected_rows($stmt);
    }
}
