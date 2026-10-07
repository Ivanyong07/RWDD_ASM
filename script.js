/* ---------- Config: edit these to fit your app ---------- */
const RANKS=[{n:"Bronze",min:0},{n:"Silver",min:200},{n:"Gold",min:500},{n:"Platinum",min:900},{n:"Diamond",min:1500}];
const CHALLENGES=[
 {id:"checkin",ic:"✅",t:"Daily check-in",d:"Open the app today",p:20},
 {id:"run",ic:"🏃",t:"Run 5 km",d:"Log a 5 km run",p:100},
 {id:"read",ic:"📖",t:"Read for 30 minutes",d:"Finish a reading session",p:80},
 {id:"review",ic:"✍️",t:"Write a review",d:"Share feedback on a product",p:60},
 {id:"refer",ic:"🤝",t:"Refer a friend",d:"Invite someone who signs up",p:200},
 {id:"streak",ic:"🔥",t:"7-day streak",d:"Be active 7 days in a row",p:400}
];
const BADGES=[
 {id:"first",ic:"🌱",t:"First step",d:"Complete 1 challenge",ok:s=>s.total>=1},
 {id:"roll",ic:"🔥",t:"On a roll",d:"Complete 5 challenges",ok:s=>s.total>=5},
 {id:"social",ic:"🤝",t:"Connector",d:"Refer a friend",ok:s=>(s.counts.refer||0)>=1},
 {id:"silver",ic:"🥈",t:"Silver member",d:"Reach Silver rank",ok:s=>rankIdx(s)>=1},
 {id:"gold",ic:"🥇",t:"Gold member",d:"Reach Gold rank",ok:s=>rankIdx(s)>=2},
 {id:"shop",ic:"🛍️",t:"First redeem",d:"Redeem a reward",ok:s=>s.redeemed>=1},
 {id:"spend",ic:"💎",t:"Big spender",d:"Spend 500 points in total",ok:s=>s.spent>=500}
];
const REWARDS=[
 {id:"coffee",ic:"☕",t:"Coffee voucher",d:"One free drink at partner cafés",c:150,r:0},
 {id:"disc",ic:"🏷️",t:"10% discount",d:"Applies to your next order",c:300,r:0},
 {id:"ship",ic:"📦",t:"Free shipping",d:"On any order for 30 days",c:250,r:1},
 {id:"bottle",ic:"🧴",t:"Sports bottle",d:"Limited edition, shipped to you",c:400,r:2},
 {id:"month",ic:"⭐",t:"Premium month",d:"One month of premium features",c:800,r:3},
 {id:"gift",ic:"🎁",t:"Gift card",d:"Cash-value gift card",c:1000,r:3}
];
const TINTS=["#e3f6ee","#e4efff","#fff1db","#fde6ee","#ece6ff","#e0f4f7"];
const TITLES={rank:"Rank",history:"History",badges:"Badge collection",rewards:"Rewards"};

/* ---------- State ---------- */
const KEY="userpage-demo-v1";
const seed=()=>({points:180,life:180,total:2,spent:0,redeemed:0,counts:{checkin:1,run:1},badges:["first"],
 history:[{k:"earn",t:"Welcome bonus",p:60,d:Date.now()-6*864e5},{k:"earn",t:"Daily check-in",p:20,d:Date.now()-3*864e5},{k:"earn",t:"Run 5 km",p:100,d:Date.now()-864e5}]});
let S;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S)S=seed();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const rankIdx=s=>{let i=0;RANKS.forEach((r,j)=>{if(s.life>=r.min)i=j});return i};
const $=id=>document.getElementById(id);
const FIRST=$("userName").textContent.split(" ")[0];
let filter="all",tab="rank",slide=0;

