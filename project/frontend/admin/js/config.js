/*
=================================
* Filename : config.js
* Date : 18/10/2026
* Author : (add your name)
* Description : All the settings of the user pages in one place
=================================
*/

/* ---------- 1. BACKEND CONNECTION ---------- */

// Same address as API_BASE in frontend/auth/index.js
const API_BASE = "http://127.0.0.1:8000/backend/api";

const ENDPOINTS = {
    profile: "admin/profile.php",
    challenges: "admin/challenges.php",
    submitChallenge: "admin/submit_challenge.php",
    history: "admin/history.php",
    badges: "admin/badges.php",
    rewards: "admin/rewards.php",
    redeem: "admin/redeem.php",
    leaderboard: "admin/leaderboard.php"
};

const LOGIN_PAGE = "../auth/index.html";

const PHOTO_TYPES = [
    "images/jpeg",
    "images/png",
    "images/webp"
];