<!-- =================================
* Filename : UserControllers.php
* Date : 16/10/2026
* Author : Ivan Yong
* Description : For delete, login, get all list of users, and upate create users
================================= -->

<?php
require_once __DIR__  . "/../model/User.php";
class UserControllers
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Create
    public function createUser(User $user)
    {

        $username = $user->getUsername();
        $password = password_hash($user->getPassword(), PASSWORD_DEFAULT);
        $email = $user->getEmail();
        $age = $user->getAge();
        $tp_number = $user->getTpNumber();
        $course = $user->getCourse();
        $role = $user->getRole();

        $stmt = mysqli_prepare($this->conn, "INSERT INTO users(username, email, password, age, tp_number, course, role) VALUES (?,?,?,?,?,?,?)");
        mysqli_stmt_bind_param($stmt, "sssisss", $username, $email, $password, $age, $tp_number, $course, $role);
        mysqli_stmt_execute($stmt);
        return mysqli_insert_id($this->conn);
    }

    // Read all
    public function getAllUser()
    {
        $result = mysqli_query($this->conn, "SELECT id, username, password, email, age, tp_number, course, created_at FROM users");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    //Read one
    public function getUserById(int $id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT id, username, password, email, age, tp_number, course, created_at FROM users WHERE id = ?");
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    // Update
    public function updateUser($id, $username, $email, $age, $tp_number, $course)
    {
        $stmt = mysqli_prepare($this->conn, "UPDATE users SET username = ?, email = ?, age = ?, tp_number = ?, course = ? WHERE id = ?");
        mysqli_stmt_bind_param($stmt, "ssissi", $username, $email, $age, $tp_number, $course, $id);
        mysqli_stmt_execute($stmt);
        return mysqli_stmt_affected_rows($stmt);
    }

    // Detele
    public function deleteUser(int $id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM users WHERE id = ?");
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        return mysqli_stmt_affected_rows($stmt);
    }


    // Get User Email
    public function getByEmail(string $email)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT id, role, password FROM users WHERE email = ?");
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }
}
