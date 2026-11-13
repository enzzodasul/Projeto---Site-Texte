// Interatividade e Player para Enzzo da Sul Official Hub
document.addEventListener('DOMContentLoaded', () => {
  const mainPlayBtn = document.getElementById('mainPlayBtn');
  const trackTitle = document.getElementById('currentTrackTitle');
  const vinyl = document.querySelector('.vinyl-disc');
  let isPlaying = false;

  // Sintetizador de batida / feedback de áudio em Web Audio API nativo
  let audioCtx = null;

  mainPlayBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    isPlaying = !isPlaying;

    if (isPlaying) {
      mainPlayBtn.textContent = '⏸ Pausar Prévia';
      mainPlayBtn.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
      if (vinyl) vinyl.style.animationPlayState = 'running';
      playSampleTone();
    } else {
      mainPlayBtn.textContent = '▶ Tocar Trecho / Prévia';
      mainPlayBtn.style.background = 'linear-gradient(135deg, var(--accent-purple), #4f46e5)';
      if (vinyl) vinyl.style.animationPlayState = 'paused';
    }
  });

  function playSampleTone() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, audioCtx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  }

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  console.log('⚡ Enzzo da Sul Official Hub carregado com sucesso!');
});
