<?php

class Challenge
{

    private $title;
    private $description;
    private $location;
    private $time;
    private $date;


    public function __construct($title, $description, $location, $time, $date)
    {
        $this->title = $title;
        $this->description = $description;
        $this->location = $location;
        $this->time = $time;
        $this->date = $date;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        return $this->title = $title;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description)
    {
        return $this->description = $description;
    }

    public function getLocation()
    {
        return $this->location;
    }

    public function setLocation($location)
    {
        return $this->location = $location;
    }

    public function getTime()
    {
        return $this->description;
    }

    public function setTime($time)
    {
        return $this->time = $time;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function setDate($date)
    {
        return $this->date = $date;
    }
}
