/*
=================================
* Filename : achievement.js
* Date : 18/10/2026
* Author : ivan yong
* Description : create, update, delete and review for each achievement
=================================
*/

let achievements = [];

const updateDialog = $("updateDialog");
const viewDialog = $("viewDialog");
const createDialog = $("createDialog");

const findAchievement = id => achievements.find(achievement => Number(achievement.id) === Number(id));

const params = new URLSearchParams(window.location.search);
const success = params.get("success");
const error = params.get("error");
const hue = name => (String(name).charCodeAt(0) * 37) % 360;

if (success){
    const success_message = {
        created: "User created successfully",
        updated: "User updated succesfully",
        deleted: "User deleted successfully"
    };

    if (success_message[success]){
        alert(success_message[success]);
    }
}

if (error){

    const error_message ={
        create_failed: "User created failed",
        update_failed: "User updated failed",
        delete_failed: "User deleted failed"
    };

    if(error_message[error]){
        alert(error_message[error]);
    }
}

if (params.toString()) {
    history.replaceState(null, "", window.location.pathname);   // so a refresh doesn't show the message again
}

function openCreateAchievementDialog(){
    createDialog.showModal();
}

// ===========================
// update
// =================================
function openUpdateAchievementDialog(id){
    const achievement = findAchievement(id);
 
    if (!achievement){
        return;
    }
 
    $("updateAchievementId").value = achievement.achievement_id;
    $("updateAchievementName").value = achievement.achievement_name;
    $("updateAchievementDescription").value = achievement.achievement_description;
    $("updateRequirementValue").value = achievement.requirement_value;
 
    updateDialog.showModal();
}

// ===========================
// delete
// =================================
function openDeleteAchievementDialog(id){
    const achievement = findAchievement(id);

    if (!achievement){
        return;
    }

    if (!confirm(`Delete achievement "${achievement.achievement_name}"?`)) return;
 
    $("deleteAchievementId").value = achievement.achievement_id;
    $("deleteForm").submit()
}


// ===========================
// show achievement
// =================================
function renderAchievement(){
 
    const cards = achievements
        .filter(item => matches(item.achievement_name, item.achievement_description))
        .map(item => `
            <article class="badge-card">
 
                <div class="badge-media">
                    <div class="badge-thumb" style="--h:${hue(item.achievement_name)}">
                        ${esc(String(item.achievement_name)[0] ?? "?")}
                        ${item.achievement_image ? `<img src="images/badges/${esc(item.achievement_image)}" alt="" onerror="this.remove()">` : ""}
                    </div>
                </div>
 
                <div class="badge-head">
                    <div class="badge-title">
                        <h3>${esc(item.achievement_name)}</h3>
                        <p>${esc(item.achievement_description)}</p>
                    </div>
                </div>
 
                <dl class="badge-facts">
                    <div><dt>Requirement</dt><dd>${esc(item.requirement_value)}</dd></div>
                </dl>
 
                <div class="badge-foot">
                    <button onclick="openUpdateAchievementDialog(${Number(item.achievement_id)})">Edit</button>
                    <button class="del" onclick="openDeleteAchievementDialog(${Number(item.achievement_id)})">Delete</button>
                </div>
 
            </article>`);
 
    $("achievement").innerHTML = cards.length ? cards.join("") : '<p class="badge-empty">No achievements found.</p>';
}

// ================================
// // all button function
// =================================

$("btnCreate").onclick = () => openCreateAchievementDialog();

function refreshAchievement(){
    renderAchievement();
}

applySearch(refreshAchievement);

async function initializeAchievementPage(){
    try {
        achievements = await getAchievement();
        refreshAchievement();
    } catch (error) {
        console.error(error);
        $("achievement").innerHTML = `<p class="ach-empty">Could not load achievements: ${esc(error.message)}</p>`;
    }
}

initializeAchievementPage();