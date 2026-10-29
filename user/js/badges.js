/*
=================================
* Filename : badges.js
* Date : 18/10/2026
* Author : (add your name)
* Description : Script of the Badges page (badges.html): the badge collection
=================================
*/

/* ---------- 1. PAGE DATA ---------- */
let badges = [];                        // from getBadges() in api.js

/* ---------- 2. LOAD THE DATA, THEN DRAW THE PAGE ---------- */
async function loadAndRender() {
    badges = await getBadges();
    render();
}

/* ---------- 3. DRAW THE PAGE ---------- */
function render() {
    const owned = badges.filter(badge => badge.earned).length;
    const percent = badges.length ? Math.round(owned / badges.length * 100) : 0;

    $("collectionText").innerHTML = `<b>${owned}</b> of ${badges.length} badges collected`;
    $("collectionFill").style.width = percent + "%";

    $("badgeGrid").innerHTML = badges.map(badge => `
        <article class="card badge-card item fade lift ${badge.earned ? "" : "locked"}">
          ${badge.earned ? "" : `<span class="lock">${ICON.lock}</span>`}
          <div class="photo photo--round">${photo(badge.image, badge.name)}</div>
          <h3>${escapeHtml(badge.name)}</h3>
          <p>${badge.earned ? "Unlocked" : escapeHtml(badge.description)}</p>
        </article>`).join("");

    applySearch();
}

/* ---------- 4. START ---------- */
startPage(loadAndRender);
