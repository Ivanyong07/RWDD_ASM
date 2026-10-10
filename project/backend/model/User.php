<?php

class User
{
    private $username;
    private $password;
    private $email;
    private $age;
    private $tp_number;
    private $created_at;
    private $course;


    public function __construct($username, $password, $email, $age, $tp_number, $created_at, $course)
    {

        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
        $this->age = $age;
        $this->tp_number = $tp_number;
        $this->created_at = $created_at;
        $this->course = $course;
    }

    public function getName()
    {
        return $this->username;
    }

    public function setName($username)
    {
        $this->username = $username;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        return $this->email = $email;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        return $this->password = $password;
    }

    public function getAge()
    {
        return $this->age;
    }

    public function setAge($age)
    {
        return $this->age = $age;
    }

    public function getTpNumber()
    {
        return $this->tp_number;
    }

    public function setTpNumber($tp_number)
    {
        return $this->tp_number = $tp_number;
    }

    public function getCreatedAt()
    {
        return $this->created_at;
    }

    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }

    public function setCourse()
    {
        return $this->course;
    }

    public function getCourse($course)
    {
        $this->course = $course;
    }
}
