<?php

class User
{
    private string $username;
    private string $password;
    private string $email;
    private int $age;
    private string $tp_number;
    private string $course;
    private string $role;


    public function __construct(string $username, string $password, string $email, int $age, string $tp_number, string $course, string $role = "user")
    {

        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
        $this->age = $age;
        $this->tp_number = $tp_number;
        $this->course = $course;
        $this->role = $role;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername($username)
    {
        $this->username = $username;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        return $this->email = $email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        return $this->password = $password;
    }

    public function getAge(): int
    {
        return $this->age;
    }

    public function setAge($age): void
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

    public function setTpNumber($tp_number)
    {
        return $this->tp_number = $tp_number;
    }

    public function getCourse(): string
    {
        return $this->course;
    }

    public function setCourse($course)
    {
        $this->course = $course;
    }

    public function getRole(): string
    {
        return $this->role;
    }

    public function setRole($role)
    {
        $this->role = $role;
    }
}
