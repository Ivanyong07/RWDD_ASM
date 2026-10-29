/*
=================================
* Filename : users.js
* Date : 18/10/2026
* Author : ivan yong
* Description : create, update, delete and review for each users
=================================
*/

let users = [];
let current = null;
const updateDialog = $("updateDialog");
const viewDialog = $("viewDialog");
const createDialog = $("createDialog");
const tbody = $("usersBody");

function openViewDialog(id){

    current = users.find(s => id === Number(id));

    if(!current){
        return;
    }

    $("dUserId").textContent = id;
    $("dUsername").textContent = current.username;
    $("dPassword").textContent = current.password;
    $("dEmail").textContent = current.email;
    $("dAge").textContent = current.age;
    $("dTpNumber").textContent = current.tp_number;
    $("dCourse").textContent = current.course;
    $("dRole").textContent = current.role;
    $("dTotalXp").textContent = current.total_xp;
    $("dRank").textContent = current.rank;
    $("dPointsBalance").textContent = current.points_balance;
    $("dCreatedAt").textContent = current.created_at;


    dialog.showModal();

}

$("dialogViewClose").onclick = () => dialog.closest();

function openUpdateDialog(id){

}

$("dialogUpdateClose").onclick = () => dialog.closest();

function openCreateDialog(){

}

tbody.addEventListener("click", event => {
    const viewBtn = event.target.closest("[data-view");

    if (viewBtn) openViewDialog(viewBtn.dataset.view);
})

function renderUsersTable(){
    return $("usersBody").innerHTML = Object.entries(users)
    .filter(([id, person]) => matches(person.name, person.tp_number))
    .map(([id, person]) => `
        <tr>
            <td>${id}</td>
            <td>${person.username}</td>
            <td>${person.email}</td>
            <td>${person.tp_number}</td>
            <td>${person.role}</td>
            <td class="action">
                <button class="btn-view" data-view="${id}"><img src="images/view.png" alt="View"/></button>
                <button class="btn-update" data-view="${id}""><img src="images/update.png" alt="Update"/></button>
                <button class="btn-delete" data-view="${id}""><img src="images/delete.png" alt="Delete"/></button>
            </td>
        </tr>`).join("");
}

function refreshUsersTable(){
    renderUsersTable();
}

applySearch(refreshUsersTable);

async function initializeUsersPage(){
    users = await getUsers();
    refreshUsersTable();
}

initializeUsersPage();