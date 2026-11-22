const MAX_SIZE = 1.3; // blob size       (1 = about 200px wide)
const SMOOTHING = 0.15; // follow speed    (lower = smoother, laggier)
const SPIN = 0.3; // rotation speed  (0 = no rotation)
const POINTS = 7; // number of lobes (fewer = bolder shape)
const WOBBLE = 0.4; // irregularity    (0 = round, 0.6 = wild)
const MORPH = 0.0025; // shape change speed

/* =====================================================
2. ELEMENTS
===================================================== */
const area = document.getElementById("reveal"); // hover area
const blob = document.getElementById("blob"); // clip-path shape

/* =====================================================
3. STATE
target  = where the blob should be (mouse position, size)
current = where the blob is now (eases toward target)
===================================================== */
const target = { x: 0, y: 0, s: 0 };
const current = { x: 0, y: 0, s: 0, a: 0 }; // a = rotation angle
let running = false; // is the animation loop active?


const number = document.getElementById('number');
const band = document.querySelectorAll('.band');
const swap_element = document.getElementById('swap');
const start_page = document.getElementById('start-page');


const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

function setMenu(open){
    navMenu.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
}

navToggle.addEventListener("click" , () => {
    setMenu(!navMenu.classList.contains("open"));
});

navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("click", (e) => {
  if (e.key === "Escape") setMenu(false);
});

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

function swap() {
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');

    // 1. bands cover the screen
    setTimeout(() => {
        band.forEach(b => b.classList.add('play'));
    }, 2000);

    // 2. hide start page, bands slide away
    setTimeout(() => {
        start_page.style.display = 'none';
        band.forEach(b => {
            b.classList.remove('play');
            b.classList.add('play-back');
        });
    }, 3500);

    // 3. remove the overlay and re-enable scroll (after play-back finishes)
    setTimeout(() => {
        swap_element.style.display = 'none';
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
    }, 5000); // adjust to match your play-back animation duration
}

function first_page(){
    loading();
    swap();
}


/* =====================================================
4. SHAPE GENERATOR
Builds a smooth, irregular closed outline.
t = time, so the outline slowly changes over time.
===================================================== */
function blobPath(t) {
// Step 1: place points around a circle, each with a changing radius
const pts = [];
for (let i = 0; i < POINTS; i++) {
    const angle = (i / POINTS) * Math.PI * 2;
    const radius =
    200 *
    (0.8 + WOBBLE * Math.sin(t * MORPH * (1 + i * 0.37) + i * 1.9));
    pts.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
}

// Step 2: join the points with smooth curves
let d = `M ${pts[0][0]} ${pts[0][1]} `;
for (let i = 0; i < POINTS; i++) {
    const p0 = pts[(i - 1 + POINTS) % POINTS];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % POINTS];
    const p3 = pts[(i + 2) % POINTS];

    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];

    d += `C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]} `;
}
return d + "Z";
}

/* =====================================================
5. MOUSE POSITION
Converts the mouse position to coordinates inside the photo.
===================================================== */
function updateTarget(e) {
const rect = area.getBoundingClientRect();
target.x = e.clientX - rect.left;
target.y = e.clientY - rect.top;
}

/* =====================================================
6. ANIMATION LOOP
Runs every frame while the blob is visible.
===================================================== */
function animate(time) {
// Ease position and size toward the target
current.x += (target.x - current.x) * SMOOTHING;
current.y += (target.y - current.y) * SMOOTHING;
current.s += (target.s - current.s) * SMOOTHING;
current.a += SPIN;

// Redraw the blob shape and move / rotate / scale it
blob.setAttribute("d", blobPath(time));
blob.setAttribute(
    "transform",
    `translate(${current.x} ${current.y}) rotate(${current.a}) scale(${current.s})`,
);

// Stop the loop once the blob has fully shrunk away
if (target.s === 0 && current.s < 0.01) {
    blob.setAttribute("transform", "scale(0)");
    running = false;
    return;
}
requestAnimationFrame(animate);
}

function startAnimation() {
if (!running) {
    running = true;
    requestAnimationFrame(animate);
}
}

/* =====================================================
7. EVENTS
===================================================== */
// Mouse / finger enters: blob appears under the pointer
area.addEventListener("pointerenter", (e) => {
    updateTarget(e);
    current.x = target.x;
    current.y = target.y;
    target.s = MAX_SIZE;
    startAnimation();
});

// Mouse / finger moves: blob follows
area.addEventListener("pointermove", (e) => {
    updateTarget(e);
    startAnimation();
});

// Mouse / finger leaves: blob shrinks away
area.addEventListener("pointerleave", () => {
    target.s = 0;
    startAnimation();
});

/* =====================================================
start
===================================================== */
first_page();