/* ---------- Actions ---------- */
function toast(m){const t=$("toast");t.textContent=m;t.classList.add("show");clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove("show"),2600)}
function checkBadges(){
 BADGES.forEach(b=>{if(!S.badges.includes(b.id)&&b.ok(S)){S.badges.push(b.id);setTimeout(()=>toast("Badge unlocked: "+b.t),900)}});
}
function complete(id){
 const c=CHALLENGES.find(x=>x.id===id),before=rankIdx(S);
 S.points+=c.p;S.life+=c.p;S.total++;S.counts[id]=(S.counts[id]||0)+1;
 S.history.unshift({k:"earn",t:c.t,p:c.p,d:Date.now()});
 const after=rankIdx(S);
 toast(after>before?"Rank up! You are now "+RANKS[after].n:"+"+c.p+" points");
 checkBadges();save();render();
}
function redeem(id){
 const r=REWARDS.find(x=>x.id===id);
 if(S.points<r.c||rankIdx(S)<r.r)return;
 S.points-=r.c;S.spent+=r.c;S.redeemed++;
 S.history.unshift({k:"spend",t:"Redeemed: "+r.t,p:r.c,d:Date.now()});
 toast(r.t+" redeemed");checkBadges();save();render();
}
function go(t){
 tab=t;$("search").value="";
 document.querySelectorAll(".rail button").forEach(x=>x.setAttribute("aria-selected",x.dataset.tab===t));
 ["rank","history","badges","rewards"].forEach(id=>$(id).hidden=id!==t);
 $("pageTitle").textContent=TITLES[t];
 applySearch();
}

/* ---------- Render ---------- */
const fmt=d=>new Date(d).toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"});
function slides(){
 const i=rankIdx(S),cur=RANKS[i],nxt=RANKS[i+1];
 return [
  {k:"Welcome back, "+FIRST,t:nxt?`You are ${cur.n}. ${nxt.min-S.life} points to reach ${nxt.n}.`:`You hold the top rank: ${cur.n}.`,b:"View my rank",to:"rank"},
  {k:"Featured challenge",t:"Finish a 7-day streak and earn +400 points",b:"Take challenge",to:"rank"},
  {k:"Rewards",t:`You have ${S.points} points to spend. Pick a reward today.`,b:"Explore rewards",to:"rewards"}
 ];
}
function renderSlides(){
 const s=slides();
 $("track").innerHTML=s.map(x=>`<div class="slide"><small>${x.k}</small><h3>${x.t}</h3><button data-go="${x.to}">${x.b}</button></div>`).join("");
 $("dots").innerHTML=s.map((_,j)=>`<i class="${j===slide?"on":""}"></i>`).join("");
 $("track").style.transform=`translateX(-${slide*100}%)`;
}
function render(){
 const i=rankIdx(S),cur=RANKS[i],nxt=RANKS[i+1];
 let pct=100;
 if(nxt){pct=Math.round((S.life-cur.min)/(nxt.min-cur.min)*100);$("nextTxt").textContent=(nxt.min-S.life)+" more points to reach "+nxt.n+".";$("promoTitle").textContent="Reach "+nxt.n+" · "+(nxt.min-S.life)+" pts to go"}
 else{$("nextTxt").textContent="You have reached the highest rank.";$("promoTitle").textContent="Top rank reached"}

 $("menuRank").textContent=cur.n+" member";$("menuPts").textContent=S.points.toLocaleString()+" points";
 $("ptsPill").textContent=S.points.toLocaleString()+" pts";
 $("toolText").textContent=cur.n+" rank";
 $("promoFill").style.width=pct+"%";
 $("rankName").textContent=cur.n;
 $("lifeTxt").textContent=S.life.toLocaleString()+" points earned in total";
 $("fill").style.width=pct+"%";$("fill").parentNode.setAttribute("aria-valuenow",pct);
 $("ladder").innerHTML=RANKS.map((r,j)=>`<div class="step ${j<i?"done":""} ${j===i?"now":""}">${r.n}<br>${r.min}</div>`).join("");
 $("stLife").textContent=S.life.toLocaleString();$("stDone").textContent=S.total;$("stBadge").textContent=S.badges.length+" / "+BADGES.length;

 $("challenges").innerHTML=CHALLENGES.map((c,j)=>`<div class="tile item" style="--tint:${TINTS[j%6]}"><div class="tic">${c.ic}</div><h4>${c.t}</h4><p>${c.d}</p><span class="meta">+${c.p} pts</span><button class="btn" data-c="${c.id}">Complete</button></div>`).join("");

 const h=S.history.filter(x=>filter==="all"||x.k===filter);
 $("histList").innerHTML=h.length?h.map(x=>`<div class="hrow item"><div class="hic">${x.k==="earn"?"⬆️":"🎁"}</div><div class="grow"><div class="t">${x.t}</div><div class="small">${fmt(x.d)}</div></div><span class="pts ${x.k==="earn"?"plus":"minus"}">${x.k==="earn"?"+":"−"}${x.p}</span></div>`).join(""):'<div class="empty">Nothing here yet. Complete a challenge to earn points.</div>';
 document.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.dataset.f===filter));
 $("hEarn").textContent="+"+S.life;$("hSpend").textContent="−"+S.spent;

 $("badgeCount").textContent=S.badges.length+" of "+BADGES.length+" badges collected";
 $("badgeGrid").innerHTML=BADGES.map((b,j)=>{const on=S.badges.includes(b.id);return `<div class="tile item ${on?"":"locked"}" style="--tint:${TINTS[j%6]}"><div class="tic">${b.ic}</div><h4>${b.t}</h4><p>${on?"Unlocked":b.d}</p></div>`}).join("");

 $("rewardGrid").innerHTML=REWARDS.map((r,j)=>{
  const lock=i<r.r,poor=S.points<r.c;
  return `<div class="tile item" style="--tint:${TINTS[j%6]}"><div class="tic">${r.ic}</div><h4>${r.t}</h4><p>${r.d}</p><span class="meta">${r.c} pts</span><button class="btn" data-r="${r.id}" ${lock||poor?"disabled":""}>${lock?RANKS[r.r].n+" only":poor?"Need "+(r.c-S.points):"Redeem"}</button></div>`}).join("");

 renderSlides();applySearch();
}
function applySearch(){
 const q=$("search").value.trim().toLowerCase();
 document.querySelectorAll("section:not([hidden]) .item").forEach(el=>{el.hidden=q&&!el.textContent.toLowerCase().includes(q)});
}

