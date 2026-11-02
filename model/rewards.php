<?php
    private ?int $rewardId = null;
    private string $name;
    private string $description;
    private int $pointsCost;
    private int $stock;
    private string $tp_number;

        public function __construct(
        string $name,
        string $description,
        int $pointsCost,
        int $stock,
        string $tp_number,
        
    ) {

        $this->name = $name;
        $this->description = $description;
        $this->setPointsCost($pointsCost);
        $this->setStock($stock);
        $this->tp_number = $tp_number;
       
    }
>