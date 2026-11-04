<?php

class User
{
    private ?int $userId = null;
    private string $username;
    private string $password;
    private string $email;
    private int $age;
    private string $tp_number;
    private string $course;
    private string $role;
    private int $total_xp;
    private string $rank;
    private int $points_balance;
    private ?string $created_at;


    public function __construct(
        string $username,
        string $password,
        string $email,
        int $age,
        string $tp_number,
        string $course,
        string $rank = "seed",
        int $points_balance = 0,
        int $total_xp = 0,
        string $role = "user",
        ?int $userId = null,
        ?string $created_at = null
    ) {

        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
        $this->setAge($age);
        $this->tp_number = $tp_number;
        $this->course = $course;
        $this->role = $role;
        $this->rank = $rank;
        $this->points_balance = $points_balance;
        $this->total_xp = $total_xp;
        $this->userId = $userId;
        $this->created_at = $created_at;
    }

    public function getUserId(): ?int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): void
    {
        $this->userId = $userId;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function getAge(): int
    {
        return $this->age;
    }

    public function setAge(int $age): void
    {
        if ($age < 10 || $age > 100) {
            throw new InvalidArgumentException("Invalid Age");
        } else {
            $this->age = $age;
        }
    }

    public function getTpNumber(): string
    {
        return $this->tp_number;
    }

    public function setTpNumber(string $tp_number): void
    {
        $this->tp_number = $tp_number;
    }

    public function getCourse(): string
    {
        return $this->course;
    }

    public function setCourse(string $course): void
    {
        $this->course = $course;
    }

    public function getRole(): string
    {
        return $this->role;
    }

    public function setRole(string $role): void
    {
        $this->role = $role;
    }

    public function getRank(): string
    {
        return $this->rank;
    }

    public function setRank(string $rank): void
    {
        $this->rank = $rank;
    }

    public function getTotalXp(): int
    {
        return $this->total_xp;
    }

    public function setTotalXp(int $total_xp): void
    {
        $this->total_xp = $total_xp;
    }

    public function getPointsBalance(): int
    {
        return $this->points_balance;
    }

    public function setPointsBalance(int $points_balance): void
    {
        $this->points_balance = $points_balance;
    }

    public function getCreatedAt(): ?string
    {
        return $this->created_at;
    }

    public function setCreatedAt(string $created_at): void
    {
        $this->created_at = $created_at;
    }
}
