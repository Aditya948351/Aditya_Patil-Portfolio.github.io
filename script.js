/* =============================================
   PORTFOLIO — script.js
   ============================================= */

// ── AOS Init ─────────────────────────────────
AOS.init({ once: true, offset: 80 });

// ── Year in footer ────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });

// ── Active nav link on scroll ─────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Hamburger menu ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Typing effect ─────────────────────────────
const phrases = [
  'Android Apps',
  'ML-Powered Systems',
  'Clean UI Experiences',
  'Real-World Solutions',
  'Jetpack Compose UIs',
];

const typedEl = document.getElementById('typed-text');
let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
const SPEED_TYPE = 75;
const SPEED_DEL  = 45;
const PAUSE_END  = 1800;
const PAUSE_START = 400;

function typeLoop() {
  const current = phrases[phraseIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, PAUSE_END);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, PAUSE_START);
      return;
    }
  }

  setTimeout(typeLoop, deleting ? SPEED_DEL : SPEED_TYPE);
}

typeLoop();

// ── Skill-bar animation on scroll ────────────
const skillFills = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.width + '%';
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(bar => barObserver.observe(bar));

// ── Scroll-to-top ─────────────────────────────
const scrollTopBtn = document.getElementById('scroll-top');
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
