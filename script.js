/* ── Nav scroll behavior ── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
}, { passive: true });

/* ── Active nav link tracking ── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.id;
    }
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ── Mobile menu ── */
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* Close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  }
});

/* ── Scroll reveal (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        /* stagger siblings by index within their parent */
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        const delay = idx * 80;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── GPA bar animation ── */
const gpaObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.gpa-bar-fill');
        if (fill) {
          setTimeout(() => {
            fill.style.width = fill.dataset.width + '%';
          }, 350);
        }
        gpaObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

const eduCard = document.querySelector('.edu-card');
if (eduCard) gpaObserver.observe(eduCard);

/* ── Smooth nav CTA hover ripple ── */
document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta').forEach(btn => {
  btn.addEventListener('mouseenter', function(e) {
    this.style.willChange = 'transform';
  });
  btn.addEventListener('mouseleave', function() {
    this.style.willChange = '';
  });
});
