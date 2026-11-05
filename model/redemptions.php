<?php

class Redemptions
{
    private ?int $redemptionId;
    private int $userId;
    private int $rewardId;
    private int $points_spent;
    private ?string $redeemed_at;

    public function __construct(
        int $userId,
        int $rewardId,
        int $points_spent,
        ?int $redemptionId = null,
        ?string $redeemed_at = null
    ) {

        $this->setUserId($userId);
        $this->setRewardId($rewardId);
        $this->setPointsSpent($points_spent);
        $this->setRedemptionId($redemptionId);
        $this->setRedeemedAt($redeemed_at);
    }

    public function getRedemptionId(): ?int
    {
        return $this->redemptionId;
    }

    public function setRedemptionId(?int $redemptionId): void
    {
        $this->redemptionId = $redemptionId;
    }

    public function getUserId(): int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): void
    {
        $this->userId = $userId;
    }

    public function getRewardId(): int
    {
        return $this->rewardId;
    }

    public function setRewardId(int $rewardId): void
    {
        $this->rewardId = $rewardId;
    }

    public function getPointsSpent(): int
    {
        return $this->points_spent;
    }

    public function setPointsSpent(int $points_spent): void
    {
        if ($points_spent < 0) {
            throw new InvalidArgumentException("points spent cannot be negative");
        }
        $this->points_spent = $points_spent;
    }

    public function getRedeemedAt(): ?string
    {
        return $this->redeemed_at;
    }

    public function setRedeemedAt(?string $redeemed_at): void
    {
        $this->redeemed_at = $redeemed_at;
    }
}