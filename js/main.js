// ============================================
// AXYTHRA — MAIN JAVASCRIPT
// ============================================

// --- Navbar scroll shadow ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Hamburger menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
});

mobileClose.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
});

mobileOverlay.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
});

// --- Scroll fade-in animation ---
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 150);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// --- Case Studies Swiper ---
const csSwiper = new Swiper('.casestudies-swiper', {
  slidesPerView: 1.2,
  spaceBetween: 24,
  navigation: {
    prevEl: '#csPrev',
    nextEl: '#csNext',
  },
  breakpoints: {
    640: { slidesPerView: 1.5 },
    1024: { slidesPerView: 2.5 },
  }
});

// --- Contact Form ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = '⏳ Sending...';
    btn.style.opacity = '0.7';

    // Launch confetti
    launchConfetti();

    // Let the form submit naturally to Web3Forms
    // DO NOT call e.preventDefault()
  });
}

// --- Confetti Function ---
function launchConfetti() {
  const colors = ['#38BDF8', '#818CF8', '#C084FC', '#22c55e', '#f59e0b'];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      top: -10px;
      left: ${Math.random() * 100}vw;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      z-index: 9999;
      pointer-events: none;
      animation: confettiFall ${Math.random() * 2 + 1.5}s ease-out forwards;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});