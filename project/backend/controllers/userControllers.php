<?php
class UserControllers
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Create
    public function create($username, $password, $email, $age, $tp_number, $course, $created_at)
    {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = mysqli_prepare($this->conn, "INSERT INTO users(username, password, email, age, tp_number, course, created_at) VALUES (?,?,?,?,?,?,?)");
        mysqli_stmt_bind_param($stmt, "sssiss", $username, $hash, $email, $age, $tp_number, $course, $created_at);
        mysqli_stmt_execute($stmt);
        return mysqli_insert_id($this->conn);
    }

    // Read all
    public function getAll()
    {
        $result = mysqli_query($this->conn, "SELECT id, username, password, email, age, tp_number, course, created_at FROM users");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    //Read one
    public function getById($id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT id, username, password, email, age, tp_number, course, created_at FROM users WHERE id = ?");
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    // Update
    public function update($id, $username, $email, $age, $tp_number, $course, $created_at)
    {
        $stmt = mysqli_prepare($this->conn, "UPDATE users SET username = ?, email = ?, age = ?, tp_number = ?, course = ?, created_at = ? WHERE id = ?");
        mysqli_stmt_bind_param($stmt, "ssissi", $username, $email, $age, $tp_number, $course, $created_at, $id);
        mysqli_stmt_execute($stmt);
        return mysqli_stmt_affected_rows($stmt);
    }

    // Detele
    public function delete($id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM users WHERE id = ?");
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        return mysqli_stmt_affected_rows($stmt);
    }

    public function getByEmail($email)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT id = ?, role = ?, password = ? WHERE email = ?");
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }
}
