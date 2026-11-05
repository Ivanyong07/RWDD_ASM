<?php

class Submissions
{
    private ?int $submissionId;
    private int $userId;
    private int $challengesId;
    private string $photo_path;
    private string $status;
    private ?string $rejection_reason;
    private ?int $verified_by;
    private ?string $submitted_at;
    private ?string $verified_at;

    public function __construct(
        int $userId,
        int $challengesId,
        string $photo_path,
        string $status = "pending",
        ?int $submissionId = null,
        ?string $rejection_reason = null,
        ?int $verified_by = null,
        ?string $submitted_at = null,
        ?string $verified_at = null
    ) {

        $this->setUserId($userId);
        $this->setChallengesId($challengesId);
        $this->setPhotoPath($photo_path);
        $this->setStatus($status);
        $this->setSubmissionId($submissionId);
        $this->setRejectionReason($rejection_reason);
        $this->setVerifiedBy($verified_by);
        $this->setSubmittedAt($submitted_at);
        $this->setVerifiedAt($verified_at);
    }

    public function getSubmissionId(): ?int
    {
        return $this->submissionId;
    }

    public function setSubmissionId(?int $submissionId): void
    {
        $this->submissionId = $submissionId;
    }

    public function getUserId(): int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): void
    {
        $this->userId = $userId;
    }

    public function getChallengesId(): int
    {
        return $this->challengesId;
    }

    public function setChallengesId(int $challengesId): void
    {
        $this->challengesId = $challengesId;
    }

    public function getPhotoPath(): string
    {
        return $this->photo_path;
    }

    public function setPhotoPath(string $photo_path): void
    {
        if (trim($photo_path) === "") {
            throw new InvalidArgumentException("photo path cannot be empty");
        }
        $this->photo_path = $photo_path;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): void
    {
        if (!in_array($status, ["pending", "approved", "rejected"], true)) {
            throw new InvalidArgumentException("Invalid status");
        }
        $this->status = $status;
    }

    public function getRejectionReason(): ?string
    {
        return $this->rejection_reason;
    }

    public function setRejectionReason(?string $rejection_reason): void
    {
        $this->rejection_reason = $rejection_reason;
    }

    public function getVerifiedBy(): ?int
    {
        return $this->verified_by;
    }

    public function setVerifiedBy(?int $verified_by): void
    {
        $this->verified_by = $verified_by;
    }

    public function getSubmittedAt(): ?string
    {
        return $this->submitted_at;
    }

    public function setSubmittedAt(?string $submitted_at): void
    {
        $this->submitted_at = $submitted_at;
    }

    public function getVerifiedAt(): ?string
    {
        return $this->verified_at;
    }

    public function setVerifiedAt(?string $verified_at): void
    {
        $this->verified_at = $verified_at;
    }
}