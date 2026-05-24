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

// --- Rocket Launch on form submit ---
function launchRocket() {
  const rocket = document.createElement('div');
  rocket.innerHTML = '🚀';
  rocket.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 3rem;
    z-index: 9999;
    pointer-events: none;
    animation: rocketLaunch 2s ease-in forwards;
  `;
  document.body.appendChild(rocket);

  // Smoke particles
  for (let i = 0; i < 20; i++) {
    const smoke = document.createElement('div');
    smoke.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: calc(50% + ${(Math.random() - 0.5) * 60}px);
      width: ${Math.random() * 12 + 6}px;
      height: ${Math.random() * 12 + 6}px;
      background: radial-gradient(circle, rgba(56,189,248,0.8), rgba(129,140,248,0.4));
      border-radius: 50%;
      z-index: 9998;
      pointer-events: none;
      animation: smokeSpread ${Math.random() * 1.5 + 0.5}s ease-out forwards;
      animation-delay: ${Math.random() * 0.3}s;
    `;
    document.body.appendChild(smoke);
    setTimeout(() => smoke.remove(), 2000);
  }

  // Stars burst
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.innerHTML = ['⭐', '✨', '💫'][Math.floor(Math.random() * 3)];
    star.style.cssText = `
      position: fixed;
      bottom: 60px;
      left: calc(50% + ${(Math.random() - 0.5) * 200}px);
      font-size: ${Math.random() * 1.2 + 0.6}rem;
      z-index: 9999;
      pointer-events: none;
      animation: starBurst ${Math.random() * 1.5 + 0.8}s ease-out forwards;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2500);
  }

  setTimeout(() => rocket.remove(), 2500);
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setTimeout(() => {
      launchRocket();
    }, 300);
    setTimeout(() => {
      contactForm.submit();
    }, 2500);
  });
}