/*
=================================
* Filename : api.js
* Date : 18/10/2026
* Author : (add your name)
* Description : The ONLY file that gets data. Every page calls these functions.
*               Sample mode (USE_SAMPLE_DATA = true) uses sample-store.js,
*               backend mode asks the PHP files listed in config.js.
=================================
*/

/* ---------- 1. SEND A REQUEST TO THE PHP BACKEND ---------- */
async function request(file, options = {}) {
    const response = await fetch(API_BASE + "/" + file, options);
    const data = await response.json().catch(() => ({}));

    if (response.status === 401) window.location.href = LOGIN_PAGE;     // not logged in
    if (!response.ok) throw new Error(data.error || "Something went wrong");
    return data;
}

function postJson(file, body) {
    return request(file, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
}

/* ---------- 2. DATA FOR THE PAGES ---------- */

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

/* ---------- 3. ACTIONS ---------- */

// The user sends a photo as proof for a challenge (an admin approves it later)
async function submitChallengePhoto(challengeId, file) {
    if (USE_SAMPLE_DATA) return sampleSubmit(challengeId, file);

    const form = new FormData();
    form.append("challenge_id", challengeId);
    form.append("photo", file);
    return request(ENDPOINTS.submitChallenge, { method: "POST", body: form });
}

// The user spends points on a reward
async function redeemReward(rewardId) {
    if (USE_SAMPLE_DATA) return sampleRedeem(rewardId);
    return postJson(ENDPOINTS.redeem, { reward_id: Number(rewardId) });
}

// SAMPLE MODE ONLY: pretend an admin approved the waiting photos
async function demoApprovePending() {
    return sampleApprovePending();
}
