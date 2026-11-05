<?php

class UserAchievement
{
    private int $userId;
    private int $achievementId;
    private ?string $unlocked_at;

    public function __construct(
        int $userId,
        int $achievementId,
        ?string $unlocked_at = null
    ) {

        $this->setUserId($userId);
        $this->setAchievementId($achievementId);
        $this->setUnlockedAt($unlocked_at);
    }

    public function getUserId(): int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): void
    {
        $this->userId = $userId;
    }

    public function getAchievementId(): int
    {
        return $this->achievementId;
    }

    public function setAchievementId(int $achievementId): void
    {
        $this->achievementId = $achievementId;
    }

    public function getUnlockedAt(): ?string
    {
        return $this->unlocked_at;
    }

    public function setUnlockedAt(?string $unlocked_at): void
    {
        $this->unlocked_at = $unlocked_at;
    }
}