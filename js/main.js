// ============================================
// 3WeSolution - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Nav Toggle ──
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      const open  = menu.classList.contains('open');
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity   = open ? '0' : '';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('nav')) {
        menu.classList.remove('open');
        toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // ── Mobile dropdown toggle ──
  document.querySelectorAll('.nav-dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.closest('.nav-dropdown').classList.toggle('open');
      }
    });
  });

  // ── Scroll-reveal ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.service-card, .detail-card, .team-card, .value-card, .testimonial-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ── Active nav link ──
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.getAttribute('href') && currentPath.endsWith(a.getAttribute('href'))) {
      a.classList.add('active');
    }
  });

  // ── Smooth counter animation ──
  const counters = document.querySelectorAll('.num[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const end   = parseInt(el.dataset.count);
      const dur   = 1800;
      const step  = end / (dur / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= end) { el.textContent = el.dataset.suffix ? end + el.dataset.suffix : end + '+'; clearInterval(timer); return; }
        el.textContent = Math.floor(current) + (el.dataset.suffix || '+');
      }, 16);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => countObserver.observe(c));

  // ── Contact form ──
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      btn.textContent = btn.dataset.loading || 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align:center;padding:48px 0">
            <div style="font-size:48px;margin-bottom:16px">✅</div>
            <h3 style="font-size:22px;margin-bottom:8px">${btn.dataset.success || 'Message Sent!'}</h3>
            <p style="color:var(--color-text-secondary)">${btn.dataset.msg || 'We\'ll get back to you within 24 hours.'}</p>
          </div>`;
      }, 1200);
    });
  }

});
