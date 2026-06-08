const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.7,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const s of stars) {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.vy *= -1;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,.75)";
    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}

drawStars();

const snowContainer = document.querySelector(".snow");

for (let i = 0; i < 150; i++) {
  const snow = document.createElement("div");
  snow.className = "snowflake";
  snow.innerHTML = "❄";
  snow.style.left = Math.random() * 100 + "vw";
  snow.style.fontSize = 5 + Math.random() * 10 + "px";
  snow.style.opacity = 0.15 + Math.random() * 0.75;
  snow.style.animationDuration = 7 + Math.random() * 14 + "s";
  snow.style.animationDelay = Math.random() * 10 + "s";
  snowContainer.appendChild(snow);
}

document.querySelectorAll(".glass").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,.13), rgba(255,255,255,.045) 38%)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "rgba(255,255,255,.045)";
  });
});

const profile = document.querySelector(".profile-card");

document.addEventListener("mousemove", (e) => {
  if (!profile) return;
  const x = (window.innerWidth / 2 - e.clientX) / 80;
  const y = (window.innerHeight / 2 - e.clientY) / 80;
  profile.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
});
