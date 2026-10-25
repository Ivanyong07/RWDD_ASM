/*
=================================
* Filename : reviews.js
* Date : 18/10/2026
* Author : ivan yong
* Description : Review submission table and review actions
=================================
*/

// =======================
// Get DataTransfer
// =======================
const useSampleData = typeof USE_SAMPLE_DATA === "undefined" ? true : USE_SAMPLE_DATA;

async function getSubmissions(){
  
    if (useSampleData) {
      const response = await fetch("sample-data/submission.json");

      if (!response.ok){
        throw new Error(`Could not load submission (${response.status}).`);
      }

      const data = await response.json();

      if (!Array.isArray(data.submission)){
        throw new Error("The JSON file must contain a submission array");
      }

      return data.submission;
    }

    if (typeof ENDPOINTS === "undefined" || !ENDPOINTS.submission){
      throw new Error("ENPOINTS.submission is not configured.")
    }

    if (typeof request !=="function"){
      throw new Error("The request() API function is not loaded");
    }

    return (await request(ENDPOINTS.submission)).submission;
}

function getReviewCounts(){
  return submission.reduce((counts, submission) => {
    const status = String(submission.status || "").toLowerCase();
    if (status === "approved") {
      counts.approved++;
    } else if (status === "pending"){
      counts.pending++;
    } else {
      counts.rejected++;
    }
  }, {approved: 0, pending: 0, rejected: 0});
}

// =======================
// the 3 card stat
// =======================

async function renderStat(){

  const statsElement = document.getElementById("stats");

  const stats = await getReviewCounts();

  const items = [
    {label: "Completed", value: stats.completed, sub: "completed by all the student"},
    {label: "Pending", value: stats.pending, sub: "waiting to mark"},
    {label: "Rejected", value: stats.rejected, sub: "submission that were not acceptable"}
  ];

  $("stats").innerHTML = items.map(item => `
    <div class="card stat fade">
      <span class="stat__label">${item.label}</span>
      <b class="stat_value" data-count="${item.value}">0</b>
      <span class="stat__sub">${item.sub}</span>
    </div>
    `).join("");
}

// ============================
// pie chart in review page
// ===========================
async function renderPieChart(){

  const stats = await getReviewsPie();

  new Chart(document.getElementById('pie_chart'), {
    type: "pie",
    data: {
      labels : ["Approve", "Pending" ,"Rejected"],
      datasets: [{
        data: [stats.approved, stats.pending, stats.rejected],
        background: ["#0c9260", "#f5a623", "#d64545"]
      }]
    },
    options: {responsive: true, maintainAspectRatio: false}
  });
}

// ============================
// line chart in review page
// ===========================
async function renderLineChart(){

  const canvas = document.getElementById("line_chart");

  const lalels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const counts = labels.map((_, index) => {
    submission.filter(submission => {
      const data = new Date(submission.date);
      return !Number.isNaN(date.getTime()) && data.getDay() === index + 1;
    }).length
  })
}

// ==================================
// Table Submmision
// ================================

const dialog = document.getElementById("submissionDialog");
const tbody  = document.getElementById("submissionBody");
let current = null;                       // the submission being viewed

// 1. draw the table rows
function renderTable() {
  tbody.innerHTML = submission.map(s => `
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
  current = submission.find(s => s.id === Number(id));
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

// =================================
// Start
// =================================

let submission = [];
let stats = [];
async function initializeReviewPage() {
  renderStat();
  submission = await getSubmissions();
  renderTable();
}

initializeReviewPage();