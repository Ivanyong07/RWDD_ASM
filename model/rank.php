<?php

class Rank
{
    private ?int $rankId;
    private string $rank_name;
    private int $xp_require;

    public function __construct(
        string $rank_name,
        int $xp_require = 0,
        ?int $rankId = null
    ) {

        $this->setRankName($rank_name);
        $this->setXpRequire($xp_require);
        $this->setRankId($rankId);
    }

    public function getRankId(): ?int
    {
        return $this->rankId;
    }

    public function setRankId(?int $rankId): void
    {
        $this->rankId = $rankId;
    }

    public function getRankName(): string
    {
        return $this->rank_name;
    }

    public function setRankName(string $rank_name): void
    {
        if (trim($rank_name) === "") {
            throw new InvalidArgumentException("rank name cannot be empty");
        }
        $this->rank_name = $rank_name;
    }

    public function getXpRequire(): int
    {
        return $this->xp_require;
    }

    public function setXpRequire(int $xp_require): void
    {
        if ($xp_require < 0) {
            throw new InvalidArgumentException("xp require cannot be negative");
        }
        $this->xp_require = $xp_require;
    }
}