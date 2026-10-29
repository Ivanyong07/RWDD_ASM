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

// true  = use the temporary data in sample-data.js (no backend needed, good for designing)
// false = ask the PHP backend for the data
// >>> Set this to false when the backend and database are connected. <<<
const USE_SAMPLE_DATA = true;

// The PHP file used for each action (inside API_BASE). Change the names to match the backend.
const ENDPOINTS = {
    profile: "user/profile.php",
    challenges: "user/challenges.php",
    joinChallenge: "user/join_challenge.php",
    submitChallenge: "user/submit_challenge.php",
    history: "user/history.php",
    badges: "user/badges.php",
    rewards: "user/rewards.php",
    redeem: "user/redeem.php",
    leaderboard: "user/leaderboard.php"
};

const LOGIN_PAGE = "../auth/index.html";      // where a user who is not logged in is sent

/* ---------- 2. PHOTOS (all left blank: add the photos yourselves) ----------
   A photo is written as a short path inside the images/ folder, for example "logo.jpeg"
   or "badges/first-step.jpeg". While a path is "" nothing is shown and a soft placeholder
   is used instead. Photos of challenges, badges and rewards are set in sample-data.js
   (later: the "image" column of the database). */

const IMAGE_FOLDER = "images/";               // the folder where all photos are kept

const LOGO_PICTURE = "";                      // website logo in the top bar, for example "logo.jpeg"
const DEFAULT_PROFILE_PICTURE = "";           // picture of a user who has no photo, for example "profile-default.jpeg"

/* ---------- 3. OPENING PICTURE ---------- */

const OPENING_PICTURE = "";                  // for example "opening.jpeg" ("" = a green screen is shown)
const OPENING_HOLD_MS = 1500;                // how long the picture stays (1000 = 1 second)
const OPENING_SLICES = 5;                    // number of strips that wipe left (1 = one plain wipe)

/* ---------- 4. LEADERBOARD ---------- */

const LEADERBOARD_LIMIT = 20;                // how many users are shown (the backend should send the top 20)

/* ---------- 5. UPLOAD RULES (must match the backend rules) ---------- */

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;     // 5 MB
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
