/*
=================================
* Filename : common.js
* Date : 18/10/2026
* Author : (add your name)
* Description : Small tools used by every page: helpers, toast, search, top bar and user menu
=================================
*/

/* ---------- 1. HELPER FUNCTIONS ---------- */
const $ = id => document.getElementById(id);

function escapeHtml(text) {                 // stops text from the database being read as HTML code
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return String(text ?? "").replace(/[&<>"']/g, ch => map[ch]);
}

function formatDate(time) {
    return new Date(String(time).replace(" ", "T")).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

// A photo from the images folder. A blank path gives nothing. If the file does not exist
// the <img> removes itself and the placeholder behind it shows instead.
function photo(path, alt) {
    if (!path) return "";
    return `<img src="${IMAGE_FOLDER}${escapeHtml(path)}" alt="${escapeHtml(alt)}" loading="lazy" onerror="this.remove()" />`;
}

// The round picture of a person: their photo, or the first letter of their name
function avatar(person, size = 36) {
    return `<span class="avatar" style="--size: ${size}px"><span>${escapeHtml(person.name.charAt(0).toUpperCase())}</span>${photo(person.picture, person.name)}</span>`;
}

/* ---------- 2. TOAST (small message at the bottom) ---------- */
function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function showNewBadges(names) {              // names = badges unlocked by the last action
    if (names && names.length) setTimeout(() => showToast("Badge unlocked: " + names.join(", ")), 1400);
}

/* ---------- 3. SEARCH BOX (hides every ".item" that does not match) ---------- */
function applySearch() {
    const query = $("search").value.trim().toLowerCase();
    document.querySelectorAll(".item").forEach(item => {
        item.hidden = query !== "" && !item.textContent.toLowerCase().includes(query);
    });
}

/* ---------- 4. THE USER'S PROFILE (top bar) ---------- */
let profile = null;                          // filled by loadProfile()

async function loadProfile() {
    profile = await getProfile();
    renderShared();
}

// The banner at the top of every page: points to spend, rank and progress to the next rank
function renderHero() {
    const next = profile.next_rank;
    let percent = 100;
    let progressText = "You reached the highest rank. Amazing!";

    if (next) {
        percent = Math.round((profile.lifetime - profile.rank.min_points) / (next.min_points - profile.rank.min_points) * 100);
        progressText = (next.min_points - profile.lifetime) + " more points to reach " + next.name;
    }

    $("hero").innerHTML = `
        <div>
          <div class="hero__hello">Welcome back, ${escapeHtml(profile.user.name.split(" ")[0])}</div>
          <div class="hero__points">
            ${ICON.star}
            <b data-count="${profile.points}">0</b>
            <span>points to spend</span>
          </div>
        </div>
        <div class="hero__rank">
          <div class="hero__rank-name">
            <span>${ICON.leaf} ${escapeHtml(profile.rank.name)}</span>
            <small>${profile.lifetime.toLocaleString()} earned in total</small>
          </div>
          <div class="bar"><div class="bar__fill" style="width: ${percent}%"></div></div>
          <div class="hero__sub">${progressText}</div>
        </div>`;
}

function renderShared() {
    const points = profile.points.toLocaleString();
    renderHero();

    $("userName").textContent = profile.user.name;
    $("userInitial").textContent = profile.user.name.charAt(0).toUpperCase();

    // Pictures stay blank until a path is written in config.js (or the user has a photo in the database)
    const picturePath = profile.user.picture || DEFAULT_PROFILE_PICTURE;
    if ($("userPic") && picturePath) $("userPic").src = IMAGE_FOLDER + picturePath;
    if ($("logoPic") && LOGO_PICTURE) $("logoPic").src = IMAGE_FOLDER + LOGO_PICTURE;

    $("menuRank").textContent = profile.rank.name + " member";
    $("menuPts").textContent = points + " points";
    $("ptsText").textContent = points;
}

/* ---------- 5. START A PAGE ----------
   Each page calls startPage(loadAndRender). It loads the profile, runs the page's own
   function, then counts the numbers up. Call it again to refresh the page after an action. */
let currentPageFunction = null;

async function startPage(pageFunction, quiet = false) {
    currentPageFunction = pageFunction;
    try {
        await loadProfile();
        await pageFunction();
    } catch (error) {
        showToast(error.message);
    }
    runPageEffects(quiet);
}

/* ---------- 6. EVENTS USED BY EVERY PAGE ---------- */
$("search").addEventListener("input", applySearch);

$("bellBtn").onclick = () => {
    const waiting = profile ? profile.stats.pending : 0;
    showToast(waiting > 0 ? waiting + " photo(s) waiting for admin review" : "No new notifications");
};

$("userBtn").onclick = () => {
    const menu = $("userMenu");
    menu.hidden = !menu.hidden;
    $("userBtn").setAttribute("aria-expanded", !menu.hidden);
};

document.addEventListener("click", event => {          // close the menu when clicking somewhere else
    if (!event.target.closest(".user-wrap")) {
        $("userMenu").hidden = true;
        $("userBtn").setAttribute("aria-expanded", "false");
    }
});

// Demo button: only shown in sample mode (there is no admin to approve photos yet)
if (USE_SAMPLE_DATA) {
    $("demoApprove").hidden = false;
    $("demoApprove").onclick = async () => {
        const result = await demoApprovePending();
        $("userMenu").hidden = true;
        showToast(result.approved ? result.approved + " photo(s) approved. Points added!" : "No photos are waiting.");
        showNewBadges(result.new_badges);
        startPage(currentPageFunction, true);
    };
}
