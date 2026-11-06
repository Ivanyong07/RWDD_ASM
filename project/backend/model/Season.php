<?php

class Season
{
    private ?int $seasonId;
    private string $start_date;
    private string $end_date;
    private bool $is_active;

    public function __construct(
        string $start_date,
        string $end_date,
        bool $is_active = false,
        ?int $seasonId = null
    ) {

        $this->setStartDate($start_date);
        $this->setEndDate($end_date);
        $this->setIsActive($is_active);
        $this->setSeasonId($seasonId);
    }

    public function getSeasonId(): ?int
    {
        return $this->seasonId;
    }

    public function setSeasonId(?int $seasonId): void
    {
        $this->seasonId = $seasonId;
    }

    public function getStartDate(): string
    {
        return $this->start_date;
    }

    public function setStartDate(string $start_date): void
    {
        if (strtotime($start_date) === false) {
            throw new InvalidArgumentException("Invalid start date");
        }
        $this->start_date = $start_date;
    }

    public function getEndDate(): string
    {
        return $this->end_date;
    }

    public function setEndDate(string $end_date): void
    {
        if (strtotime($end_date) === false) {
            throw new InvalidArgumentException("Invalid end date");
        }
        if (isset($this->start_date) && strtotime($end_date) < strtotime($this->start_date)) {
            throw new InvalidArgumentException("End date cannot be before start date");
        }
        $this->end_date = $end_date;
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
