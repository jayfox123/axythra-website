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
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = '✅ Message Sent!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
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