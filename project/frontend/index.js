history.scrollRestoration = 'manual';
window.scrollTo({top: 0, left: 0, behavior: 'instant'});

// =========================
// Loading Counter
// =========================

function loading(){
    const number = document.getElementById('number');
    let i = 0;

    const counter = setInterval(() => {
        number.innerText = i + '%';
        i++;
        if (i > 100){
            clearInterval(counter);
        }
    }, 20)
}

// =========================
// Scroll Animation
// =========================
function setupScrollAnimation(){

    const wrapper = document.querySelector('#hero-wrapper');

    window.addEventListener('scroll', () => {
        

        const rect = wrapper.getBoundingClientRect(); 
        // how far is hero wrapper from the top of my screen. 
        //if not scroll yet is 0 scroll abit 300 is -300

        // wrapper.offsetHeight = how tall #hero-wrapper is (250vh is 2250px)
        // window.innerHeight = how tall your screen is (900px), the actuall scroll size
        const total = wrapper.offsetHeight - window.innerHeight;
        // total = 2250 - 900 = 1350

        const progress = Math.min(Math.max(-rect.top / total, 0), 1);
        // this function is to measure how may size that you already scroll
        // 0 is havnet scroll, 0.5 scroll half, 1 is scroll finish

        // ========================
        // Intro Text
        // =======================

        document.querySelector('#intro h2').style.opacity = progress > 0.3 ? 1 : 0;
        document.querySelector('#intro h4').style.opacity = progress > 0.5 ? 1 : 0;


        // ========================
        // Home Page Scale
        // ========================
        let shrinkProgress = 0;

        if (progress >= 0.9){
            shrinkProgress = (progress - 0.5) / (1 - 0.5);
        }

        const scale = 1 - shrinkProgress * 0.30;
        document.querySelector('#home-page').style.transform = `scale(${scale})`;

        // ==========================
        // Title Rotataion
        // =========================

        const aboutSection = document.querySelector('#about-us');
        const aboutRect = aboutSection.getBoundingClientRect();
        const aboutProgress = (window.innerHeight - aboutRect.top) / window.innerHeight;

        const title = document.querySelectorAll('.section-title');
        let moveX = aboutProgress * 300;

        if (moveX >= 170){
            moveX = 170;
        }

        console.log(moveX);
        title.style.transform = `translateX(${moveX}px)`;
        
    });

        
}

// =========================
// Page Swap Animation
// =========================

function swap(){

    document.body.classList.add('no-scroll');

    setTimeout(() => {
        console.log("Hello Start page after 1s")
        document.querySelectorAll('.band').forEach(b => b.classList.add('play'));
        document.body.classList.add('no-scroll');
    }, 2000);

    setTimeout(() => {
        document.querySelectorAll('.band').forEach(b => {
            console.log("Hello World");

            b.classList.remove('play');
            document.getElementById('start-page').style.display = 'none';
            b.classList.add('play-back');
        });
    }, 3500);

    setTimeout(() => {
      document.getElementById('swap').style.display = 'none';
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
        document.getElementById('leave-right').classList.add('play-animate');
    }, 3600);

    setTimeout(() => {
        document.getElementById('leave-left').classList.add('play-animate');
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

first_page()
setupScrollAnimation()
href_login()

