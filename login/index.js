const API_BASE = "http://127.0.0.1:8000/backend/api";

/* ==============================
   Intro animation (swap bands)
============================== */
function swap() {
  const overlay = document.getElementById("swap");
  const bands = document.querySelectorAll(".band");

  document.body.classList.add("no-scroll");

  // 1) Bands slide in
  bands.forEach((b) => b.classList.add("play"));

  // 2) After a short hold, bands slide out
  setTimeout(() => {
    bands.forEach((b) => {
      b.classList.remove("play");
      b.classList.add("play-back");
    });
  }, 1800);

  // 3) Remove overlay once the slide-out has finished
  setTimeout(() => {
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
  }, 2600);
}

/* ==============================
   Login / Register tab switching
============================== */
function showForm(name) {
  hideMessage();
  document.getElementById("login").style.display = name === "login" ? "block" : "none";
  document.getElementById("register").style.display = name === "register" ? "block" : "none";

  document.querySelectorAll("#swap-page a").forEach((a) => {
    a.classList.toggle("active", a.dataset.target === name);
  });
}

document.querySelectorAll("#swap-page a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    showForm(a.dataset.target);
  });
});

/* ==============================
   Message box (error / success)
   Usage: showMessage("error", "Wrong email or password");
          showMessage("success", "Account created! Please login.");
============================== */
function showMessage(type, text) {
  const box = document.getElementById("auth-message");
  box.className = "auth-message " + type; // "error" or "success"
  box.textContent = text;
  box.hidden = false;
}

function hideMessage() {
  const box = document.getElementById("auth-message");
  box.hidden = true;
  box.textContent = "";
}

/* ==============================
   Read messages from the URL (for PHP redirects)
   Example: index.html?form=register&error=Email+already+exists
            index.html?success=Account+created
============================== */
function showMessageFromUrl() {
  const params = new URLSearchParams(window.location.search);

  if (params.get("form") === "register") showForm("register");

  if (params.get("error")) showMessage("error", params.get("error"));
  else if (params.get("success")) showMessage("success", params.get("success"));
}

/* ==============================
   TODO (backend team): connect forms to the API
   Example using API_BASE:
     fetch(API_BASE + "/Login.php", { method: "POST", body: new FormData(form) })
============================== */

/* ==============================
   Init
============================== */
swap();
showMessageFromUrl();