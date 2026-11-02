/*
=================================
* Filename : profile.js
* Date : 18/10/2026
* Author : (add your name)
* Description : Script of the Profile page (profile.html): cover, numbers, overview and badges
=================================
*/

/* ---------- 1. SETTINGS OF THIS PAGE ---------- */

// The cover picture behind the profile picture, left blank (for example "profile-cover.jpeg" inside images/)
const COVER_PICTURE = "";

// Icons used only on this page (the shared icons are in icons.js)
const P_ICON = {
    flag: '<svg viewBox="0 0 24 24"><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></svg>',
    medal: '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" /></svg>',
    trophy: '<svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" /></svg>',
    podium: '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21v-8h4v8M10 21V8h4v13M15 21v-5h4v5" /></svg>'
};

/* ---------- 2. PAGE DATA ---------- */
let history = [];                       // from getHistory() in api.js
let badges = [];                        // from getBadges() in api.js
let board = { list: [], me: null };     // from getLeaderboard() in api.js (only used for the position)
let activeTab = "overview";             // overview or badges

/* ---------- 3. LOAD THE DATA, THEN DRAW THE PAGE ---------- */
async function loadAndRender() {
    [history, badges, board] = await Promise.all([getHistory(), getBadges(), getLeaderboard()]);
    render();
}

/* ---------- 4. PROFILE CARD ---------- */
function pstat(icon, valueHtml, label) {              // one number: icon, value, label
    return `<div class="pstat">${icon}${valueHtml}<span>${label}</span></div>`;
}

function renderHeader() {
    const rank = profile.rank;
    const position = board.me ? "#" + board.me.position : "-";

    $("cover").style.setProperty("--cover", COVER_PICTURE ? `url("${IMAGE_FOLDER}${COVER_PICTURE}")` : "none");

    $("profileAvatar").innerHTML = avatar(profile.user, 112);
    $("profileName").textContent = profile.user.name;
    $("profileRole").innerHTML = `<p class="muted">Level ${rank.level} collector</p><span class="chip chip--green">${ICON.leaf} ${escapeHtml(rank.name)}</span>`;

    $("statsLeft").innerHTML =
        pstat(P_ICON.flag, `<b data-count="${profile.stats.approved}">0</b>`, "Challenges") +
        pstat(P_ICON.medal, `<b data-count="${profile.stats.badges}">0</b>`, "Badges") +
        pstat(ICON.star, `<b data-count="${profile.lifetime}">0</b>`, "Points earned");

    $("statsRight").innerHTML =
        pstat(P_ICON.trophy, `<b>${escapeHtml(rank.name)}</b>`, "Rank") +
        pstat(P_ICON.podium, `<b>${position}</b>`, "Position") +
        '<a class="btn" href="leaderboard.html">Leaderboard</a>';
}

/* ---------- 5. OVERVIEW TAB: ABOUT + RECENT ACTIVITY ---------- */
const ACT_ICONS = { earn: ICON.leaf, spend: ICON.gift, pending: ICON.hourglass, rejected: ICON.cross };

function renderOverview() {
    const next = profile.next_rank;
    const rows = [
        ["Name", escapeHtml(profile.user.name)],
        ["Rank", escapeHtml(profile.rank.name) + " (level " + profile.rank.level + ")"],
        ["Next rank", next ? escapeHtml(next.name) + " in " + (next.min_points - profile.lifetime) + " points" : "Top rank reached"],
        ["Points to spend", profile.points.toLocaleString()],
        ["Points earned", profile.lifetime.toLocaleString()],
        ["Points spent", profile.spent.toLocaleString()],
        ["Challenges completed", profile.stats.approved],
        ["Waiting for review", profile.stats.pending],
        ["Leaderboard position", board.me ? "#" + board.me.position : "-"]
    ];
    $("aboutList").innerHTML = rows.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");

    const recent = history.slice(0, 5);                // the five newest lines
    $("activityList").innerHTML = recent.length ? recent.map(row => {
        const sign = row.type === "earn" ? "+" : row.type === "spend" ? "\u2212" : "";
        const style = row.type === "earn" ? "earn" : row.type === "spend" ? "spend" : "wait";
        return `
        <div class="act act--${row.type} item">
          <span class="act-icon">${ACT_ICONS[row.type]}</span>
          <div class="act-text"><b>${escapeHtml(row.title)}</b><span class="muted">${formatDate(row.date)}</span></div>
          <span class="act-points act-points--${style}">${sign}${row.points}</span>
        </div>`;
    }).join("") : '<p class="muted">No activity yet.</p>';
}

/* ---------- 6. BADGES TAB ---------- */
function renderBadges() {
    const owned = badges.filter(badge => badge.earned).length;
    $("badgeCount").textContent = owned + " / " + badges.length;

    const sorted = [...badges].sort((a, b) => Number(b.earned) - Number(a.earned));    // unlocked badges first
    $("badgeGrid").innerHTML = sorted.map(badge => `
        <article class="card mini-badge item lift ${badge.earned ? "" : "locked"}">
          <div class="photo photo--round">${photo(badge.image, badge.name)}</div>
          <h3>${escapeHtml(badge.name)}</h3>
          <p>${badge.earned ? "Unlocked" : escapeHtml(badge.description)}</p>
        </article>`).join("");
}

/* ---------- 7. TABS ---------- */
function showTab(name) {
    activeTab = name;
    ["overview", "badges"].forEach(tab => { $("tab-" + tab).hidden = tab !== name; });
    document.querySelectorAll(".ptab").forEach(button =>
        button.setAttribute("aria-selected", button.dataset.tab === name));
}

/* ---------- 8. DRAW THE PAGE ---------- */
function render() {
    renderHeader();
    renderOverview();
    renderBadges();
    showTab(activeTab);
    applySearch();
}

/* ---------- 9. EVENTS ---------- */
document.querySelector(".profile-tabs").addEventListener("click", event => {
    const button = event.target.closest("[data-tab]");
    if (button) showTab(button.dataset.tab);
});

/* ---------- 10. START ---------- */
startPage(loadAndRender);