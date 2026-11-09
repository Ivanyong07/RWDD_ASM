<?php
// =================================
// * Filename : UserControllers.php
// * Date : 16/10/2026
// * Author : Ivan Yong
// * Description : For delete, login, get all list of users, and upate user
// =================================
require_once __DIR__  . "/../model/Users.php";
class UserControllers
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Create
    public function createUser(Users $user)
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
        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }
        return mysqli_insert_id($this->conn); // return id (e.g. 5)
    }

    // Read all
    public function getAllUser()
    {
        $result = mysqli_query($this->conn, "SELECT user_id, username, password, email, age, tp_number, course, role, rank_id, points_balance, created_at FROM users");
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    //Read one
    public function getUserById(int $user_id)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT user_id, username, password, email, age, tp_number, course, created_at FROM users WHERE user_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $user_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    // Update
    public function updateUser(int $user_id, Users $user)
    {
        $username       = $user->getUsername();
        $email          = $user->getEmail();
        $age            = $user->getAge();
        $tp_number      = $user->getTpNumber();
        $course         = $user->getCourse();
        $role           = $user->getRole();
        $rank_id           = $user->getRankId();
        $points_balance = $user->getPointsBalance();

        $stmt = mysqli_prepare(
            $this->conn,
            "UPDATE users SET username = ?, email = ?, age = ?, tp_number = ?, course = ?,
                          role = ?, rank_id = ?, points_balance = ?
         WHERE user_id = ?"
        );
        mysqli_stmt_bind_param(
            $stmt,
            "ssisssiii",
            $username,
            $email,
            $age,
            $tp_number,
            $course,
            $role,
            $rank_id,
            $points_balance,
            $user_id
        );

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_stmt_affected_rows($stmt);
        // 0 is no value change, 1 is changes, false is sql error
    }

    // Detele
    public function deleteUser(int $user_id)
    {
        $stmt = mysqli_prepare($this->conn, "DELETE FROM users WHERE user_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $user_id);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }
        return mysqli_stmt_affected_rows($stmt);
    }

    // Get User Email
    public function getByEmail(string $email)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT user_id, role, password FROM users WHERE email = ?");
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

    public function checkExistingUser(string $email, string $tp_number)
    {
        $stmt = mysqli_prepare($this->conn, "SELECT email, tp_number FROM users WHERE email = ? OR tp_number = ?");
        mysqli_stmt_bind_param($stmt, "ss", $email, $tp_number);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        return mysqli_fetch_assoc($result);
    }

    public function updateProfile(int $user_id, string $username, string $email, string $tp_number, string $course)
    {
        $stmt = mysqli_prepare($this->conn, "UPDATE users SET username = ?, email = ?, age = ?, tp_numer = ?, course = ? WHERE user_id = ?");
        mysqli_stmt_bind_param($stmt, "ssissi", $username, $email, $age, $tp_number, $course, $user_id);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_stmt_affected_rows($stmt);
    }
}
