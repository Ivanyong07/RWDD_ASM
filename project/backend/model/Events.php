<?php

class Events
{

    private ?int $event_id;
    private string $title;
    private string $location;
    private string $event_date;
    private int $points_reward;
    private int $xp_reward;
    private string $created_by;
    private ?string $created_at;


    public function __construct(string $title, string $location, string $event_date, int $points_reward, int $xp_reward, string $created_by, ?string $created_at = null, ?int $event_id = null)
    {

        $this->title = $title;
        $this->location = $location;
        $this->event_date = $event_date;
        $this->points_reward = $points_reward;
        $this->xp_reward = $xp_reward;
        $this->created_by = $created_by;
        $this->created_at = $created_at;
        $this->event_id = $event_id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function getLocation(): string
    {
        return $this->location;
    }

    public function setLocation(string $location): void
    {
        $this->location = $location;
    }

    public function getEventDate(): string
    {
        return $this->event_date;
    }

    public function setEventDate(string $event_date): void
    {
        $this->event_date = $event_date;
    }

    public function getPointsReward(): int
    {
        return $this->points_reward;
    }

    public function setPointsReward(int $points_reward): void
    {
        $this->points_reward = $points_reward;
    }

    public function getXpReward(): int
    {
        return $this->xp_reward;
    }

    public function setXpReward(int $xp_reward): void
    {
        $this->xp_reward = $xp_reward;
    }

    public function getCreatedAt(): ?string
    {
        return $this->created_at;
    }

    public function setCreatedAt(string $created_at): void
    {
        $this->created_at = $created_at;
    }

    public function getEventId(): ?int
    {
        return $this->event_id;
    }

    public function setEventId(int $event_id): void
    {
        $this->event_id = $event_id;
    }

    public function getCreatedBy(): string
    {
        return $this->created_by;
    }

    public function setCreatedBy(int $created_by): void
    {
        $this->created_by = $created_by;
    }
}
