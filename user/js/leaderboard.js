/*
=================================
* Filename : leaderboard.js
* Date : 18/10/2026
* Author : (add your name)
* Description : Script of the Leaderboard page (leaderboard.html): the top 20 users by points
=================================
*/

/* ---------- 1. PAGE DATA ---------- */
let board = [];                         // the top users from getLeaderboard() in api.js (highest points first)
let me = null;                          // the logged-in user and their real position

/* ---------- 2. LOAD THE DATA, THEN DRAW THE PAGE ---------- */
async function loadAndRender() {
    const data = await getLeaderboard();
    board = data.list.slice(0, LEADERBOARD_LIMIT);      // never show more than the limit
    me = data.me;
    render();
}

/* ---------- 3. YOUR POSITION, POINTS AND RANK (three boxes at the top) ---------- */
function renderMe() {
    if (!me) { $("meCard").hidden = true; return; }

    $("meCard").innerHTML = `
        <div class="me-tile">
          <span class="me-icon">${ICON.level}</span>
          <div><span class="me-label">Position</span><b>#${me.position}</b></div>
        </div>
        <div class="me-tile">
          <span class="me-icon">${ICON.star}</span>
          <div><span class="me-label">Points</span><b>${me.points.toLocaleString()}</b></div>
        </div>
        <div class="me-tile">
          <span class="me-icon">${ICON.leaf}</span>
          <div><span class="me-label">Rank</span><b>${escapeHtml(me.rank_name)}</b></div>
        </div>`;
}

/* ---------- 4. THE TABLE (position, name, rank, points) ---------- */
function renderTable() {
    $("lbList").innerHTML = board.length ? board.map((person, index) => {
        const position = index + 1;
        return `
        <div class="lb-row item ${person.is_me ? "is-me" : ""}">
          <span class="lb-pos lb-pos--${position}">${position}</span>
          <div class="lb-user">
            ${avatar(person, 40)}
            <div class="lb-name">${escapeHtml(person.name)} ${person.is_me ? '<span class="tag tag--wait">You</span>' : ""}
              <div class="lb-sub">${escapeHtml(person.rank_name)}</div>
            </div>
          </div>
          <span class="chip chip--green">${ICON.leaf} ${escapeHtml(person.rank_name)}</span>
          <span class="lb-points">${person.points.toLocaleString()}</span>
        </div>`;
    }).join("") : '<p class="empty">No collectors yet.</p>';
}

/* ---------- 5. DRAW THE PAGE ---------- */
function render() {
    renderMe();
    renderTable();
    applySearch();
}

/* ---------- 6. START ---------- */
startPage(loadAndRender);
