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
    return counts
  }, {approved: 0, pending: 0, rejected: 0});
}

// =======================
// the 3 card stat
// =======================

function renderStat(){

  const counts = getReviewCounts();

  const items = [
    {label: "Completed", value: counts.approved, sub: "Completed by all the student"},
    {label: "Pending", value: counts.pending, sub: "Waiting to mark"},
    {label: "Rejected", value: counts.rejected, sub: "Submission that were not acceptable"}
  ];

  $("stats").innerHTML = items.map(item => `
    <div class="card stat">
      <span class="stat__label">${item.label}</span>
      <b class="stat_value">${item.value}</b>
      <span class="stat__sub">${item.sub}</span>
    </div>
    `).join("");
}

// ============================
// pie chart in review page
// ===========================
let pieChart = null;
async function renderPieChart(){

  const counts = getReviewCounts();

  const data = [counts.approved, counts.pending, counts.rejected];

  if (pieChart){
    pieChart.data.datasets[0].data = data;
    pieChart.update();
    return;
  }

  pieChart = new Chart($("pie_chart"), {
    type : "pie",
    data : {
      labels: ["Approved", "Pending", "Rejected"],
      datasets: [{data,
        backgroundColor: ["#0c9260", "#f5a623", "#d64545"]
      }]
    },
    options: {responsive: true, maintainAspectRatio: false}
  });
}

// ============================
// line chart in review page
// ===========================
let lineChart = null;
function renderLineChart() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const counts = labels.map((_, index) =>
    submission.filter(s => {
      const date = new Date(String(s.date).replace(" ", "T"));
      return !Number.isNaN(date.getTime()) && date.getDay() === index + 1;   // Mon = 1
    }).length
  );

  if (lineChart) {
    lineChart.data.datasets[0].data = counts;
    lineChart.update();
    return;
  }
  lineChart = new Chart($("line_chart"), {
  type: "line",
  data: {
    labels,
    datasets: [{
      data: counts,
      borderColor: "#0c9260",
      backgroundColor: "rgba(12, 146, 96, 0.12)",
      fill: true,
      tension: 0.35,
      pointRadius: 3,                       // small dots always visible
      pointHoverRadius: 6,                  // grows when hovered
      pointBackgroundColor: "#0c9260",
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },   // ← the important part
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f2a24",
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: item => item.parsed.y + " submissions"   // text shown in the hover box
        }
      }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }    // whole numbers only
    }
  }
});
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

function refreshReview(){
  renderStat();
  renderPieChart();
  renderLineChart();
  renderTable();
}

let submission = [];
let stats = [];

async function initializeReviewPage() {
  submission = await getSubmissions();
  refreshReview();
}

$("dApprove").onclick = () => {
  current.status = "approved";
  dialog.close();
  refreshReview();
}

$("dReject").onclick = () => {
  current.status = "rejected";
  dialog.close();
  refreshReview();
}


initializeReviewPage();