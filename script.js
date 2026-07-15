// ── Dark mode toggle ──
const toggle = document.getElementById('dark-mode-toggle');
const icon = toggle.querySelector('.toggle-icon');

const saved = localStorage.getItem('theme');
if (saved === 'dark') {
  document.body.classList.add('dark-mode');
  icon.textContent = '🌙';
}

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  icon.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ── Terminal typing animation ──
const cmd = document.getElementById('typed-cmd');
const output = document.getElementById('typed-output');
const cursor = document.querySelector('.cursor');

const command = 'whoami --verbose';
const response = '→ Kurt Luza | Aspiring Full-Stack Developer & IT Professional';

let i = 0;
let outputStarted = false;

function typeChar() {
  if (i < command.length) {
    cmd.textContent += command[i];
    i++;
    setTimeout(typeChar, 55 + Math.random() * 35);
  } else if (!outputStarted) {
    outputStarted = true;
    cursor.style.display = 'none';
    setTimeout(() => typeOutput(0), 400);
  }
}

function typeOutput(j) {
  if (j < response.length) {
    output.textContent += response[j];
    setTimeout(() => typeOutput(j + 1), 28);
  }
}

setTimeout(typeChar, 600);

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

// ── Scroll-in animations ──
const animTargets = document.querySelectorAll(
  '.project-card, .contact-card, .skill-tag, .exp-card, .cert-card'
);

animTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      io.disconnect();
    }
  }, { threshold: 0.08 });
  io.observe(el);
});