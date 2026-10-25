/*
=================================
* Filename : reviews.js
* Date : 18/10/2026
* Author : ivan yong
* Description : This file include all the commone function that we need including config, data fetching, sample data fetching, api
=================================
*/



// =======================
// Config
// =======================
const API_BASE = "http://127.0.0.1:8000/backend/api";

const ENDPOINTS = {
    profile: "admin/profile.php",
    challenges: "admin/challenges.php",
    submission: "admin/submission.php",
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

// ===============================
// API_BASE
// ==============================

async function request(file, options = {}) {
    const response = await fetch(API_BASE + "/" + file, options);
    const data = await response.json().catch(() => ({}));

    if (response.status === 401) window.location.href = LOGIN_PAGE;
    if (!response.ok) throw new Error(data.error || "Something went wrong");
    return data;
}

// ========================
// Get Data
// ========================


// name, picture, points, rank, next rank, all ranks and numbers (used by every page)
async function getProfile() {
    return USE_SAMPLE_DATA ? sampleProfile() : request(ENDPOINTS.profile);
}

// Rank page: the challenges and what the user already sent for each
async function getChallenges() {
    if (USE_SAMPLE_DATA) return sampleChallenges();
    return (await request(ENDPOINTS.challenges)).challenges;
}

// History page: points earned and spent, photos waiting or rejected
async function getHistory() {
    if (USE_SAMPLE_DATA) return sampleHistory();
    return (await request(ENDPOINTS.history)).history;
}

// Badges page: every badge, with earned = true or false
async function getBadges() {
    if (USE_SAMPLE_DATA) return sampleBadges();
    return (await request(ENDPOINTS.badges)).badges;
}

// Rewards page
async function getRewards() {
    if (USE_SAMPLE_DATA) return sampleRewards();
    return (await request(ENDPOINTS.rewards)).rewards;
}

// Leaderboard page: the top users by points, and the logged-in user's own position
async function getLeaderboard() {
    if (USE_SAMPLE_DATA) return sampleLeaderboard();
    const data = await request(ENDPOINTS.leaderboard);
    return { list: data.leaderboard, me: data.me };
}


// ============================
// Common
// ===========================
const $ = id => document.getElementById(id);

// =========================
// Start Page Animation
// =========================
const band = document.querySelectorAll('.band');
const swap_element = document.getElementById('swap');

function swap(){
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');


    band.forEach(b => b.classList.add('play'));
    document.body.classList.add('no-scroll');

    setTimeout(() => {

        band.forEach(b => {
            b.classList.remove('play');
            b.classList.add('play-back');
        })
    }, 1000);

    setTimeout(() => {
        swap_element.style.display = 'none';
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
    }, 2000);
}

swap();