history.scrollRestoration = 'manual';
window.scrollTo({top: 0, left: 0, behavior: 'instant'});

const number = document.getElementById('number');
const hero_wrapper = document.querySelector('#hero-wrapper');
const about = document.querySelector('#about-us');
const place = document.querySelector('#place');
const place_label = document.querySelector('.place-label')
const place_content_h2 = document.querySelector('.place-content h2');
const place_description = document.querySelector('.place-description');
const letter_top = document.querySelector('#letter-top');
const letter_bottom = document.querySelector('#letter-bottom');
const home_page = document.querySelector('#home-page');
const about_label = document.querySelector('.about-label');
const about_content = document.querySelector('.about-content');
const about_description = document.querySelector('.about-description');
const intro_h2 = document.querySelector('#intro h2');
const intro_h4 = document.querySelector('#intro h4');

const band = document.querySelectorAll('.band');

const start_page = document.getElementById('start-page');

const swap_element = document.getElementById('swap');

const leave_right = document.getElementById('leave-right');

const leave_left = document.getElementById('leave-left');

// how far is wrapper from the top of my screen.
//if not scroll yet is 0 scroll abit 300 is -300
const placeRect = place.getBoundingClientRect();
const rect = hero_wrapper.getBoundingClientRect();
const aboutRect = about.getBoundingClientRect();

let shrinkProgress = 0;

// =========================
// Loading Counter
// =========================

function loading(){

    let i = 0;
    const counter = setInterval(() => {
        
        number.innerText = i + '%';
        i++;
        if (i > 100){
            clearInterval(counter);
        }
    }, 20);
}

// =========================
// Scroll Animation
// =========================
function setupScrollAnimation(){

    window.addEventListener('scroll', () => {

        const rect = hero_wrapper.getBoundingClientRect();
        const aboutRect = about.getBoundingClientRect();
        const placeRect = place.getBoundingClientRect();
        
        // ========================
        // Intro Text
        // =======================

        // wrapper.offsetHeight = how tall #hero-wrapper is (250vh is 2250px)
        // window.innerHeight = how tall your screen is (900px), the actuall scroll size
        const total = hero_wrapper.offsetHeight - window.innerHeight;
        // total = 2250 - 900 = 1350

        const progress = Math.min(Math.max(-rect.top / total, 0), 1);
        // this function is to measure how may size that you already scroll
        // 0 is havnet scroll, 0.5 scroll half, 1 is scroll finish

        if (progress >= 0.6){
            shrinkProgress = (progress - 0.6) / 0.4;
        } else{
            shrinkProgress = 0;
        }
        letter_top.style.opacity = shrinkProgress;
        letter_bottom.style.opacity = shrinkProgress;

        let move = Math.min(Math.max(-rect.top, 0),hero_wrapper.offsetHeight - window.innerHeight);
        home_page.style.transform = `scale(${1 - shrinkProgress * 0.3})`;

        letter_top.style.transform = `translateY(${move}px)`;

        intro_h2.style.opacity = progress > 0.3 ? 1 : 0;
        intro_h4.style.opacity = progress > 0.5 ? 1 : 0;
        
        // ========================
        // About us
        // =======================
        

        if (aboutRect.top < window.innerHeight * 0.9){
            about_label.classList.add('show');
            about_content.classList.add('show');
            about_description.classList.add('show');
        } else {
            about_label.classList.remove('show');
            about_content.classList.remove('show');
            about_description.classList.remove('show');
        }

        // ========================
        // Place
        // =======================
        

        if (placeRect.top < window.innerHeight * 0.7){
            place_label.classList.add('show');
            place_content_h2.classList.add('show');
            place_description.classList.add('show');
        } else {
            place_label.classList.remove('show');
            place_content_h2.classList.remove('show');
            place_description.classList.remove('show');
        }
    });
}

// =========================
// Page Swap Animation
// =========================

function swap(){

    document.body.classList.add('no-scroll');

    setTimeout(() => {
        console.log("Hello Start page after 1s")
        band.forEach(b => b.classList.add('play'));
        document.body.classList.add('no-scroll');
    }, 2000);

    setTimeout(() => {
        band.forEach(b => {

            b.classList.remove('play');
            start_page.style.display = 'none';
            b.classList.add('play-back');
        });
    }, 3500);

    setTimeout(() => {
      swap_element.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }, 4300);

}

// =========================
// First Page
// =========================

function first_page(){

    
    loading();
    swap();
    setTimeout(() => {
        leave_right.classList.add('play-animate');
    }, 3600);

    setTimeout(() => {
        leave_left.classList.add('play-animate');
    }, 3800);
}

// =========================
// Login
// =========================

function href_login(){
    const login = document.getElementById('login');

    login.addEventListener('click', ()=> {
        window.location.href = 'login/login.html'
    });
}

// =========================
// Start
// =========================

// console.table(
//     [...document.querySelectorAll('*')]
//         .map(el => {
//             const r = el.getBoundingClientRect();
//             return {
//                 element: el.tagName + (el.id ? '#' + el.id : ''),
//                 left: r.left,
//                 right: r.right,
//                 width: r.width,
//                 overflow: r.right - document.documentElement.clientWidth
//             };
//         })
//         .filter(x => x.overflow > 1)
//         .sort((a, b) => b.overflow - a.overflow)
// );

console.log(
    [...document.querySelectorAll('*')].filter(el => {
        const r = el.getBoundingClientRect();
        return r.right > document.documentElement.clientWidth;
    }).map(el => ({
        element: el.tagName + (el.id ? '#' + el.id : ''),
        right: el.getBoundingClientRect().right,
        overflow: el.getBoundingClientRect().right - document.documentElement.clientWidth
    }))
);

console.log(document.documentElement.clientWidth);
console.log(document.documentElement.scrollWidth);

first_page()
setupScrollAnimation()
href_login()

