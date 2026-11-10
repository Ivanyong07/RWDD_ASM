<?php

class Rewards
{
    private ?int $reward_id;
    private string $reward_item;
    private string $description;
    private int $points_cost;
    private int $stock;
    private string $image;

    public function __construct(
        string $reward_item,
        string $description,
        int $points_cost,
        int $stock,
        ?string $image = null,
        ?int $reward_id = null
    ) {

        $this->setRewardItem($reward_item);
        $this->setDescription($description);
        $this->setPointsCost($points_cost);
        $this->setStock($stock);
        $this->setImage($image);
        $this->setRewardId($reward_id);
    }

    public function getRewardId(): ?int
    {
        return $this->reward_id;
    }

    public function setRewardId(?int $reward_id): void
    {
        $this->reward_id = $reward_id;
    }

    public function getRewardItem(): string
    {
        return $this->reward_item;
    }

    public function setRewardItem(string $reward_item): void
    {
        if (trim($reward_item) === "") {
            throw new InvalidArgumentException("reward item cannot be empty");
        }
        $this->reward_item = $reward_item;
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

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): void
    {
        $this->image = $image;
    }
}
