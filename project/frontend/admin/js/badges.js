/*
=================================
* Filename : achievements.js
* Description : Draws badge cards and reward cards into a container.
*
* HOW TO USE (in your page script, after the data has loaded):
*     renderAchievements($("achievements"), badges, "badge",  { totalUsers: 1240, onAction });
*     renderAchievements($("achievements"), rewards, "reward", { onAction });
*
* BADGE  : { id, name, rule, pct, image, on }            pct = % of users who earned it
* REWARD : { id, name, text, cost, rank, stock, total, image, on }   stock = null means no limit
* image  : only the file name ("bottle.png") or a full path. Optional.
*
* onAction({ act, kind, id }) is called when Edit / Hide / Delete is clicked.
=================================
*/

let badges = null;

function renderBadges(){
    
    const container = $("badge");

    container.innerHTML = "";

    return badges.forEach(item => {
        container.innerHTML += `
            <article class="ach-card">

                <div class="ach-media">
                    <div class="ach-thumb">
                        <span>${item.name[0]}
                            ${item.image ? `<img src="images/badges/${item.image}" alt="">` : ""}
                        </span>
                    </div>
                </div>

                <div class="ach-head">
                    <div class="ach-title">
                        <h3>${item.name}</h3>
                        <p>${item.rule}</p>
                    </div>
                </div>

                <div class="ach-foot">
                    <button onclick="updateItem(${item.id})">Edit</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </div>

            </article>
        `;
    });
}

function refreshBadge(){
    renderBadges();
}

applySearch(refreshBadge);

async function initializeBadgePage(){
    badges = await getBadges();

    refreshBadge();
}

initializeBadgePage();