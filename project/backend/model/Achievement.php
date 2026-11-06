<?php

class Achievement
{
    private ?int $achievementId;
    private string $badge_name;
    private string $badge_image;
    private int $requirement_value;

    public function __construct(
        string $badge_name,
        string $badge_image,
        int $requirement_value,
        ?int $achievementId = null
    ) {

        $this->setBadgeName($badge_name);
        $this->setBadgeImage($badge_image);
        $this->setRequirementValue($requirement_value);
        $this->setAchievementId($achievementId);
    }

    public function getAchievementId(): ?int
    {
        return $this->achievementId;
    }

    public function setAchievementId(?int $achievementId): void
    {
        $this->achievementId = $achievementId;
    }

    public function getBadgeName(): string
    {
        return $this->badge_name;
    }

    public function setBadgeName(string $badge_name): void
    {
        if (trim($badge_name) === "") {
            throw new InvalidArgumentException("badge name cannot be empty");
        }
        $this->badge_name = $badge_name;
    }

    public function getBadgeImage(): string
    {
        return $this->badge_image;
    }

    public function setBadgeImage(string $badge_image): void
    {
        $this->badge_image = $badge_image;
    }

    public function getRequirementValue(): int
    {
        return $this->requirement_value;
    }

    public function setRequirementValue(int $requirement_value): void
    {
        if ($requirement_value < 0) {
            throw new InvalidArgumentException("requirement value cannot be negative");
        }
        $this->requirement_value = $requirement_value;
    }
}
