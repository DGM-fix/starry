/* ================================
   STARRY TATTOO — main.js
   ================================ */

// ← Altere para seu número (55 + DDD + número)
const WA = '554187891312';

/* ================================
   CONTADOR ANIMADO
   ================================ */
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (current === target ? '+' : '');
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}

const heroObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateCounters(); heroObs.disconnect(); }
}, { threshold: 0.3 });
heroObs.observe(document.querySelector('.hero'));

/* ================================
   NAV ACTIVE ON SCROLL
   ================================ */
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ================================
   GALERIA — UPLOAD E LIGHTBOX
   ================================ */
function addGalleryPhotos(input) {
  const grid = document.getElementById('galleryGrid');
  Array.from(input.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.onclick = () => openLightbox(e.target.result);

      const placeholders = grid.querySelectorAll('.gallery-placeholder');
      if (placeholders.length > 0) {
        const parent = placeholders[0].parentElement;
        parent.innerHTML = '';
        parent.appendChild(img);
      } else {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.appendChild(img);
        grid.appendChild(item);
      }
    };
    reader.readAsDataURL(file);
  });
}

function openLightbox(src) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

/* ================================
   FORMULÁRIO — ENVIO VIA WHATSAPP
   ================================ */
async function enviar() {
  const nome = document.getElementById('nome').value.trim();
  const tel  = document.getElementById('tel').value.trim();

  if (!nome || !tel) {
    alert('Preencha nome e WhatsApp.');
    return;
  }

  const estilo  = document.getElementById('estilo').value;
  const tamanho = document.getElementById('tamanho').value;
  const desc    = document.getElementById('desc').value.trim();

  let msg = `*Orçamento — Starry Tattoo*\n\n`;
  msg += `Nome: ${nome}\nWhatsApp: ${tel}\n`;
  if (estilo)  msg += `Estilo: ${estilo}\n`;
  if (tamanho) msg += `Tamanho: ${tamanho}\n`;
  if (desc)    msg += `Descrição: ${desc}\n`;

  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');

  const ok = document.getElementById('ok');
  ok.style.display = 'block';
}

function mostrarAviso(texto) {
  const aviso = document.getElementById('avisoImg');
  aviso.textContent = '⚠ ' + texto;
  aviso.style.display = 'block';
}
