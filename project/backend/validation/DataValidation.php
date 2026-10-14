<?php

function validateEmail($email)
{
    if (empty($email)) {
        return "Email is required";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Invalid Email";
    }
    return null;
}

function validatePassword($password)
{
    if (empty($password)) {
        return "Password is required";
    }

    if (strlen($password) < 8) {
        return "Password must be at least 8 characters";
    }

    return null;
}

function validateAge($age)
{
    return null;
}

function validateTpNumber($tp_number)
{
    return null;
}
