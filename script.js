// Mobile menu
const btn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Photos and cards: slideshow when there are several images, placeholder if none load
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.photo, .card-img').forEach(box => {
  let imgs = Array.from(box.querySelectorAll('img'));
  if (!imgs.length) return;
  let idx = 0, timer = null, dots = null;
  const capEl = box.querySelector('.cap-text');

  function show(i) {
    idx = (i + imgs.length) % imgs.length;
    imgs.forEach((im, k) => im.classList.toggle('active', k === idx));
    if (dots) Array.from(dots.children).forEach((d, k) => d.classList.toggle('on', k === idx));
    if (capEl && imgs[idx].dataset.caption) capEl.textContent = imgs[idx].dataset.caption;
  }
  function stop() { clearInterval(timer); timer = null; }
  function start() {
    stop();
    if (!reduceMotion && imgs.length > 1) timer = setInterval(() => show(idx + 1), 5000);
  }
  function build() {
    stop();
    box.querySelectorAll('.s-btn, .s-dots').forEach(n => n.remove());
    dots = null;
    box.classList.toggle('js-slider', imgs.length > 1);
    if (imgs.length > 1) {
      [['prev', 'Previous photo', '\u276E', -1], ['next', 'Next photo', '\u276F', 1]].forEach(([cls, label, txt, step]) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 's-btn ' + cls; b.setAttribute('aria-label', label); b.textContent = txt;
        b.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); show(idx + step); start(); });
        box.appendChild(b);
      });
      dots = document.createElement('div'); dots.className = 's-dots';
      imgs.forEach((_, k) => {
        const d = document.createElement('button');
        d.type = 'button'; d.setAttribute('aria-label', 'Photo ' + (k + 1));
        d.addEventListener('click', e => { e.stopPropagation(); show(k); start(); });
        dots.appendChild(d);
      });
      box.appendChild(dots);
    }
    show(Math.min(idx, imgs.length - 1));
    start();
  }
  function dropBroken(img) {
    if (!imgs.includes(img)) return;
    imgs = imgs.filter(i => i !== img);
    img.remove();
    if (!imgs.length) { stop(); box.classList.add('missing'); } else build();
  }
  imgs.forEach(img => {
    img.addEventListener('error', () => dropBroken(img));
    if (img.complete && img.naturalWidth === 0) dropBroken(img);
  });
  if (!imgs.length) return;
  build();
  // pause on hover, swipe on touch screens
  box.addEventListener('mouseenter', stop);
  box.addEventListener('mouseleave', start);
  let x0 = null;
  box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
  box.addEventListener('touchend', e => {
    if (x0 !== null && imgs.length > 1) {
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
    }
    x0 = null; start();
  });
});

// Fade-in on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
