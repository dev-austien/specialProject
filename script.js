/* ══════════════════════════════════════
   RUFFA'S WEBSITE — script.js
   ══════════════════════════════════════ */


/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

let mx = 0, my = 0;  // mouse position
let rx = 0, ry = 0;  // ring position (lags behind)

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function animateCursor() {
  // Dot snaps directly to mouse
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';

  // Ring smoothly follows with easing
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';

  requestAnimationFrame(animateCursor);
})();


/* ── FLOATING PETALS ── */
const petalContainer = document.getElementById('petals');
const symbols = ['✿', '❀', '✾', '🌸', '💜', '✦', '·'];

function spawnPetal() {
  const el = document.createElement('span');
  el.className = 'petal';
  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  // Random horizontal position
  el.style.left = Math.random() * 100 + 'vw';
  el.style.top  = '-40px';

  // Random speed & delay
  const dur   = 8 + Math.random() * 12;
  const delay = Math.random() * 5;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay   = delay + 's';

  // Random size
  el.style.fontSize = (0.6 + Math.random() * 0.9) + 'rem';
  el.style.opacity  = '0.7';

  petalContainer.appendChild(el);

  // Remove petal from DOM after animation ends
  setTimeout(() => el.remove(), (dur + delay) * 1000);
}

// Spawn a new petal every 400ms
setInterval(spawnPetal, 400);

// Pre-populate with some petals so the screen isn't empty on load
for (let i = 0; i < 18; i++) {
  spawnPetal();
}


/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));