/* ---------- Events ---------- */
document.body.addEventListener("click",e=>{
 const t=e.target.closest("[data-c],[data-r],[data-f],[data-go],[data-tab]");
 if(t){
  if(t.dataset.c)complete(t.dataset.c);
  if(t.dataset.r)redeem(t.dataset.r);
  if(t.dataset.f){filter=t.dataset.f;render()}
  if(t.dataset.go){e.preventDefault();go(t.dataset.go)}
  if(t.dataset.tab)go(t.dataset.tab);
 }
 if(!e.target.closest(".user-wrap")){$("userMenu").hidden=true;$("userBtn").setAttribute("aria-expanded","false")}
});
$("search").addEventListener("input",applySearch);
$("prev").onclick=()=>{slide=(slide+2)%3;renderSlides()};
$("next").onclick=()=>{slide=(slide+1)%3;renderSlides()};
$("toggleRail").onclick=()=>$("shell").classList.toggle("no-rail");
$("homeBtn").onclick=()=>go("rank");
$("bellBtn").onclick=()=>{const l=S.history[0];toast(l?"Latest: "+l.t+" ("+(l.k==="earn"?"+":"−")+l.p+" pts)":"No new notifications")};
$("userBtn").onclick=()=>{const m=$("userMenu");m.hidden=!m.hidden;$("userBtn").setAttribute("aria-expanded",!m.hidden)};
$("reset").onclick=()=>{S=seed();save();render();$("userMenu").hidden=true;toast("Demo data reset")};
render();