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

const challenge_id = $("challengeId");
const title = $("title");
const description = $("description");
const category = $("category");
const points_reward = $("pointsReward");
const xp_reward = $("xpReward");
const deadline = $("deadline");
const centre_id = $("centreId");
const created_by = $("createAt");


const btnCreateChallenge = $("btnCreateChallenge");

function openViewChallengeDialog(id){

    console.log("View Challenge Dialog Open");


    current = challenge.find(item => 
        Number(item.challenge_id) === Number(id)
    );

    if (!current){
        return;
    }

    challenge_id.textContent = current.challenge_id;
    title.textContent = current.title;
    description.textContent = current.description;
    category.textContent = current.category;
    points_reward.textContent = current.points_reward;
    deadline.textContent = current.deadline;
    centre_id.textContent = current.centre_id;
    created_by.textContent = current.created_by;

    viewDialogChallenge.showModal();

}

function openUpdateChallengeDialog(id){

    current = challenge.find(item => Number(item.challenge_id) === Number(id));

    if (!current){
        return;
    }

    $("updateChallengeId").value = current.challenge_id;
    $("updateTitle").value = current.title;
    $("updateDescription").value = current.description;
    $("updateCategory").value = current.category;
    $("updatePointsReward").value = current.points_reward;
    $("updateXpReward").value = current.xp_reward;
    $("updateDeadline").value = current.deadline;
    $("updateCentreId").value = current.centre_id;

    updateDialogChallenge.showModal();
}

function openCreateChallengeDialog(){
    createDialogChallenge.showModal();
}

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
$("dialogViewClose").onclick = () => viewDialogChallenge.close();
$("dialogCreateClose").onclick = () => createDialogChallenge.close();
$("dialogUpdateClose").onclick = () => updateDialogChallenge.close();
$("dialogViewDone").onclick = () => viewDialogChallenge.close();

// ==========================
// show Table
// ===========================

function renderChallengeTable(){
    challengeBody.innerHTML = "";


    const filteredChallenges = challenge.filter(item =>
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

async function deleteChallenge(id){

    console.log("Delete btn click");
    
    try{
        const response = await request(`${ENDPOINTS.challenge}?id=${id}`, {method: "DELETE"});

        if (response.success){
            challenge = challenge.filter(
                item => Number(item.challenge_id) !== Number(id)
            );
            refreshChallengeTable();
        }

        
 
    } catch(error) {
        console.error("Delete failed:", error);

    }


}

function refreshChallengeTable(){
    renderChallengeTable();
}

applySearch(refreshChallengeTable);

async function initializeChallengePage(){
    challenge = await getChallenges();
    refreshChallengeTable();
}

initializeChallengePage();