/*
=================================
* Filename : users.js
* Date : 18/10/2026
* Author : ivan yong
* Description : create, update, delete and review for each users
=================================
*/

let users = null;
let current = null;
const updateDialog = $("updateDialog");
const viewDialog = $("viewDialog");
const createDialog = $("createDialog");
const tbody = $("usersBody");

function openViewDialog(id){

    console.log("View Dialog Open");
    current = Object.entries(users).find(([userId, user]) => {
        return Number(userId) === Number(id)
    })?.[1];

    if(!current){
        return;
    }

    console.log(current ? current: "Not Found Users Data");

    $("viewUserId").textContent = id;
    $("viewUsername").textContent = current.username;
    $("viewPassword").textContent = current.password;
    $("viewEmail").textContent = current.email;
    $("viewAge").textContent = current.age;
    $("viewTpNumber").textContent = current.tp_number;
    $("viewCourse").textContent = current.course;
    $("viewRole").textContent = current.role;
    $("viewTotalXp").textContent = current.total_xp;
    $("viewRank").textContent = current.rank;
    $("viewPointsBalance").textContent = current.points_balance;
    $("viewCreatedAt").textContent = current.created_at;


    viewDialog.showModal();

}

$("dialogViewClose").onclick = () => viewDialog.close();
$("btn-done").onclick = () => viewDialog.close();

function openUpdateDialog(id){

}

$("dialogUpdateClose").onclick = () => dialog.closest();

function openCreateDialog(){

}

tbody.addEventListener("click", event => {
    const viewBtn = event.target.closest("[data-view]");

    if (viewBtn) openViewDialog(viewBtn.dataset.view);
})

function renderUsersTable(){
    return $("usersBody").innerHTML = Object.entries(users)
    .filter(([id, person]) => matches(person.username, person.tp_number))
    .map(([id, person]) => `
        <tr>
            <td>${id}</td>
            <td>${person.username}</td>
            <td>${person.email}</td>
            <td>${person.tp_number}</td>
            <td>${person.role}</td>
            <td class="action">
                <button class="btn-view" data-view="${id}"><img src="images/view.png" alt="View"/></button>
                <button class="btn-update" data-update="${id}""><img src="images/update.png" alt="Update"/></button>
                <button class="btn-delete" data-delete="${id}""><img src="images/delete.png" alt="Delete"/></button>
            </td>
        </tr>`).join("");
}

function refreshUsersTable(){
    renderUsersTable();
}

applySearch(refreshUsersTable);

async function initializeUsersPage(){
    users = await getUsers();
    console.log(users ? users : "User not found");
    refreshUsersTable();
}

initializeUsersPage();