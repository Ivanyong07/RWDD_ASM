/*
=================================
* Filename : challenge.js
* Date : 18/10/2026
* Author : ivan yong
* Description : create, update, delete and review for each challenge
=================================
*/

let challenge = null;
let current = null;
const updateDialogChallenge = $("updateDialogChallenge");
const viewDialogChallenge = $("viewDialogChallenge");
const createDialogChallenge = $("createDialogChallenge");

const challengeBody = $("challengeBody");
const title = $("updateTitle");
const description = $("updateDescription");
const category = $("updateCategory");
const points_reward = $("updatePointsReward");
const xp_reward = $("updateXpReward");
const deadline = $("deadline");
const centre_id = $("updateCentreId");
const created_by = $("updateCreatedBy");

function openViewChallengeDialog(){

}

function openUpdateChallengeDialog(){

}

function openCreateChallengeDialog(){

}

challengeBody.addEventListener("click", event => {
    const viewChallengeBtn = event.target.closet("[data-view]");
    const updateChallengeBtn = event.target.closet("[data-update]");
    const createChallengeBtn = event.target.closet("[data-create]");

    if (viewChallengeBtn) openViewChallengeDialog(viewChallengeBtn.dataset.view);
    if (updateChallengeBtn) openUpdateChallengeDialog(updateChallengeBtn.dataset.update);
    if (createChallengeBtn) openCreateChallengeDialog(createChallengeBtn.dataset.create);
});

// ==========================
// show Table
// ===========================

function renderChallengeTable(){
    return 
}

function refreshChallengeTable(){
    renderChallengeTable
}

applySearch(refreshChallengeTable);

async function initializeChallengePage(){
    challenge = await getChallenges();
    refreshChallengeTable();
}

initializeChallengePage();