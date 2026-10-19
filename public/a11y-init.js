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
    // Maus oder Trackpad am Rechner (kein iPad): weiches Scrollen, Mauseffekte.
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var ipad = /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
    if (fine && !ipad) root.classList.add('has-fine');
    // Scroll-Animationen in CSS laufen im Browser direkt beim Scrollen mit,
    // auch auf Handy und iPad ohne Ruckeln (Safari ab 26, Chrome, Edge).
    var sda = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline: view()'));
    if (sda) root.classList.add('has-sda');
    // Scrollgebundene Szenen (Pinnen, seitliche Spuren, Zoom, Parallaxe): überall
    // mit CSS-Scroll-Animationen, sonst nur am Rechner über JavaScript.
    if (sda || (fine && !ipad)) root.classList.add('has-scroll-fx');
    // Kurzes Intro mit dem Schriftzug, aber nur beim ersten Seitenaufruf je Sitzung.
    try {
      if (!sessionStorage.getItem('ks-intro')) {
        root.classList.add('has-intro');
        sessionStorage.setItem('ks-intro', '1');
      }
    } catch {
      /* Speicher gesperrt: kein Intro */
    }
  }
})();
