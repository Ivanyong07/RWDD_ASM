/*
=================================
* Filename : history.js
* Date : 18/10/2026
* Author : (add your name)
* Description : Script of the History page (history.html): points earned and spent, photos waiting
=================================
*/

/* ---------- 1. PAGE DATA ---------- */
let rows = [];                          // from getHistory() in api.js
let filter = "all";                     // all, earn, spend or review

const ROW_ICONS = { earn: ICON.leaf, spend: ICON.gift, pending: ICON.hourglass, rejected: ICON.cross };
const ROW_NOTES = { pending: "Waiting for review", rejected: "Rejected" };

/* ---------- 2. LOAD THE DATA, THEN DRAW THE PAGE ---------- */
async function loadAndRender() {
    rows = await getHistory();
    render();
}

function matchesFilter(row) {
    if (filter === "all") return true;
    if (filter === "review") return row.type === "pending" || row.type === "rejected";
    return row.type === filter;
}

/* ---------- 3. DRAW THE PAGE ---------- */
function render() {
    // Three number cards
    const items = [
        { value: profile.lifetime, label: "Points earned" },
        { value: profile.spent, label: "Points spent" },
        { value: profile.points, label: "Points left to spend" }
    ];
    $("summary").innerHTML = items.map(item => `
        <div class="card stat fade">
          <span class="stat__label">${item.label}</span>
          <b class="stat__value" data-count="${item.value}">0</b>
        </div>`).join("");

    // Filter buttons
    document.querySelectorAll(".filter").forEach(button =>
        button.setAttribute("aria-pressed", button.dataset.filter === filter));

    // List
    const shown = rows.filter(matchesFilter);
    $("histList").innerHTML = shown.length ? shown.map(row => {
        const sign = row.type === "earn" ? "+" : row.type === "spend" ? "\u2212" : "";
        const style = row.type === "earn" ? "earn" : row.type === "spend" ? "spend" : "wait";
        const note = ROW_NOTES[row.type] ? ROW_NOTES[row.type] + (row.note ? ": " + row.note : "") + " \u00b7 " : "";
        return `
        <div class="row row--${row.type} item">
          <span class="row-icon">${ROW_ICONS[row.type]}</span>
          <div class="row-text">
            <div class="row-title">${escapeHtml(row.title)}</div>
            <div class="muted">${escapeHtml(note)}${formatDate(row.date)}</div>
          </div>
          <span class="row-points row-points--${style}">${sign}${row.points}</span>
        </div>`;
    }).join("") : '<p class="empty">Nothing here yet. Complete a challenge to earn points.</p>';

    applySearch();
}

/* ---------- 4. EVENTS ---------- */
$("filters").addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    filter = button.dataset.filter;
    render();
});

/* ---------- 5. START ---------- */
startPage(loadAndRender);
