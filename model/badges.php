<?php
    private ?int $badgesId = null;
    private string $name;
    private string $badgeImage;
    private string $requirementType;
    private int $requireValue;
    

        public function __construct(
        string $name,
        string $badgeImage,
        string $requirementType,
        int $requireValue,
        
        
    ) {

        $this->name = $name;
        $this->badgeImage = $badgeImage;
        $this->requirementType = $requirementType;
        $this->setrequireValue($requireValue);
        
       
    }
>