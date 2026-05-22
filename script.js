const mysteryBtn = document.getElementById("mysteryBtn");
const reveal = document.getElementById("reveal");
const surpriseZone = document.getElementById("surpriseZone");
const audio = document.getElementById("cherAudio");
const welcomePopup = document.getElementById("welcomePopup");
const closePopup = document.getElementById("closePopup");
const visitorNum = document.getElementById("visitorNum");
const revealImg = document.getElementById("revealImg");

const REVEAL_SVG = "assets/reveal.svg";
const REVEAL_JPG = "assets/reveal.jpg";

let revealed = false;
let confettiTimer = null;

visitorNum.textContent = String(42000 + Math.floor(Math.random() * 58000)).padStart(6, "0");

closePopup.addEventListener("click", () => {
  welcomePopup.classList.add("hidden");
});

/** Подменяем SVG только если реальное фото есть на сервере */
function loadOptionalPhoto() {
  const probe = new Image();
  probe.onload = () => {
    if (probe.naturalWidth > 0) {
      revealImg.src = REVEAL_JPG;
    }
  };
  probe.onerror = () => {
    revealImg.src = REVEAL_SVG;
  };
  probe.src = REVEAL_JPG;
}

loadOptionalPhoto();

revealImg.addEventListener("error", () => {
  if (revealImg.src.includes("reveal.jpg")) {
    revealImg.src = REVEAL_SVG;
  }
});

function spawnConfetti(count = 120) {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ff6600"];
  const shapes = ["■", "●", "▲", "★"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    if (Math.random() > 0.6) {
      piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      piece.style.background = "transparent";
      piece.style.color = colors[Math.floor(Math.random() * colors.length)];
      piece.style.fontSize = 14 + Math.random() * 14 + "px";
      piece.style.width = "auto";
      piece.style.height = "auto";
    } else {
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    }
    piece.style.animationDuration = 2 + Math.random() * 4 + "s";
    piece.style.animationDelay = Math.random() * 0.8 + "s";
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

function screenFlash() {
  const flash = document.createElement("div");
  flash.className = "screen-flash";
  document.body.appendChild(flash);
  flash.addEventListener("animationend", () => flash.remove());
}

function playSong() {
  audio.volume = 1;
  audio.currentTime = 0;
  audio.play().catch(() => {
    console.warn("Браузер заблокировал звук — ткните ещё раз по странице.");
  });
}

function showReveal() {
  mysteryBtn.hidden = true;
  reveal.hidden = false;
  reveal.classList.add("is-open");

  revealImg.classList.remove("pop-in");
  void revealImg.offsetWidth;
  revealImg.classList.add("pop-in");

  requestAnimationFrame(() => {
    reveal.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function revealSurprise() {
  if (revealed) return;
  revealed = true;

  welcomePopup.classList.add("hidden");
  document.body.classList.add("revealed");

  showReveal();
  screenFlash();
  spawnConfetti(150);
  playSong();

  document.title = "🎉 MARIA!!! С ДНЁМ РОЖДЕНИЯ 🎉";

  if (!confettiTimer) {
    confettiTimer = setInterval(() => spawnConfetti(25), 3000);
  }
}

mysteryBtn.addEventListener("click", revealSurprise);

document.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.85) {
    const s = document.createElement("span");
    s.className = "sparkle-trail";
    s.textContent = ["✨", "⭐", "💫", "🌟"][Math.floor(Math.random() * 4)];
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
});

document.addEventListener("click", () => {
  if (revealed && audio.paused) playSong();
});
