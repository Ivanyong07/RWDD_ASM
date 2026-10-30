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
const username = $("updateUsername");
const password = $("updatePassword");
const email = $("updateEmail");
const age = $("updateAge");
const tp_number = $("updateTpNumber");
const course = $("updateCourse");
const role = $("updateRole");
const total_xp = $("updateTotalXp");
const rank = $("updateRank");
const points_balance = $("updatePointsBalance");
const created_at = $("updateCreatedAt");

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

function openUpdateDialog(id){


    console.log("Update Dialog Open");

    current = Object.entries(users).find(([userId, user]) => {
        return Number(userId) === Number(id)
    })?.[1];

    username.value = current.username;
    password.value = current.password;
    email.value = current.email;
    age.value = current.age;
    tp_number.value = current.tp_number;
    course.value = current.course;
    role.value = current.role;
    total_xp.value = current.total_xp;
    rank.value = current.rank;
    points_balance.value = current.points_balance;
    created_at.value = current.created_at;

    updateDialog.showModal();
}

function openCreateDialog(){

    console.log("Create Dialog Open");

    createDialog.showModal();
}

// $("btnSaveUpdate").onclick = () => {
//     const user = users[currentId];

//     user.email = email.value;
//     user.age = Number(age.value);
//     user.tp_number = tp_number.value;
//     user.course = course.value;
//     user.role = role.value;
//     user.total_xp = Number(total_xp.value);
//     user.rank = rank.value;
//     user.points_balance = Number(points_balance.value);

//     updateDialog.close();
//     refreshUsersTable();
// };


$("dialogUpdateClose").onclick = () => updateDialog.close();
$("dialogViewClose").onclick = () => viewDialog.close();
$("btn-done").onclick = () => viewDialog.close();

tbody.addEventListener("click", event => {
    const viewBtn = event.target.closest("[data-view]");
    const updateBtn = event.target.closest("[data-update]");
    const createBtn = event.target.closest("[data-create]");

    if (viewBtn) openViewDialog(viewBtn.dataset.view);
    if (updateBtn) openUpdateDialog(updateBtn.dataset.update);
    if (createBtn) openCreateDialog(createBtn.datase.create);
});


// ==========================
// show Table
// ===========================

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