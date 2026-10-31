<?php

class Challenge
{
    private ?int $challenge_id;
    private string $title;
    private string $description;
    private string $category;
    private int $points_reward;
    private int $xp_reward;
    private string $deadline;
    private int $centre_id;
    private int $created_by;


    public function __construct(
        string $title,
        string $description,
        string $category,
        int $points_reward,
        int $xp_reward,
        string $deadline,
        int $centre_id,
        int $created_by,
        ?int $challenge_id = null
    ) {
        $this->title = $title;
        $this->description = $description;
        $this->category = $category;
        $this->points_reward = $points_reward;
        $this->xp_reward = $xp_reward;
        $this->deadline = $deadline;
        $this->centre_id = $centre_id;
        $this->created_by = $created_by;
        $this->challenge_id = $challenge_id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getCategory(): string
    {
        return $this->category;
    }

    public function setCategory(string $category): void
    {
        $this->category = $category;
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

    public function getDeadline(): string
    {
        return $this->deadline;
    }

    public function setDeadline(string $deadline): void
    {
        $this->deadline = $deadline;
    }

    public function getCentreId(): int
    {
        return $this->centre_id;
    }

    public function setCentreId(int $centre_id): void
    {
        $this->centre_id = $centre_id;
    }

    public function getCreatedBy(): int
    {
        return $this->created_by;
    }

    public function getChallengeId(): ?int
    {
        return $this->challenge_id;
    }

    public function setChallengeId(int $challenge_id): void
    {
        $this->challenge_id = $challenge_id;
    }
}
