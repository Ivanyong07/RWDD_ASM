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
const SAMPLE_STORE_KEY = "fun-collectors-sample-v2";

function createStartState() {
    const ago = days => new Date(Date.now() - days * 86400000).toISOString();
    return {
        lifetime: 135,            // all points ever earned (decides the rank)
        spent: 0,                 // points used on rewards
        completed: 4,             // approved challenges
        redeemed: 0,              // rewards redeemed
        badges: [],               // ids of unlocked badges

        // The user's latest try of each challenge: { challengeId: { status, joined_at, deadline, note } }
        // status: joined (time is running) | pending (photo sent) | approved | rejected
        attempts: {
            1: { status: "approved", joined_at: ago(5), deadline: ago(4), note: "" },
            2: { status: "approved", joined_at: ago(3), deadline: ago(-4), note: "" },
            3: { status: "approved", joined_at: ago(5), deadline: ago(4), note: "" },
            4: { status: "approved", joined_at: ago(3), deadline: ago(1), note: "" },
            5: { status: "rejected", joined_at: ago(1), deadline: ago(0.5), note: "The photo was too dark. Please try again." }
        },

        history: [                // newest first
            { type: "rejected", title: "Lights Out Hour",       points: 10, date: ago(0.6), note: "The photo was too dark. Please try again." },
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
function sampleAttemptsWith(status) {              // the attempts that have this status
    return Object.keys(sampleState.attempts).filter(id => sampleState.attempts[id].status === status);
}

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
            pending: sampleAttemptsWith("pending").length,
            badges: sampleState.badges.length,
            badge_total: SAMPLE_BADGES.length
        }
    };
}

// status: open (not joined) | joined | pending | approved | rejected
function sampleChallenges() {
    return SAMPLE_CHALLENGES.map(challenge => {
        const attempt = sampleState.attempts[challenge.id];
        return {
            ...challenge,
            status: attempt ? attempt.status : "open",
            joined_at: attempt ? attempt.joined_at : null,
            deadline: attempt ? attempt.deadline : null,        // the time the user must upload the photo before
            note: attempt ? attempt.note : ""                   // the admin's note when rejected
        };
    });
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

// The user joins a challenge: the time limit of the challenge starts now
function sampleJoin(challengeId) {
    const challenge = SAMPLE_CHALLENGES.find(c => c.id == challengeId);
    if (!challenge) throw new Error("Challenge not found");

    const attempt = sampleState.attempts[challengeId];
    if (attempt && attempt.status === "pending") throw new Error("Your photo is still waiting for review");
    if (attempt && attempt.status === "joined" && new Date(attempt.deadline) > new Date()) throw new Error("You already joined this challenge");

    const now = Date.now();
    sampleState.attempts[challengeId] = {
        status: "joined",
        joined_at: new Date(now).toISOString(),
        deadline: new Date(now + challenge.time_limit_hours * 3600000).toISOString(),
        note: ""
    };
    saveSampleState();
    return { message: "You joined " + challenge.title + ". Upload your photo before the time is up.", deadline: sampleState.attempts[challengeId].deadline };
}

// The user sends the photo (only possible after joining, and before the deadline)
function sampleSubmit(challengeId, file) {
    const challenge = SAMPLE_CHALLENGES.find(c => c.id == challengeId);
    if (!challenge) throw new Error("Challenge not found");
    if (!file) throw new Error("Please choose a photo to upload");

    const attempt = sampleState.attempts[challengeId];
    if (!attempt || attempt.status !== "joined") throw new Error("Join the challenge first");
    if (new Date(attempt.deadline) < new Date()) throw new Error("The time is up. Please join the challenge again.");

    attempt.status = "pending";
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

// DEMO ONLY: pretends to be the admin and approves every waiting photo
function sampleApprovePending() {
    const ids = sampleAttemptsWith("pending");
    ids.forEach(id => {
        const challenge = SAMPLE_CHALLENGES.find(c => c.id == id);
        sampleState.attempts[id].status = "approved";
        sampleState.history = sampleState.history.filter(row => !(row.type === "pending" && row.title === challenge.title));
        sampleState.history.unshift({ type: "earn", title: challenge.title, points: challenge.points, date: new Date().toISOString(), note: "" });
        sampleState.lifetime += challenge.points;
        sampleState.completed++;
    });
    const newBadges = sampleAwardBadges();
    saveSampleState();
    return { approved: ids.length, new_badges: newBadges };
}

// DEMO ONLY: pretends to be the admin and rejects every waiting photo
function sampleRejectPending() {
    const ids = sampleAttemptsWith("pending");
    const note = "The photo does not show the challenge clearly.";
    ids.forEach(id => {
        const challenge = SAMPLE_CHALLENGES.find(c => c.id == id);
        sampleState.attempts[id].status = "rejected";
        sampleState.attempts[id].note = note;
        sampleState.history.forEach(row => {
            if (row.type === "pending" && row.title === challenge.title) { row.type = "rejected"; row.note = note; }
        });
    });
    saveSampleState();
    return { rejected: ids.length };
}
