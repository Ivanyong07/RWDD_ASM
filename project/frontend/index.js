history.scrollRestoration = 'manual';
window.scrollTo({top: 0, left: 0, behavior: 'instant'});

const header = document.getElementById('header');

const number = document.getElementById('number');
const band = document.querySelectorAll('.band');
const swap_element = document.getElementById('swap');
const navbar = document.getElementById('navbar');
const menu_btn = document.getElementById('menu-btn');

const hero_wrapper = document.querySelector('#hero-wrapper');
const start_page = document.getElementById('start-page');
const intro = document.getElementById('intro');
const intro_h2 = document.querySelector('#intro h2');
const intro_h4 = document.querySelector('#intro h4');
const leave_right = document.getElementById('leave-right');
const leave_left = document.getElementById('leave-left');
const home_page = document.querySelector('#home-page');
const letter = document.getElementById('letter');
const circle_fill = document.getElementById('circle-fill');
const letter_btn = document.querySelectorAll('.letter-btn');
const left_hand = document.getElementById("left-hand");
const right_hand = document.getElementById("right-hand");

const about = document.querySelector('#about-us');
const about_label = document.querySelector('.about-label');
const about_content = document.querySelector('.about-content');
const about_description = document.querySelector('.about-description');
const about_image = document.querySelector('.about-image');


const place = document.querySelector('#place');
const place_label = document.querySelector('.place-label')
const place_content_h2 = document.querySelectorAll('.place-content h2');
const place_description = document.querySelector('.place-description');

const stats = document.querySelectorAll('#stat-section b');
const stat_description = document.getElementById('stat-description');
const student_joined_count = document.getElementById('student-joined-count');

const step = document.querySelector('#step');
const step_label = document.querySelector('#step-label');

const badge = document.getElementById('badge-collection');

// =========================
// Mobile Menu
// =========================

function setupMenu(){
    menu_btn.addEventListener('click', ()=>{
        const open = header.classList.toggle('menu-open');
        menu_btn.setAttribute('aria-expanded', open);
    });

    document.querySelectorAll('#navbar a').forEach(a => {
        a.addEventListener('click', ()=>{
            header.classList.remove('menu-open');
            menu_btn.setAttribute('aria-expanded', false);
        })
    });
}


// =========================
// badge page
// =========================
const badges = [
  { name: "Fun Tin",     src: "images/lee.jpeg" },
  { name: "Early Bird",  src: "" },
  { name: "Team Player", src: "" },
  { name: "Streak",      src: "" },
  { name: "Explorer",    src: "" },
  { name: "Night Owl",   src: "" },
];

const wall = document.querySelector(".badge-wall");
wall.innerHTML = "";

badges.forEach(b => {
  const el = document.createElement("div");
  el.className = "badge";
  el.tabIndex = 0;
  el.innerHTML = `
    <img src="${b.src}" alt="${b.name}" />
    <hr />
    <p>${b.name}</p>`;
  wall.appendChild(el);
});


// =========================
// Login
// =========================

function href_login(){
    const login = document.getElementById('login');

    login.addEventListener('click', ()=> {
        window.location.href = 'auth/index.html'
    });
}

// =========================
// Start
// =========================

href_login()
setupMenu()
