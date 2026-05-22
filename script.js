const mysteryBtn = document.getElementById("mysteryBtn");
const reveal = document.getElementById("reveal");
const revealImg = document.querySelector(".reveal-img");
const congratsBurst = document.getElementById("congratsBurst");
const fxLayer = document.getElementById("fxLayer");
const audio = document.getElementById("partyAudio");
const welcomePopup = document.getElementById("welcomePopup");
const closePopup = document.getElementById("closePopup");
const visitorNum = document.getElementById("visitorNum");

let revealed = false;
let confettiTimer = null;
let fireworkTimer = null;

visitorNum.textContent = String(42000 + Math.floor(Math.random() * 58000)).padStart(6, "0");

closePopup.addEventListener("click", () => {
  welcomePopup.classList.add("hidden");
});

function spawnConfetti(count = 80) {
  const colors = ["#ff3366", "#ffcc00", "#00ccff", "#ff6600", "#cc66ff", "#66ff99"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 2 + Math.random() * 3 + "s";
    piece.style.animationDelay = Math.random() * 0.6 + "s";
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

function launchFirework(x, y) {
  const burst = document.createElement("div");
  burst.className = "firework";
  burst.style.left = x + "px";
  burst.style.top = y + "px";
  const colors = ["#ff3366", "#ffcc00", "#33ccff", "#ff9933", "#cc66ff", "#fff"];
  const sparks = 14 + Math.floor(Math.random() * 10);

  for (let i = 0; i < sparks; i++) {
    const spark = document.createElement("span");
    spark.className = "spark";
    const angle = (Math.PI * 2 * i) / sparks;
    const dist = 40 + Math.random() * 50;
    spark.style.setProperty("--tx", Math.cos(angle) * dist + "px");
    spark.style.setProperty("--ty", Math.sin(angle) * dist + "px");
    spark.style.background = colors[i % colors.length];
    spark.style.animationDelay = Math.random() * 0.15 + "s";
    burst.appendChild(spark);
  }

  fxLayer.appendChild(burst);
  setTimeout(() => burst.remove(), 1200);
}

function fireworkShow(rounds = 8) {
  for (let i = 0; i < rounds; i++) {
    setTimeout(() => {
      const x = window.innerWidth * (0.15 + Math.random() * 0.7);
      const y = window.innerHeight * (0.12 + Math.random() * 0.45);
      launchFirework(x, y);
    }, i * 220);
  }
}

function playCongratsBurst() {
  congratsBurst.classList.remove("is-active");
  void congratsBurst.offsetWidth;
  congratsBurst.classList.add("is-active");
}

function playSong() {
  audio.volume = 1;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function showReveal() {
  mysteryBtn.hidden = true;
  reveal.hidden = false;
  reveal.classList.add("is-open");

  revealImg.classList.remove("pop-in");
  void revealImg.offsetWidth;
  revealImg.classList.add("pop-in");

  playCongratsBurst();
  reveal.scrollIntoView({ behavior: "smooth", block: "center" });
}

function revealSurprise() {
  if (revealed) return;
  revealed = true;

  welcomePopup.classList.add("hidden");
  document.body.classList.add("revealed");
  showReveal();
  spawnConfetti(120);
  fireworkShow(10);
  playSong();
  document.title = "🎉 З ДНЁМ НАРАДЖЭННЯ, MARIA! 🎉";

  if (!confettiTimer) {
    confettiTimer = setInterval(() => spawnConfetti(18), 3500);
  }
  if (!fireworkTimer) {
    fireworkTimer = setInterval(() => fireworkShow(4), 4500);
  }
}

mysteryBtn.addEventListener("click", revealSurprise);

document.addEventListener("click", () => {
  if (revealed && audio.paused) playSong();
});
