<?php

class ChallengeHistory
{
    private ?int $challengesId;
    private string $title;
    private string $image;
    private string $description;
    private string $category;
    private int $points_reward;
    private int $points_cost;
    private int $xp_reward;
    private string $deadline;
    private string $location;
    private int $created_by;
    private bool $is_active;

    public function __construct(
        string $title,
        string $image,
        string $description,
        string $category,
        int $points_reward,
        int $points_cost,
        int $xp_reward,
        string $deadline,
        string $location,
        int $created_by,
        bool $is_active = false,
        ?int $challengesId = null
    ) {

        $this->setTitle($title);
        $this->setImage($image);
        $this->setDescription($description);
        $this->setCategory($category);
        $this->setPointsReward($points_reward);
        $this->setPointsCost($points_cost);
        $this->setXpReward($xp_reward);
        $this->setDeadline($deadline);
        $this->setLocation($location);
        $this->setCreatedBy($created_by);
        $this->setIsActive($is_active);
        $this->setChallengesId($challengesId);
    }

    public function getChallengesId(): ?int
    {
        return $this->challengesId;
    }

    public function setChallengesId(?int $challengesId): void
    {
        $this->challengesId = $challengesId;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        if (trim($title) === "") {
            throw new InvalidArgumentException("title cannot be empty");
        }
        $this->title = $title;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    public function setImage(string $image): void
    {
        $this->image = $image;
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
        if ($points_reward < 0) {
            throw new InvalidArgumentException("points reward cannot be negative");
        }
        $this->points_reward = $points_reward;
    }

    public function getPointsCost(): int
    {
        return $this->points_cost;
    }

    public function setPointsCost(int $points_cost): void
    {
        if ($points_cost < 0) {
            throw new InvalidArgumentException("points cost cannot be negative");
        }
        $this->points_cost = $points_cost;
    }

    public function getXpReward(): int
    {
        return $this->xp_reward;
    }

    public function setXpReward(int $xp_reward): void
    {
        if ($xp_reward < 0) {
            throw new InvalidArgumentException("xp reward cannot be negative");
        }
        $this->xp_reward = $xp_reward;
    }

    public function getDeadline(): string
    {
        return $this->deadline;
    }

    public function setDeadline(string $deadline): void
    {
        if (strtotime($deadline) === false) {
            throw new InvalidArgumentException("Invalid deadline");
        }
        $this->deadline = $deadline;
    }

    public function getLocation(): string
    {
        return $this->location;
    }

    public function setLocation(string $location): void
    {
        $this->location = $location;
    }

    public function getCreatedBy(): int
    {
        return $this->created_by;
    }

    public function setCreatedBy(int $created_by): void
    {
        $this->created_by = $created_by;
    }

    public function getIsActive(): bool
    {
        return $this->is_active;
    }

    public function setIsActive(bool $is_active): void
    {
        $this->is_active = $is_active;
    }
}