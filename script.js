const mysteryBtn = document.getElementById("mysteryBtn");
const reveal = document.getElementById("reveal");
const revealImg = document.querySelector(".reveal-img");
const audio = document.getElementById("partyAudio");
const welcomePopup = document.getElementById("welcomePopup");
const closePopup = document.getElementById("closePopup");
const visitorNum = document.getElementById("visitorNum");

let revealed = false;
let confettiTimer = null;

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

  reveal.scrollIntoView({ behavior: "smooth", block: "center" });
}

function revealSurprise() {
  if (revealed) return;
  revealed = true;

  welcomePopup.classList.add("hidden");
  document.body.classList.add("revealed");
  showReveal();
  spawnConfetti(100);
  playSong();
  document.title = "🎉 С ДНЁМ РОЖДЕНИЯ, MARIA! 🎉";

  if (!confettiTimer) {
    confettiTimer = setInterval(() => spawnConfetti(20), 3500);
  }
}

mysteryBtn.addEventListener("click", revealSurprise);

document.addEventListener("click", () => {
  if (revealed && audio.paused) playSong();
});
