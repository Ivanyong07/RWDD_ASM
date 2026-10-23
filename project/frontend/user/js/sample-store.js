/*
=================================
* Filename : sample-store.js
* Date : 18/10/2026
* Author : (add your name)
* Description : A pretend backend that lives in the browser, so the pages can be tried
*               without PHP. Used only when USE_SAMPLE_DATA is true. Delete when the backend is ready.
=================================
*/

/* ---------- 1. SAVED STATE (kept in the browser so every page shares it) ---------- */
const SAMPLE_STORE_KEY = "fun-collectors-sample-v1";

function createStartState() {
    const ago = days => new Date(Date.now() - days * 86400000).toISOString();
    return {
        lifetime: 135,            // all points ever earned (decides the rank)
        spent: 0,                 // points used on rewards
        completed: 4,             // approved challenges
        redeemed: 0,              // rewards redeemed
        pending: {},              // photos waiting for an admin: { challengeId: true }
        badges: [],               // ids of unlocked badges
        history: [                // newest first
            { type: "earn", title: "Plant a Balcony Garden", points: 30, date: ago(1), note: "" },
            { type: "earn", title: "Campus Clean-up Walk",   points: 40, date: ago(2), note: "" },
            { type: "earn", title: "Bring Your Own Bottle",  points: 15, date: ago(4), note: "" },
            { type: "earn", title: "Recycle 10 Bottles",     points: 20, date: ago(5), note: "" },
            { type: "earn", title: "Welcome bonus",          points: 30, date: ago(7), note: "" }
        ]
    };
}

function loadSampleState() {
    try {
        const saved = JSON.parse(localStorage.getItem(SAMPLE_STORE_KEY));
        if (saved) return saved;
    } catch (error) { /* ignore */ }
    return createStartState();
}

function saveSampleState() {
    try { localStorage.setItem(SAMPLE_STORE_KEY, JSON.stringify(sampleState)); } catch (error) { /* ignore */ }
}

let sampleState = loadSampleState();

/* ---------- 2. RANK HELPERS ---------- */
function sampleRankFor(points) {                   // the highest rank reached with this many points
    let current = SAMPLE_RANKS[0];
    SAMPLE_RANKS.forEach(rank => { if (points >= rank.min_points) current = rank; });
    return current;
}

function sampleNextRank(current) {
    return SAMPLE_RANKS.find(rank => rank.min_points > current.min_points) || null;
}

/* ---------- 3. BADGES ---------- */
function sampleRuleMet(rule) {
    const rank = sampleRankFor(sampleState.lifetime);
    switch (rule.type) {
        case "approved_count": return sampleState.completed >= rule.value;
        case "rank_level":     return rank.level >= rule.value;
        case "redeem_count":   return sampleState.redeemed >= rule.value;
        case "points_spent":   return sampleState.spent >= rule.value;
        default:               return false;
    }
}

function sampleAwardBadges() {                     // unlocks badges; returns the names of the new ones
    const newBadges = [];
    SAMPLE_BADGES.forEach(badge => {
        if (!sampleState.badges.includes(badge.id) && sampleRuleMet(badge.rule)) {
            sampleState.badges.push(badge.id);
            newBadges.push(badge.name);
        }
    });
    return newBadges;
}

sampleAwardBadges();                               // the start data may already deserve some badges
saveSampleState();

/* ---------- 4. WHAT THE PAGES ASK FOR (same shapes the backend should return) ---------- */
function sampleProfile() {
    const rank = sampleRankFor(sampleState.lifetime);
    return {
        user: SAMPLE_USER,
        points: sampleState.lifetime - sampleState.spent,        // points that can be spent
        lifetime: sampleState.lifetime,
        spent: sampleState.spent,
        rank: rank,
        next_rank: sampleNextRank(rank),
        ranks: SAMPLE_RANKS,
        stats: {
            approved: sampleState.completed,
            pending: Object.keys(sampleState.pending).length,
            badges: sampleState.badges.length,
            badge_total: SAMPLE_BADGES.length
        }
    };
}

function sampleChallenges() {
    return SAMPLE_CHALLENGES.map(challenge => ({
        ...challenge,
        pending: Boolean(sampleState.pending[challenge.id]),
        latest_status: sampleState.pending[challenge.id] ? "pending" : null,
        latest_note: ""
    }));
}

function sampleHistory() {
    return sampleState.history;
}

function sampleBadges() {
    return SAMPLE_BADGES.map(badge => ({ ...badge, earned: sampleState.badges.includes(badge.id) }));
}

function sampleRewards() {
    return SAMPLE_REWARDS;
}

// Everyone sorted by points, highest first. list = the top users, me = the logged-in user.
function sampleLeaderboard() {
    const everyone = SAMPLE_LEADERBOARD.map(person => ({ ...person, is_me: false }));
    everyone.push({ name: SAMPLE_USER.name, picture: SAMPLE_USER.picture, points: sampleState.lifetime, is_me: true });
    everyone.sort((a, b) => b.points - a.points);

    const ranked = everyone.map((person, index) => {
        const rank = sampleRankFor(person.points);
        return { ...person, position: index + 1, rank_name: rank.name, rank_level: rank.level };
    });
    return { list: ranked.slice(0, LEADERBOARD_LIMIT), me: ranked.find(person => person.is_me) };
}

/* ---------- 5. WHAT THE PAGES DO ---------- */
function sampleSubmit(challengeId, file) {
    const challenge = SAMPLE_CHALLENGES.find(c => c.id == challengeId);
    if (!challenge) throw new Error("Challenge not found");
    if (!file) throw new Error("Please choose a photo to upload");
    if (sampleState.pending[challengeId]) throw new Error("Your photo for this challenge is still waiting for review");

    sampleState.pending[challengeId] = true;
    sampleState.history.unshift({ type: "pending", title: challenge.title, points: challenge.points, date: new Date().toISOString(), note: "" });
    saveSampleState();
    return { message: "Photo uploaded. An admin will review it soon." };
}

function sampleRedeem(rewardId) {
    const reward = SAMPLE_REWARDS.find(r => r.id == rewardId);
    if (!reward) throw new Error("Reward not found");
    if (sampleRankFor(sampleState.lifetime).level < reward.min_level) throw new Error("Your rank is too low for this reward");
    if (sampleState.lifetime - sampleState.spent < reward.cost) throw new Error("Not enough points");

    sampleState.spent += reward.cost;
    sampleState.redeemed++;
    sampleState.history.unshift({ type: "spend", title: "Redeemed: " + reward.name, points: reward.cost, date: new Date().toISOString(), note: "" });
    const newBadges = sampleAwardBadges();
    saveSampleState();
    return { message: reward.name + " redeemed", new_badges: newBadges };
}

// Pretends to be the admin: approves every waiting photo (the "Demo" button in the user menu)
function sampleApprovePending() {
    let approved = 0;
    Object.keys(sampleState.pending).forEach(id => {
        const challenge = SAMPLE_CHALLENGES.find(c => c.id == id);
        sampleState.history = sampleState.history.filter(row => !(row.type === "pending" && row.title === challenge.title));
        sampleState.history.unshift({ type: "earn", title: challenge.title, points: challenge.points, date: new Date().toISOString(), note: "" });
        sampleState.lifetime += challenge.points;
        sampleState.completed++;
        approved++;
    });
    sampleState.pending = {};
    const newBadges = sampleAwardBadges();
    saveSampleState();
    return { approved: approved, new_badges: newBadges };
}
