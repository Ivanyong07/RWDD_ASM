<?php

class Achievement
{
    private ?int $achievementId;
    private string $achievement_name;
    private string $achievement_description;
    private string $achievement_image;
    private int $requirement_value;

    public function __construct(
        string $achievement_name,
        string $achievement_description,
        string $achievement_image,
        int $requirement_value,
        ?int $achievementId = null
    ) {
        $this->setAchievementName($achievement_name);
        $this->setAchievementImage($achievement_image);
        $this->setRequirementValue($requirement_value);
        $this->setAchievementId($achievementId);
        $this->setAchievementDescription($achievement_description);
    }

    public function getAchievementId(): ?int
    {
        return $this->achievementId;
    }

    public function setAchievementId(?int $achievementId): void
    {
        $this->achievementId = $achievementId;
    }

    public function getAchievementName(): string
    {
        return $this->achievement_name;
    }

    public function setAchievementName(string $achievement_name): void
    {
        if (trim($achievement_name) === "") {
            throw new InvalidArgumentException("badge name cannot be empty");
        }
        $this->achievement_name = $achievement_name;
    }

    public function getAchievementImage(): string
    {
        return $this->achievement_image;
    }

    public function setAchievementImage(string $achievement_image): void
    {
        $this->achievement_image = $achievement_image;
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

    public function getAchievementDescription(): string
    {
        return $this->achievement_description;
    }

    public function setAchievementDescription(string $achievement_description): void
    {
        $this->achievement_description = $achievement_description;
    }
}
