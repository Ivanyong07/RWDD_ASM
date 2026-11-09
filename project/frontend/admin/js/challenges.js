/*
=================================
* Filename : challenge.js
* Date : 18/10/2026
* Author : ivan yong
* Description : create, update, delete and review for each challenge
=================================
*/

let challenges = [];

const updateDialog = $("updateDialog");
const viewDialog = $("viewDialog");
const createDialog = $("createDialog");

const challengeBody = $("challengeBody");

const findChallenge = id => challenges.find(challenge => Number(challenge.challenge_id) === Number(id));

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


const btnCreateChallenge = $("btnCreateChallenge");

// ===========================
// view
// =================================

function openViewChallengeDialog(id){

    const challenge = findChallenge(id);

    if (!challenge) {
        return;
    }

    $("challengeId").textContent = challenge.challenge_id;
    $("title").textContent = challenge.title;
    $("description").textContent = challenge.description;
    $("category").textContent = challenge.category;
    $("pointsReward").textContent = challenge.points_reward;
    $("xpReward").textContent = challenge.xp_reward;
    $("deadline").textContent = challenge.deadline;
    $("location").textContent = challenge.location;
    $("image").textContent = challenge.image;


    viewDialog.showModal();

}

// ===========================
// update
// =================================

function openUpdateChallengeDialog(id){

    const challenge = findChallenge(id);

    if (!challenge){
        return;
    }

    $("updateChallengeId").value = challenge.challenge_id;
    $("updateTitle").value = challenge.title;
    $("updateDescription").value = challenge.description;
    $("updateCategory").value = challenge.category;
    $("updatePointsReward").value = challenge.points_reward;
    $("updateXpReward").value = challenge.xp_reward;
    $("updateDeadline").value = challenge.deadline;
    $("updateImage").value = challenge.image;
    $("updateLocation").value = challenge.location;

    updateDialog.showModal();
}

function openCreateChallengeDialog(){
    createDialog.showModal();
}
// ==========================
// show Table
// ===========================

function renderChallengeTable(){
    challengeBody.innerHTML = "";


    const filteredChallenges = challenges.filter(item =>
        matches(item.title, item.category));

    filteredChallenges.forEach(item => {
        challengeBody.innerHTML += `
        
            <tr>
                <td>${item.challenge_id}</td>
                <td>${item.title}</td>
                <td>${item.category}</td>
                <td>${item.deadline}</td>
                <td>${item.created_by}</td>
                <td>
                <button data-view="${item.challenge_id}">View</button>
                <button data-update="${item.challenge_id}">Update</button>
                <button data-delete="${item.challenge_id}">Delete</button>
                </td>
            </tr>
        `
    });         
}

// ================================
// delete
// =================================

async function deleteChallenge(id){

    const challenge = findChallenge(id);
    
    if (!challenge){
        return;
    }

    if (!confirm(`Delete challenge "${challenge.title}"?`)) return;

    $("deleteChallengeId").value = challenge.challenge_id;
    $("deleteForm").submit();

}

// ================================
// // all button function
// =================================

challengeBody.addEventListener("click", event => {
    const viewChallengeBtn = event.target.closest("[data-view]");
    const updateChallengeBtn = event.target.closest("[data-update]");
    const createChallengeBtn = event.target.closest("[data-create]");

    const deleteChallengeBtn = event.target.closest("[data-delete]")

    if (viewChallengeBtn) openViewChallengeDialog(viewChallengeBtn.dataset.view);
    if (updateChallengeBtn) openUpdateChallengeDialog(updateChallengeBtn.dataset.update);
    if (createChallengeBtn) openCreateChallengeDialog(createChallengeBtn.dataset.create);
    if (deleteChallengeBtn) deleteChallenge(deleteChallengeBtn.dataset.delete);
});

btnCreateChallenge.addEventListener("click", openCreateChallengeDialog);
$("dialogViewClose").onclick = () => viewDialog.close();
$("dialogCreateClose").onclick = () => createDialog.close();
$("dialogUpdateClose").onclick = () => updateDialog.close();
$("dialogViewDone").onclick = () => viewDialog.close();


// ================================
// start
// =================================

function refreshChallengeTable(){
    renderChallengeTable();
}

applySearch(refreshChallengeTable);

async function initializeChallengePage(){
    challenges = await getChallenges();
    refreshChallengeTable();
}

initializeChallengePage();