<?php
// =================================
// * Filename : UserControllers.php
// * Date : 16/10/2026
// * Author : Ivan Yong
// * Description : For delete, login, get all list of users, and upate user
// =================================
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
        $role = "user";

        $stmt = mysqli_prepare($this->conn, "INSERT INTO users(username, email, password, age, tp_number, course, role) VALUES (?,?,?,?,?,?,?)");
        mysqli_stmt_bind_param($stmt, "sssisss", $username, $email, $password, $age, $tp_number, $course, $role);
        mysqli_stmt_execute($stmt);
        return mysqli_insert_id($this->conn); // return id (e.g. 5)
    }

    // Read all
    public function getAllUser()
    {
        $result = mysqli_query($this->conn, "SELECT id, username, password, email, age, tp_number, course, role, total_xp, rank, points_balance, created_at FROM users");
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
    public function updateUser(int $id, User $user)
    {
        $username       = $user->getUsername();
        $email          = $user->getEmail();
        $age            = $user->getAge();
        $tp_number      = $user->getTpNumber();
        $course         = $user->getCourse();
        $role           = $user->getRole();
        $total_xp       = $user->getTotalXp();
        $rank           = $user->getRank();
        $points_balance = $user->getPointsBalance();

        $stmt = mysqli_prepare(
            $this->conn,
            "UPDATE users SET username = ?, email = ?, age = ?, tp_number = ?, course = ?,
                          role = ?, total_xp = ?, `rank` = ?, points_balance = ?
         WHERE id = ?"
        );
        mysqli_stmt_bind_param(
            $stmt,
            "ssisssisii",
            $username,
            $email,
            $age,
            $tp_number,
            $course,
            $role,
            $total_xp,
            $rank,
            $points_balance,
            $id
        );

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_stmt_affected_rows($stmt);
        // 0 is no value change, 1 is changes, false is sql error
    }

    // Detele
    public function deleteUser(int $id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM users WHERE id = ?");
        mysqli_stmt_bind_param($stmt, "i", $id);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }
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

    public function login(string $email, string $password)
    {
        $user = $this->getByEmail($email);

        if (!$user) {
            return false;
        }

        if (!password_verify($password, $user["password"])) {
            return false;
        }

        return $user;
    }

    public function checkExistingUser(string $email, string $username, string $password, string $tp_number)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT username, password, email, tp_number FROM users WHERE email = ? OR tp_number = ? OR password = ? OR username = ?");
        mysqli_stmt_bind_param($stmt, "ssss", $email, $username, $password, $tp_number);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        return mysqli_fetch_assoc($result);
    }
}
