/*
=================================
* Filename : challenge.js
* Date : 18/10/2026
* Author : (add your name)
* Description : Script of the Challenge page (index.html): join a challenge, time limit,
*               upload the photo, and the status of every challenge
=================================
*/

/* ---------- 1. PAGE DATA ---------- */
let challenges = [];                    // from getChallenges() in api.js
let statusFilter = "all";               // all, open, joined, pending, approved or rejected
let levelFilter = "all";                // all, beginner, intermediate or advanced
let joinTarget = null;                  // the challenge the user is about to join (join box)
let uploadChallenge = null;             // the challenge the photo is for (upload box)
let chosenFile = null;                  // the photo the user picked (upload box)

// The tabs above the challenges. "open" = not joined yet (or the time ran out).
const STATUS_TABS = [
    { key: "all", label: "All" },
    { key: "open", label: "Available" },
    { key: "joined", label: "In progress" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" }
];

// The level options (the "difficulty" of a challenge)
const LEVEL_TABS = [
    { key: "all", label: "All levels" },
    { key: "beginner", label: "Beginner" },
    { key: "intermediate", label: "Intermediate" },
    { key: "advanced", label: "Advanced" }
];

/* ---------- 2. LOAD THE DATA, THEN DRAW THE PAGE ---------- */
async function loadAndRender() {
    challenges = await getChallenges();
    renderTabs();
    renderChallenges();
}

/* ---------- 3. STATUS AND TIME HELPERS ---------- */

// The status the user sees. A joined challenge whose time is over becomes "expired".
function statusOf(challenge) {
    if (challenge.status === "joined" && new Date(challenge.deadline) <= new Date()) return "expired";
    return challenge.status;
}

// Which tab a challenge belongs to ("expired" counts as available again)
function tabOf(challenge) {
    const status = statusOf(challenge);
    return status === "expired" ? "open" : status;
}

function formatLimit(hours) {                       // 24 -> "24 hours", 168 -> "7 days"
    if (hours % 24 === 0) return (hours / 24) + (hours === 24 ? " day" : " days");
    return hours + " hours";
}

function timeLeft(deadline) {                       // the text of the countdown
    const ms = new Date(deadline) - new Date();
    if (ms <= 0) return { text: "Time is up", expired: true };

    const days = Math.floor(ms / 86400000);
    const hours = Math.floor(ms % 86400000 / 3600000);
    const minutes = Math.floor(ms % 3600000 / 60000);
    const seconds = Math.floor(ms % 60000 / 1000);

    if (days > 0) return { text: days + "d " + hours + "h", expired: false };
    if (hours > 0) return { text: hours + "h " + minutes + "m", expired: false };
    return { text: minutes + "m " + seconds + "s", expired: false };
}

/* ---------- 4. FILTERS: status tabs and level tabs (each with a count) ----------
   The two work together: for example "Approved" + "Beginner" shows only approved beginner challenges.
   The count on a tab is the number of challenges you would see if you pressed it. */
function matches(challenge, status, level) {
    const statusOk = status === "all" || tabOf(challenge) === status;
    const levelOk = level === "all" || challenge.difficulty === level;
    return statusOk && levelOk;
}

function renderTabs() {
    $("statusFilters").innerHTML = STATUS_TABS.map(tab => {
        const count = challenges.filter(c => matches(c, tab.key, levelFilter)).length;
        return `<button class="filter" data-status="${tab.key}" aria-pressed="${tab.key === statusFilter}">${tab.label} <span class="count">${count}</span></button>`;
    }).join("");

    $("levelFilters").innerHTML = LEVEL_TABS.map(tab => {
        const count = challenges.filter(c => matches(c, statusFilter, tab.key)).length;
        return `<button class="filter" data-level="${tab.key}" aria-pressed="${tab.key === levelFilter}">${tab.label} <span class="count">${count}</span></button>`;
    }).join("");
}

/* ---------- 5. CHALLENGE CARDS ---------- */

// What is shown above the button: the countdown or the status
function statusArea(challenge) {
    const status = statusOf(challenge);

    if (status === "joined") {
        return `<div class="countdown">${ICON.clock}<span>Time left</span><b data-deadline="${escapeHtml(challenge.deadline)}">${timeLeft(challenge.deadline).text}</b></div>`;
    }
    if (status === "pending")  return '<div class="card-status"><span class="tag tag--wait">Pending review</span></div>';
    if (status === "approved") return '<div class="card-status"><span class="tag tag--ok">Approved</span></div>';
    if (status === "rejected") return `<div class="card-status"><span class="tag tag--bad">Rejected${challenge.note ? ": " + escapeHtml(challenge.note) : ""}</span></div>`;
    if (status === "expired")  return '<div class="card-status"><span class="tag tag--bad">Time is up</span></div>';
    return "";
}

// The button: Join, then Upload photo, then wait
function actionButton(challenge) {
    const id = challenge.id;
    switch (statusOf(challenge)) {
        case "joined":   return `<button class="btn btn--full" data-action="upload" data-id="${id}">Upload photo</button>`;
        case "pending":  return '<button class="btn btn--full" disabled>Waiting for review</button>';
        case "approved": return `<button class="btn btn--ghost btn--full" data-action="join" data-id="${id}">Join again</button>`;
        case "rejected": return `<button class="btn btn--ghost btn--full" data-action="join" data-id="${id}">Try again</button>`;
        case "expired":  return `<button class="btn btn--full" data-action="join" data-id="${id}">Join again</button>`;
        default:         return `<button class="btn btn--full" data-action="join" data-id="${id}">Join</button>`;
    }
}

function renderChallenges() {
    const shown = challenges.filter(c => matches(c, statusFilter, levelFilter));

    $("challenges").innerHTML = shown.map(c => `
        <article class="card challenge-card item fade lift">
          <div class="photo">${photo(c.image, c.title)}</div>
          <h3 class="card-title">${escapeHtml(c.title)}</h3>
          <p class="card-text">${escapeHtml(c.description)}</p>
          <div class="card-meta">
            <span class="chip">${ICON.level} ${escapeHtml(c.difficulty)}</span>
            <span class="chip chip--amber">${ICON.star} ${c.points} points</span>
            <span class="chip">${ICON.clock} ${formatLimit(c.time_limit_hours)}</span>
          </div>
          ${statusArea(c)}
          <div class="card-action">${actionButton(c)}</div>
        </article>`).join("") || '<p class="muted">No challenges match these filters.</p>';

    applySearch();
}

/* ---------- 6. THE COUNTDOWN (updates every second) ---------- */
function tickCountdowns() {
    let timeIsUp = false;
    document.querySelectorAll("[data-deadline]").forEach(element => {
        const left = timeLeft(element.dataset.deadline);
        element.textContent = left.text;
        if (left.expired) timeIsUp = true;
    });

    if (timeIsUp) {                                  // the card changes to "Time is up" and "Join again"
        renderTabs();
        renderChallenges();
    }
}

setInterval(tickCountdowns, 1000);

/* ---------- 7. JOIN BOX (asks the user to confirm, because the time starts) ---------- */
function openJoinBox(challenge) {
    joinTarget = challenge;
    $("joinTitle").textContent = challenge.title;
    $("joinInfo").textContent = "You will have " + formatLimit(challenge.time_limit_hours) +
        " to upload a photo as proof. If the time is up, you need to join again.";
    $("joinModal").hidden = false;
}

function closeJoinBox() {
    $("joinModal").hidden = true;
    joinTarget = null;
}

async function confirmJoin() {                       // calls joinChallenge() in api.js
    if (!joinTarget) return;
    const id = joinTarget.id;
    closeJoinBox();
    try {
        const result = await joinChallenge(id);
        showToast(result.message);
        statusFilter = "joined";                     // show the challenge in the "In progress" tab
        startPage(loadAndRender, true);
    } catch (error) {
        showToast(error.message);
    }
}

/* ---------- 8. UPLOAD PHOTO BOX ----------
   Opens when the user presses "Upload photo" on a challenge they joined. The user picks
   (or drops) a photo, sees a preview, then presses Submit. */
function showUploadError(message) {
    $("uploadError").textContent = message;
    $("uploadError").hidden = message === "";
}

function resetUploadBox() {             // empty box: no photo, no error
    chosenFile = null;
    $("proofInput").value = "";
    $("proofPreview").hidden = true;
    $("proofPreview").removeAttribute("src");
    $("dropzone").classList.remove("has-photo");
    $("dropText").innerHTML = "Tap or drag a photo here<br><small>JPG, PNG or WEBP, up to 5 MB</small>";
    $("submitUpload").disabled = true;
    $("submitUpload").textContent = "Submit photo";
    showUploadError("");
}

function openUploadBox(challenge) {
    uploadChallenge = challenge;
    $("uploadTitle").textContent = challenge.title;
    $("uploadInfo").textContent = "Upload a photo as proof before the time is up. You get +" + challenge.points + " points after an admin approves it.";
    resetUploadBox();
    $("uploadModal").hidden = false;
    $("proofInput").focus();
}

function closeUploadBox() {
    $("uploadModal").hidden = true;
    uploadChallenge = null;
    resetUploadBox();
}

function chooseFile(file) {             // check the photo, then show a preview
    if (!file) return;
    if (!PHOTO_TYPES.includes(file.type)) { showUploadError("Please choose a JPG, PNG or WEBP photo."); return; }
    if (file.size > MAX_PHOTO_BYTES) { showUploadError("The photo is too large (maximum 5 MB)."); return; }

    chosenFile = file;
    showUploadError("");
    $("proofPreview").src = URL.createObjectURL(file);
    $("proofPreview").hidden = false;
    $("dropzone").classList.add("has-photo");
    $("dropText").textContent = "Tap to change the photo";
    $("submitUpload").disabled = false;
}

async function submitProof() {          // send the photo with submitChallengePhoto() in api.js
    if (!chosenFile || !uploadChallenge) return;

    $("submitUpload").disabled = true;
    $("submitUpload").textContent = "Uploading...";
    try {
        const result = await submitChallengePhoto(uploadChallenge.id, chosenFile);
        closeUploadBox();
        showToast(result.message);
        statusFilter = "pending";                    // show the challenge in the "Pending" tab
        startPage(loadAndRender, true);
    } catch (error) {
        showUploadError(error.message);              // keep the box open so the user can read the message
        $("submitUpload").disabled = false;
        $("submitUpload").textContent = "Submit photo";
    }
}

/* ---------- 9. EVENTS ---------- */
$("challenges").addEventListener("click", event => {         // "Join" and "Upload photo" buttons
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const challenge = challenges.find(c => c.id == button.dataset.id);
    if (button.dataset.action === "join") openJoinBox(challenge);
    if (button.dataset.action === "upload") openUploadBox(challenge);
});

$("statusFilters").addEventListener("click", event => {      // status tabs
    const tab = event.target.closest("[data-status]");
    if (!tab) return;
    statusFilter = tab.dataset.status;
    renderTabs();
    renderChallenges();
});

$("levelFilters").addEventListener("click", event => {       // level tabs
    const tab = event.target.closest("[data-level]");
    if (!tab) return;
    levelFilter = tab.dataset.level;
    renderTabs();
    renderChallenges();
});

$("confirmJoin").addEventListener("click", confirmJoin);
$("cancelJoin").addEventListener("click", closeJoinBox);
$("joinModal").addEventListener("click", event => { if (event.target === $("joinModal")) closeJoinBox(); });

$("proofInput").addEventListener("change", () => chooseFile($("proofInput").files[0]));
$("submitUpload").addEventListener("click", submitProof);
$("cancelUpload").addEventListener("click", closeUploadBox);
$("uploadModal").addEventListener("click", event => { if (event.target === $("uploadModal")) closeUploadBox(); });   // click outside

document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (!$("uploadModal").hidden) closeUploadBox();
    if (!$("joinModal").hidden) closeJoinBox();
});

$("dropzone").addEventListener("dragover", event => event.preventDefault());                       // allow dropping a photo
$("dropzone").addEventListener("drop", event => { event.preventDefault(); chooseFile(event.dataTransfer.files[0]); });

/* ---------- 10. START ---------- */
startPage(loadAndRender);
