const mysteryBtn = document.getElementById("mysteryBtn");
const reveal = document.getElementById("reveal");
const cherAudio = document.getElementById("cherAudio");
const welcomePopup = document.getElementById("welcomePopup");
const closePopup = document.getElementById("closePopup");
const visitorNum = document.getElementById("visitorNum");
const revealImg = document.getElementById("revealImg");

let revealed = false;

// Если положите assets/reveal.jpg — подменит SVG-заглушку
const revealPhoto = new Image();
revealPhoto.src = "assets/reveal.jpg";
revealPhoto.onload = () => {
  revealImg.src = "assets/reveal.jpg";
};

visitorNum.textContent = String(42000 + Math.floor(Math.random() * 58000)).padStart(6, "0");

closePopup.addEventListener("click", () => {
  welcomePopup.classList.add("hidden");
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

function playMaria() {
  cherAudio.volume = 1;
  cherAudio.currentTime = 0;
  cherAudio.play().catch(() => {
    console.warn("Браузер заблокировал звук — кликните ещё раз по странице.");
  });
}

function revealSurprise() {
  if (revealed) return;
  revealed = true;

  welcomePopup.classList.add("hidden");
  document.body.classList.add("revealed");
  reveal.classList.remove("hidden");
  screenFlash();
  spawnConfetti(150);
  playMaria();

  document.title = "🎉 MARIA!!! С ДНЁМ РОЖДЕНИЯ 🎉";

  setInterval(() => {
    if (revealed) spawnConfetti(30);
  }, 2500);
}

mysteryBtn.addEventListener("click", revealSurprise);

document.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.82) {
    const s = document.createElement("span");
    s.className = "sparkle-trail";
    s.textContent = ["✨", "⭐", "💫", "🌟"][Math.floor(Math.random() * 4)];
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
});

document.addEventListener(
  "click",
  () => {
    if (revealed && cherAudio.paused) playMaria();
  },
  { once: false }
);
