/*
=================================
* Filename : leaderboard.js
* Date : 18/10/2026
* Author : ivan yong
* Description : This file include all the commone function that we need including config, data fetching, sample data fetching, api
=================================
*/

// ========================
// rank intro
// =========================

const track = $("track");
const items = [...track.querySelectorAll(".item")];
let index = 2;

function show(){
    items.forEach((item, i) => item.classList.toggle("active", i === index));
    // if the index != i tooggle deactivate
    items[index].scrollIntoView({
        inline: "center", 
        block: "nearest", 
        behavior: "smooth"
    });

    $("prev").disabled = index === 0;
    $("next").disabled = index === items.length -1;
}

$("prev").onclick = () => {index--; show()};
$("next").onclick = () => {index++; show()};
items.forEach((item, i) => item.onclick = () => {index = i; show();});

// =============================
// leaderboard Table
// ===========================

let leaderboard = [];

function renderLeaderboard(){

    return $("leaderboardBody").innerHTML = Object.entries(leaderboard)
    .filter(([id, person]) => matches(person.name, person.rank))
    .sort((a, b) => b[1].points - a[1].points) // if b - a is (+) remain b else remain a
    .map(([id, person]) => `
            <tr>
                <td>${id}</td>
                <td>${person.name}</td>
                <td>${person.rank}</td>
                <td>${person.points}</td>
            </tr>`).join("");
}



function refreshLeaderboard(){
    renderLeaderboard();
}

applySearch(refreshLeaderboard);

async function initializeLeaderboardPage(){
    leaderboard = await getLeaderboard();
    refreshLeaderboard();
}

initializeLeaderboardPage();