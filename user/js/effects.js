/*
=================================
* Filename : effects.js
* Date : 18/10/2026
* Author : (add your name)
* Description : The opening picture (strips wipe left) and the numbers that count up
=================================
*/

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------- 1. OPENING PICTURE: stays a moment, then strips wipe left ---------- */
function playOpeningAnimation() {
    const splash = $("splash");

    // Cut the picture into horizontal strips. Every strip shows the same picture,
    // but only its own band (clip-path), so together they look like one picture.
    for (let i = 0; i < OPENING_SLICES; i++) {
        const strip = document.createElement("div");
        const top = i * 100 / OPENING_SLICES;
        const bottom = 100 - (i + 1) * 100 / OPENING_SLICES;

        strip.className = "slice";
        strip.style.setProperty("--i", i);                          // the delay between strips
        strip.style.clipPath = `inset(calc(${top}% - 0.5px) 0 calc(${bottom}% - 0.5px) 0)`;
        if (OPENING_PICTURE) strip.style.backgroundImage = `url("${IMAGE_FOLDER}${OPENING_PICTURE}")`;
        splash.appendChild(strip);
    }

    // No picture yet? Show the name of the website on the green screen instead.
    if (!OPENING_PICTURE) {
        splash.insertAdjacentHTML("beforeend", '<div class="splash-brand">Fun Collectors</div>');
    }

    function finish() {                                             // remove the opening picture
        splash.remove();
        document.body.classList.remove("splash-on");
    }

    setTimeout(() => {
        if (prefersReducedMotion()) { finish(); return; }
        splash.classList.add("wipe-left");                          // start the wipe
        const strips = splash.querySelectorAll(".slice");
        strips[strips.length - 1].addEventListener("transitionend", finish, { once: true });     // the last strip to move
        setTimeout(finish, 2500);                                   // safety: always remove it
    }, OPENING_HOLD_MS);
}

/* ---------- 2. SMALL LEAVES MOVING IN THE BACKGROUND ---------- */
function spawnFallingLeaves(count = 14) {
    if (prefersReducedMotion()) return;

    const tones = ["#8ed36a", "#5fae1f", "#a6dd7c", "#3f9a5b"];
    for (let i = 0; i < count; i++) {
        const leaf = document.createElement("span");
        leaf.className = "leaf";
        leaf.style.left = Math.random() * 100 + "%";
        leaf.style.setProperty("--size", 12 + Math.random() * 16 + "px");
        leaf.style.setProperty("--time", 14 + Math.random() * 14 + "s");
        leaf.style.setProperty("--delay", -Math.random() * 20 + "s");        // negative = already falling at the start
        leaf.style.setProperty("--tone", tones[i % tones.length]);
        $("leaves").appendChild(leaf);
    }
}

/* ---------- 3. NUMBERS THAT COUNT UP (called by startPage in common.js) ----------
   Write the final number in the HTML like this: <b data-count="120">0</b> */
function runPageEffects() {
    document.querySelectorAll("[data-count]").forEach(countUp);
}

function countUp(element) {
    const target = Number(element.dataset.count);
    const format = value => Math.round(value).toLocaleString();

    if (prefersReducedMotion()) { element.textContent = format(target); return; }

    const start = performance.now();
    const duration = 900;
    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        element.textContent = format(target * (1 - Math.pow(1 - progress, 3)));     // starts fast, ends slow
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

/* ---------- 4. START ---------- */
playOpeningAnimation();
spawnFallingLeaves();
