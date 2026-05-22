const mysteryBtn = document.getElementById("mysteryBtn");
const reveal = document.getElementById("reveal");
const revealArt = document.getElementById("revealArt");
const revealImg = document.getElementById("revealImg");
const audio = document.getElementById("partyAudio");
const welcomePopup = document.getElementById("welcomePopup");
const closePopup = document.getElementById("closePopup");
const visitorNum = document.getElementById("visitorNum");

const REVEAL_JPG = "assets/reveal.jpg";

let revealed = false;
let confettiTimer = null;

visitorNum.textContent = String(42000 + Math.floor(Math.random() * 58000)).padStart(6, "0");

closePopup.addEventListener("click", () => {
  welcomePopup.classList.add("hidden");
});

/** Реальное фото — только если файл есть и реально декодируется */
function tryShowRealPhoto() {
  const probe = new Image();
  probe.onload = () => {
    if (probe.naturalWidth < 16) return;
    revealImg.src = REVEAL_JPG;
    revealImg.hidden = false;
    revealArt.hidden = true;
    revealImg.classList.add("pop-in");
  };
  probe.onerror = () => {
    revealImg.hidden = true;
    revealArt.hidden = false;
  };
  probe.src = REVEAL_JPG;
}

revealImg.addEventListener("error", () => {
  revealImg.hidden = true;
  revealArt.hidden = false;
});

function spawnConfetti(count = 50) {
  const colors = ["#c23b6b", "#e6b84d", "#b55239", "#7a9eb8", "#f5e6d3"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 2.5 + Math.random() * 2 + "s";
    piece.style.animationDelay = Math.random() * 0.5 + "s";
    piece.style.borderRadius = Math.random() > 0.6 ? "50%" : "2px";
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

function playSong() {
  audio.volume = 0.9;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function showReveal() {
  mysteryBtn.hidden = true;
  reveal.hidden = false;
  reveal.classList.add("is-open");
  tryShowRealPhoto();
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
  spawnConfetti(60);
  playSong();
  document.title = "С ДНЁМ РОЖДЕНИЯ, MARIA!";

  if (!confettiTimer) {
    confettiTimer = setInterval(() => spawnConfetti(15), 4000);
  }
}

mysteryBtn.addEventListener("click", revealSurprise);

document.addEventListener("click", () => {
  if (revealed && audio.paused) playSong();
});
