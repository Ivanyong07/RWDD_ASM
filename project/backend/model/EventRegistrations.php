<?php

class EventRegistrations
{

    private ?int $registration_id;
    private int $user_id;
    private int $event_id;
    private int $attended;
    private string $verified_by;

    public function __construct(int $user_id, int $event_id, string $verified_by, int $attended = 0, ?int $registration_id = null)
    {

        $this->registration_id = $registration_id;
        $this->user_id = $user_id;
        $this->event_id = $event_id;
        $this->attended = $attended;
        $this->verified_by = $verified_by;
    }

    public function getRegistrationId(): ?int
    {
        return $this->registration_id;
    }
    public function setRegistrationId(int $registration_id): void
    {
        $this->registration_id = $registration_id;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): void
    {
        $this->user_id = $user_id;
    }

    public function getEventId(): int
    {
        return $this->event_id;
    }

    public function setEventId(int $event_id): void
    {
        $this->event_id = $event_id;
    }

    public function getAttended(): int
    {
        return $this->attended;
    }
    public function setAttended(int $attended): void
    {
        $this->attended = $attended;
    }

    public function getVerifiedBy(): string
    {
        return $this->verified_by;
    }

    public function setVerifiedBy(string $verified_by): void
    {
        $this->verified_by = $verified_by;
    }
}
