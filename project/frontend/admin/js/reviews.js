/*
=================================
* Filename : reviews.js
* Date : 18/10/2026
* Author : ivan yong
* Description : Script of the Challenge page (index.html): numbers, rank progress, challenges, upload box
=================================
*/


// ============================
// Stat in Review Page
// ===========================
function renderStat(){
  const items = [
    {label: "Completed", value: data.stats.completed, sub: "completed by all the student"},
    {label: "Pending", value: data.stats.pending, sub: "waiting to mark"},
    {label: "Rejected", value: data.stats.rejected, sub: "submission that not acceptable"}
  ];
  $("stats").innerHTML = items.map(item => `
    <div class="card stat fade">
      <span class="stat__label">${item.label}</span>
      <b class="stat_value" data-count="${item.value}">0</b>
      <span class="stat__sub">${item.sub}</span>
    </div>
    `).join("");
}

async function renderPieChart(){

  const stats = await getStats();

  new Chart(document.getElementById('pie_chart'), {
    type: "pie",
    data: {
      labels : ["Approve", "Pending" ,"Rejected"],
      dataset: [{
        data: [stats.approved, stats.pending, stats.rejected],
        background: ["#0c9260", "#f5a623", "#d64545"]
      }]
    }
  });
}

async function renderPieChart(){

  const stats = await getStats();

  new Chart(document.getElementById('pie_chart'), {
    type: "pie",
    data: {
      labels : ["Approve", "Pending" ,"Rejected"],
      dataset: [{
        data: [stats.approved, stats.pending, stats.rejected],
        background: ["#0c9260", "#f5a623", "#d64545"]
      }]
    }
  });
}




const submissions = [
  { id: 1, challenge: "Collect Tin", user: "Ivan", points: 20,
    date: "2026-10-23 14:30", status: "pending", photo: "" },
  { id: 2, challenge: "Recycle 10 Bottles", user: "Aiman", points: 20,
    date: "2026-10-22 09:10", status: "approved", photo: "" }
];

const dialog = document.getElementById("submissionDialog");
const tbody  = document.getElementById("submissionBody");
let current = null;                       // the submission being viewed

// 1. draw the table rows
function renderTable() {
  tbody.innerHTML = submissions.map(s => `
    <tr>
      <td>${s.id}</td>
      <td>${s.challenge}</td>
      <td>${s.user}</td>
      <td>${s.status}</td>
      <td><button class="btn" data-view="${s.id}">View</button></td>
    </tr>`).join("");
}

// 2. open the dialog and fill it
function openDialog(id) {
  current = submissions.find(s => s.id === Number(id));
  if (!current) return;

  document.getElementById("dId").textContent = "#" + current.id;
  document.getElementById("dChallenge").textContent = current.challenge;
  document.getElementById("dUser").textContent = current.user;
  document.getElementById("dPoints").textContent = current.points;
  document.getElementById("dDate").textContent = current.date;
  document.getElementById("dStatus").textContent = current.status;
  document.getElementById("dNote").value = "";

  const img = document.getElementById("dPhoto");
  img.src = current.photo;
  img.hidden = !current.photo;            // hide if there is no photo

  // only pending submissions can be approved or rejected
  const canReview = current.status === "pending";
  document.getElementById("dApprove").hidden = !canReview;
  document.getElementById("dReject").hidden = !canReview;

  dialog.showModal();                     // this opens it
}

// 3. events
tbody.addEventListener("click", event => {
  const button = event.target.closest("[data-view]");
  if (button) openDialog(button.dataset.view);
});

document.getElementById("dialogClose").onclick = () => dialog.close();

// click on the dark backdrop to close
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

document.getElementById("dApprove").onclick = () => {
  current.status = "approved";            // later: call the backend instead
  dialog.close();
  renderTable();
};

document.getElementById("dReject").onclick = () => {
  current.status = "rejected";
  current.note = document.getElementById("dNote").value;
  dialog.close();
  renderTable();
};

renderTable();