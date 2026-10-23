/*
=================================
* Filename : challenge.js
* Date : 18/10/2026
* Author : (add your name)
* Description : Script of the Challenge page (index.html): numbers, rank progress, challenges, upload box
=================================
*/

/* ---------- 1. PAGE DATA ---------- */
let challenges = [];                    // from getChallenges() in api.js
let levelFilter = "all";                // all, beginner, intermediate or advanced
let uploadChallenge = null;             // the challenge the photo is for (upload box)
let chosenFile = null;                  // the photo the user picked (upload box)

/* ---------- 2. LOAD THE DATA, THEN DRAW THE PAGE ---------- */
async function loadAndRender() {
    challenges = await getChallenges();
    renderStats();
    renderFilters();
    renderChallenges();
}

/* ---------- 3. THREE NUMBER CARDS (points and rank are in the banner at the top) ---------- */
function renderStats() {
    const items = [
        { label: "Challenges completed", value: profile.stats.approved, sub: "approved by an admin" },
        { label: "Waiting for review", value: profile.stats.pending, sub: "photos you uploaded" },
        { label: "Challenges to try", value: challenges.length, sub: "pick one and upload a photo" }
    ];
    $("stats").innerHTML = items.map(item => `
        <div class="card stat fade">
          <span class="stat__label">${item.label}</span>
          <b class="stat__value" data-count="${item.value}">0</b>
          <span class="stat__sub">${item.sub}</span>
        </div>`).join("");
}

/* ---------- 4. CHALLENGES ---------- */
function renderFilters() {
    const levels = ["all", "beginner", "intermediate", "advanced"];
    $("levelFilters").innerHTML = levels.map(level =>
        `<button class="filter" data-level="${level}" aria-pressed="${level === levelFilter}">${level}</button>`).join("");
}

function renderChallenges() {
    const shown = challenges.filter(c => levelFilter === "all" || c.difficulty === levelFilter);

    $("challenges").innerHTML = shown.map(c => `
        <article class="card challenge-card item fade lift">
          <div class="photo">${photo(c.image, c.title)}</div>
          <h3 class="card-title">${escapeHtml(c.title)}</h3>
          <p class="card-text">${escapeHtml(c.description)}</p>
          <div class="card-meta">
            <span class="chip">${ICON.level} ${escapeHtml(c.difficulty)}</span>
            <span class="chip chip--amber">${ICON.star} ${c.points} points</span>
          </div>
          ${c.pending || c.latest_status === "rejected" ? `<div class="card-status">
            ${c.pending ? '<span class="tag tag--wait">Pending review</span>' : ""}
            ${c.latest_status === "rejected" ? '<span class="tag tag--bad">Rejected' + (c.latest_note ? ": " + escapeHtml(c.latest_note) : "") + "</span>" : ""}
          </div>` : ""}
          <div class="card-action">
            <button class="btn btn--full" data-challenge="${c.id}" ${c.pending ? "disabled" : ""}>${c.pending ? "Waiting for review" : "Upload photo"}</button>
          </div>
        </article>`).join("") || '<p class="muted">No challenges here yet.</p>';

    applySearch();
}

/* ---------- 5. UPLOAD PHOTO BOX ----------
   Opens when the user presses "Upload photo". The user picks (or drops) a photo,
   sees a preview, then presses Submit. */
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
    $("uploadInfo").textContent = "Upload a photo as proof. You get +" + challenge.points + " points after an admin approves it.";
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
        startPage(loadAndRender, true);                  // refresh so the card shows "Pending review"
    } catch (error) {
        showUploadError(error.message);                  // keep the box open so the user can try again
        $("submitUpload").disabled = false;
        $("submitUpload").textContent = "Submit photo";
    }
}

/* ---------- 6. EVENTS ---------- */
$("challenges").addEventListener("click", event => {         // "Upload photo" button opens the box
    const button = event.target.closest("[data-challenge]");
    if (!button || button.disabled) return;
    openUploadBox(challenges.find(c => c.id == button.dataset.challenge));
});

$("levelFilters").addEventListener("click", event => {       // filter buttons
    const button = event.target.closest("[data-level]");
    if (!button) return;
    levelFilter = button.dataset.level;
    renderFilters();
    renderChallenges();
});

$("proofInput").addEventListener("change", () => chooseFile($("proofInput").files[0]));
$("submitUpload").addEventListener("click", submitProof);
$("cancelUpload").addEventListener("click", closeUploadBox);
$("uploadModal").addEventListener("click", event => { if (event.target === $("uploadModal")) closeUploadBox(); });   // click outside
document.addEventListener("keydown", event => { if (event.key === "Escape" && !$("uploadModal").hidden) closeUploadBox(); });

$("dropzone").addEventListener("dragover", event => event.preventDefault());                       // allow dropping a photo
$("dropzone").addEventListener("drop", event => { event.preventDefault(); chooseFile(event.dataTransfer.files[0]); });

/* ---------- 7. START ---------- */
startPage(loadAndRender);
