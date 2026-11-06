<?php

class Leaderboard
{
    private int $seasonId;
    private int $userId;
    private int $rankId;

    public function __construct(
        int $seasonId,
        int $userId,
        int $rankId
    ) {

        $this->setSeasonId($seasonId);
        $this->setUserId($userId);
        $this->setRankId($rankId);
    }

    public function getSeasonId(): int
    {
        return $this->seasonId;
    }

    public function setSeasonId(int $seasonId): void
    {
        $this->seasonId = $seasonId;
    }

    public function getUserId(): int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): void
    {
        $this->userId = $userId;
    }

    public function getRankId(): int
    {
        return $this->rankId;
    }

    public function setRankId(int $rankId): void
    {
        $this->rankId = $rankId;
    }
}
