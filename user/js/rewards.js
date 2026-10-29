/*
=================================
* Filename : rewards.js
* Date : 18/10/2026
* Author : (add your name)
* Description : Script of the Rewards page (rewards.html): spend points on rewards
=================================
*/

/* ---------- 1. PAGE DATA ---------- */
let rewards = [];                       // from getRewards() in api.js

/* ---------- 2. LOAD THE DATA, THEN DRAW THE PAGE ---------- */
async function loadAndRender() {
    rewards = await getRewards();
    render();
}

/* ---------- 3. REDEEM A REWARD (the backend checks the rank and the points too) ---------- */
async function redeem(id) {
    try {
        const result = await redeemReward(id);
        showToast(result.message);
        showNewBadges(result.new_badges);
        startPage(loadAndRender, true);                  // refresh the balance and the buttons
    } catch (error) {
        showToast(error.message);
    }
}

/* ---------- 4. DRAW THE PAGE ---------- */
function render() {
    $("balancePoints").dataset.count = profile.points;

    $("rewardGrid").innerHTML = rewards.map(reward => {
        const rankTooLow = profile.rank.level < reward.min_level;      // the user's rank is too low
        const notEnough = profile.points < reward.cost;                // not enough points
        const needed = profile.ranks.find(rank => rank.level === reward.min_level);

        return `
        <article class="card reward-card item fade lift ${rankTooLow ? "locked" : ""}">
          <div class="photo">${photo(reward.image, reward.name)}</div>
          <h3 class="card-title">${escapeHtml(reward.name)}</h3>
          <p class="card-text">${escapeHtml(reward.description)}</p>
          <div class="card-meta">
            <span class="chip chip--amber">${ICON.star} ${reward.cost} points</span>
            ${rankTooLow ? `<span class="chip">${ICON.lock} ${escapeHtml(needed.name)} rank</span>` : ""}
          </div>
          <button class="btn btn--full" data-reward="${reward.id}" ${rankTooLow || notEnough ? "disabled" : ""}>
            ${rankTooLow ? "Locked" : notEnough ? "Need " + (reward.cost - profile.points) + " more points" : "Redeem"}
          </button>
        </article>`;
    }).join("");

    applySearch();
}

/* ---------- 5. EVENTS ---------- */
$("rewardGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-reward]");
    if (button && !button.disabled) redeem(button.dataset.reward);
});

/* ---------- 6. START ---------- */
startPage(loadAndRender);
