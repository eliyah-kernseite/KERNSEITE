// Darstellungseinstellungen vor dem ersten Paint setzen (blockierend, extern wegen CSP).
(function () {
  var root = document.documentElement;
  try {
    var raw = localStorage.getItem('kernseite-accessibility');
    if (raw) {
      var s = JSON.parse(raw);
      var sizes = [1, 1.125, 1.25];
      if (sizes.indexOf(Number(s.size)) !== -1) {
        root.style.setProperty('--a11y-scale', String(Number(s.size)));
      }
      if (s.contrast === true) root.dataset.a11yContrast = 'high';
      if (s.motion === true) root.dataset.a11yMotion = 'reduced';
    }
  } catch {
    /* Speicher gesperrt: Standard */
  }
  // Scroll-Animationen nur, wenn niemand weniger Bewegung wünscht (siehe src/scripts/motion.ts).
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!calm && root.dataset.a11yMotion !== 'reduced') {
    root.classList.add('has-motion');
    // Scrollgebundene Effekte (Pinnen, seitliche Spuren, Zoom, Parallaxe) nur mit
    // Maus oder Trackpad am Rechner. Tablets und Handys scrollen nativ und
    // bekommen wischbare Reihen, sonst ruckelt es auf dem iPad.
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var ipad = /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
    if (fine && !ipad) root.classList.add('has-scroll-fx');
  }
})();
