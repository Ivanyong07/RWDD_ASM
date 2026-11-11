// =================================
// * Filename : AchievementControllers.php
// * Date : 16/10/2026
// * Author : Ivan Yong
// * Description : For delete, login, get all list of users, and upate user
// =================================

let rewards = [];

const updateDialog = $("updateDialog");
const viewDialog = $("viewDialog");
const createDialog = $("createDialog");

const findReward = id => rewards.find(reward => Number(reward.reward_id) === Number(id));

const params = new URLSearchParams(window.location.search);
const success = params.get("success");
const error = params.get("error");
const hue = name => (String(name).charCodeAt(0) * 37) % 360;

if (success){
    const success_message = {
        created: "Reward created successfully",
        updated: "Reward updated successfully",
        deleted: "Reward deleted successfully"
    }

    if (success_message[success]){
        alert(success_message[success]);
    }
}

if (error){

    const error_message = {
        create_failed: "Achievement created failed",
        update_failed: "Achievement updated failed",
        delete_failed: "Achievement deleted failed"
    };

    if(error_message[error]){
        alert(error_message[error]);
    }
}

if (params.toString()) {
    history.replaceState(null, "", window.location.pathname);   // so a refresh doesn't show the message again
}


// ===========================
// update
// =================================
function openCreateRewardDialog(){
    console.log("Created Dialog Click");
    createDialog.showModal();
}

// ===========================
// update
// =================================
function openUpdateRewardDialog(id){

    console.log("Update Dialog Check");
    const reward = findReward(id);

    if (!reward){
        return;
    }

    $("updateRewardId").value = reward.reward_id;
    $("updateRewardItem").value = reward.reward_item;
    $("updateDescription").value = reward.description;
    $("updatePointsCost").value = reward.points_cost;
    $("updateStock").value = reward.stock;
    $("updateOldImage").value = reward.image ?? "";

    updateDialog.showModal();
}

// ===========================
// delete
// =================================
function openDeleteRewardDialog(id){
    const reward = findReward(id);

    if (!reward){
        return;
    }

    if (!confirm(`Delete reward "${reward.reward_item}" ?`)) return;

    $("deleteRewardId").value = reward.reward_id;
    $("deleteForm").submit();
}

// ===========================
// delete
// =================================
function renderReward(){

    const cards = rewards
        .filter(item => matches(item.reward_item, item.description))
        .map(item => `
            <article class="reward-card">

                <div class="reward-media">
                    <div class="reward-thumb" style="--h:${hue(item.reward_item)}">
                        ${esc(String(item.reward_item)[0] ?? "?")}
                        ${item.image ? `<img src="images/reward/${esc(item.image)}" alt="" onerror="this.remove()">` : ""}
                    </div>
                </div>

                <div class="reward-head">
                    <div class="reward-title">
                        <h3>${esc(item.reward_item)}</h3>
                        <p>${esc(item.description)}</p>
                    </div>
                </div>

                <dl class="reward-facts">
                    <div><dt>Cost</dt><dd>${esc(item.points_cost)} pts</dd></div>
                    <div><dt>In stock</dt><dd class="${Number(item.stock) === 0 ? "bad" : ""}">${Number(item.stock) === 0 ? "Out of stock" : esc(item.stock)}</dd></div>
                </dl>

                <div class="reward-foot">
                    <button onclick="openUpdateRewardDialog(${Number(item.reward_id)})">Edit</button>
                    <button class="del" onclick="openDeleteRewardDialog(${Number(item.reward_id)})">Delete</button>
                </div>

            </article>`);

    $("rewards").innerHTML = cards.length ? cards.join("") : '<p class="reward-empty">No rewards found.</p>';
}

// ================================
// // all button function
// =================================

$("btnCreate").onclick = () => openCreateRewardDialog();
$("dialogCreateClose").onclick = () => createDialog.close();
$("dialogUpdateClose").onclick = () => updateDialog.close();

function refreshReward(){
    renderReward();
}

applySearch(refreshReward);

async function initializeRewardPage() {
    try {
        rewards = await getRewards();
        refreshReward();
    } catch(error){
        console.error(error);
        $("message").innerHTML = cards.length ? cards.join("") : '<p class="reward-empty">No rewards found.</p>';
    }
}

initializeRewardPage();

