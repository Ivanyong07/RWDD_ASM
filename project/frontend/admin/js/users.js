/*
=================================
* Filename : users.js
* Date : 18/10/2026
* Author : ivan yong
* Description : create, update, delete and review for each users
=================================
*/

let users = [];

const updateDialog = $("updateDialog");
const viewDialog = $("viewDialog");
const createDialog = $("createDialog");
const tbody = $("usersBody");

const findUser = id => users.find(user => Number(user.id) === Number(id));

const params = new URLSearchParams(window.location.search);
const success = params.get("success");
const error = params.get("error");

if(success){
    const success_message = {
        created: "User created successfully!",
        updated: "User updated successfully!",
        deleted: "User deleted successfully!"
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


// ==========================
// show Table
// ===========================

function renderUsersTable(){
    const rows = users
        .filter(person => matches(person.username, person.email, person.tp_number))
        .map(person =>`
        <tr>
            <td>${esc(person.id)}</td>
            <td>${esc(person.username)}</td>
            <td>${esc(person.email)}</td>
            <td>${esc(person.tp_number)}</td>
            <td>${esc(person.role)}</td>
            <td class="action">
                <button class="btn-view" data-view="${person.id}"><img src="images/view.png" alt="View"/></button>
                <button class="btn-update" data-update="${person.id}""><img src="images/update.png" alt="Update"/></button>
                <button class="btn-delete" data-delete="${person.id}""><img src="images/delete.png" alt="Delete"/></button>
            </td>
        </tr>`);

    tbody.innerHTML = rows.length ? rows.join("") : '<tr><td colSpan="6">No users found</td></tr>';
}

function refreshUsersTable(){
    renderUsersTable();
}

// ===========================
// read
// =================================
function openViewDialog(id){

    console.log("View Dialog Open");
    const user = findUser(id);

    if(!user){
        return;
    }

    $("viewUserId").textContent = user.id;
    $("viewUsername").textContent = user.username;
    $("viewPassword").textContent = user.password;
    $("viewEmail").textContent = user.email;
    $("viewAge").textContent = user.age;
    $("viewTpNumber").textContent = user.tp_number;
    $("viewCourse").textContent = user.course;
    $("viewRole").textContent = user.role;
    $("viewTotalXp").textContent = user.total_xp;
    $("viewRank").textContent = user.rank;
    $("viewPointsBalance").textContent = user.points_balance;
    $("viewCreatedAt").textContent = user.created_at;

    viewDialog.showModal();

}

// ==========================
// Update user
// ==========================

function openUpdateDialog(id){


    console.log("Update Dialog Open");
    const user = findUser(id);

    if(!user){
        return;
    }

    $("updateUserId").value = user.id;
    $("updateUsername").value = user.username;
    $("updateEmail").value = user.email;
    $("updateAge").value = user.age;
    $("updateTpNumber").value = user.tp_number;
    $("updateCourse").value = user.course;
    $("updateRole").value = user.role;
    $("updateTotalXp").value = user.total_xp;
    $("updateRank").value = user.rank;
    $("updatePointsBalance").value = user.points_balance;
    $("updateCreatedAt").value = user.created_at;
 
    updateDialog.showModal();
}

// ====================
// Delete user
// ===================

function deleteUser(id){
    const user = findUser(id);

    if (!user) return;

    if (!confirm(`Delete user "${user.username}"?`)) return;

    $("deleteUserId").value = user.id;
    $("deleteForm").submit();
}

// ================================
// // all button function
// =================================

tbody.addEventListener("click", event => {
    const viewBtn = event.target.closest("[data-view]");
    const updateBtn = event.target.closest("[data-update]");
    const deleteBtn = event.target.closest("[data-delete]");

    if (viewBtn) openViewDialog(viewBtn.dataset.view);
    if (updateBtn) openUpdateDialog(updateBtn.dataset.update);
    if (deleteBtn) deleteUser(deleteBtn.dataset.delete);
});

$("btnCreate").onclick = () => createDialog.showModal();
$("dialogCreateClose").onclick = () => createDialog.close();
$("dialogViewClose").onclick = () => viewDialog.close();
$("btn-done").onclick = () => viewDialog.close();
$("dialogUpdateClose").onclick = () => updateDialog.close();


// ===================
// start
// ==================

applySearch(refreshUsersTable);

async function initializeUsersPage(){

    try {
        users = await getUsers();
        refreshUsersTable();
    } catch (error) {
        console.error(error);
        tbody.innerHTML = `<tr><td colspan="6">Could not load users: ${esc(error.message)}</td></tr>`;
    }   
}

initializeUsersPage();