<?php

class Challenges
{
    private ?int $challenge_id;
    private string $title;
    private int $quantity;
    private string $description;
    private string $category;
    private int $points_reward;
    private int $xp_reward;
    private string $deadline;
    private ?string $image;
    private string $location;
    private int $created_by;
    private ?string $created_at;


    public function __construct(
        string $title,
        int $quantity,
        string $description,
        string $category,
        int $points_reward,
        int $xp_reward,
        string $deadline,
        string $location,
        int $created_by,
        ?string $image,
        ?string $created_at = null,
        ?int $challenge_id = null,
    ) {
        $this->title = $title;
        $this->quantity = $quantity;
        $this->description = $description;
        $this->category = $category;
        $this->points_reward = $points_reward;
        $this->xp_reward = $xp_reward;
        $this->deadline = $deadline;
        $this->location = $location;
        $this->created_by = $created_by;
        $this->image = $image;
        $this->challenge_id = $challenge_id;
        $this->created_at = $created_at;
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

    public function getCreatedBy(): int
    {
        return $this->created_by;
    }

    public function setCreatedBy(string $created_by): void
    {
        $this->created_by = $created_by;
    }

    public function getChallengeId(): ?int
    {
        return $this->challenge_id;
    }

    public function setChallengeId(int $challenge_id): void
    {
        $this->challenge_id = $challenge_id;
    }

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): void
    {
        $this->quantity = $quantity;
    }

    public function getLocation(): string
    {
        return $this->location;
    }

    public function setLocation(string $location): void
    {
        $this->location = $location;
    }

    public function getCreatedAt(): ?string
    {
        return $this->created_at;
    }

    public function setCreateAt(string $created_at): void
    {
        $this->created_at = $created_at;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image)
    {
        $this->image = $image;
    }
}
