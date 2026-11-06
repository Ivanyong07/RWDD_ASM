<?php

class Rewards
{
    private ?int $rewardId;
    private string $name;
    private string $description;
    private int $points_cost;
    private int $stock;
    private string $image;

    public function __construct(
        string $name,
        string $description,
        int $points_cost,
        int $stock = 0,
        string $image = "",
        ?int $rewardId = null
    ) {

        $this->setName($name);
        $this->setDescription($description);
        $this->setPointsCost($points_cost);
        $this->setStock($stock);
        $this->setImage($image);
        $this->setRewardId($rewardId);
    }

    public function getRewardId(): ?int
    {
        return $this->rewardId;
    }

    public function setRewardId(?int $rewardId): void
    {
        $this->rewardId = $rewardId;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        if (trim($name) === "") {
            throw new InvalidArgumentException("name cannot be empty");
        }
        $this->name = $name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
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

    public function getStock(): int
    {
        return $this->stock;
    }

    public function setStock(int $stock): void
    {
        if ($stock < 0) {
            throw new InvalidArgumentException("stock cannot be negative");
        }
        $this->stock = $stock;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    public function setImage(string $image): void
    {
        $this->image = $image;
    }
}
