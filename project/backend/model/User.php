<?php

class User
{
    private $username;
    private $email;
    private $password;
    private $age;
    private $tp_number;


    public function __construct($username, $password, $email, $age, $tp_number)
    {

        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
        $this->age = $age;
        $this->tp_number = $tp_number;
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
}
