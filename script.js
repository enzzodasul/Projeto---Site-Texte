/* ═══════════════════════════════════════
   ENZZO DA SUL — OFFICIAL HUB v3.0
   Interactive Gateway, Animations & Routing
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const splitScreen = document.getElementById('splitScreen');
  const mainSite = document.getElementById('mainSite');
  const splitDev = document.getElementById('splitDev');
  const splitArtist = document.getElementById('splitArtist');
  const artistSection = document.getElementById('artistSection');
  const devSection = document.getElementById('devSection');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  // 1. ANIMAÇÃO DE CARREGAMENTO INICIAL (Loader)
  setTimeout(() => {
    if (loader) {
      loader.classList.add('hide');
    }
  }, 1400);

  // 2. TELA DIVIDIDA NA VERTICAL (Gateway de Entrada)
  window.enterArea = function(mode) {
    if (splitScreen) splitScreen.classList.add('hide');
    if (mainSite) mainSite.classList.add('show');

    if (mode === 'dev') {
      // Abre direto na área de Programador / Tech
      if (artistSection) artistSection.style.display = 'none';
      if (devSection) devSection.style.display = 'block';
      const techEl = document.getElementById('tech');
      if (techEl) {
        setTimeout(() => {
          techEl.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Abre na área Artística / Músicas
      if (artistSection) artistSection.style.display = 'block';
      if (devSection) devSection.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (splitDev) {
    splitDev.addEventListener('click', () => window.enterArea('dev'));
  }

  if (splitArtist) {
    splitArtist.addEventListener('click', () => window.enterArea('artist'));
  }

  // Voltar para a tela dividida ao clicar no logo da Navbar
  window.showSplit = function() {
    if (mainSite) mainSite.classList.remove('show');
    if (splitScreen) splitScreen.classList.remove('hide');
    window.scrollTo({ top: 0 });
  };

  // 3. MENU MOBILE HAMBÚRGUER
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        
        // Se clicar em Tech, garante que a seção esteja visível
        if (link.getAttribute('href') === '#tech') {
          if (devSection) devSection.style.display = 'block';
        }
      });
    });
  }

  // 4. EFEITO SONORO SUTIL EM BOTÕES DE PLAY E CARDS (Web Audio API)
  let audioCtx = null;
  document.querySelectorAll('.t-play, .clip-card, .btn-play').forEach(el => {
    el.addEventListener('click', () => {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } catch (err) {
        // Áudio silenciado sem quebrar fluxo
      }
    });
  });

  console.log('⚡ Enzzo da Sul Hub v3.0 carregado com sucesso!');
});
