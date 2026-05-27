/* =============================================
   CHILLDOG – main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('nav-drawer');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    if (isOpen) {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      closeDrawer();
    }
  });

  function closeDrawer() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Zamknij drawer po kliknięciu w link
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  // Zamknij drawer po kliknięciu poza nim
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
      closeDrawer();
    }
  });


  /* ── 2. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 3. SCROLL REVEAL (IntersectionObserver) ── */
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Odłącz po jednorazowym pokazaniu (lepsza wydajność)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));


  /* ── 4. AKTYWNY LINK W NAWIGACJI ── */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a, .nav-drawer a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.opacity = a.getAttribute('href') === `#${id}` ? '1' : '';
          a.style.fontWeight = a.getAttribute('href') === `#${id}` ? '700' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ── 5. FORMULARZ KONTAKTOWY ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.btn-send');
      btn.textContent = '✅ Wiadomość wysłana!';
      btn.style.background = '#5a8a6a';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '✈ Wyślij wiadomość';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

});
