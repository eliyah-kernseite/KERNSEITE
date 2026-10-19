/**
 * Motion – Scroll-Animationen der Website.
 *
 * Alles ist Progressive Enhancement: Ohne JavaScript, bei
 * `prefers-reduced-motion` oder wenn im Lesbarkeit-Menü „Bewegung
 * reduzieren“ an ist, bleibt jeder Inhalt sofort sichtbar und steht still.
 *
 *   [data-reveal]          blendet beim Hereinscrollen ein (Varianten: up, fade, scale)
 *   [data-reveal-group]    staffelt die direkten Kinder nacheinander
 *   [data-split]           zerlegt eine Überschrift in Wörter, die nacheinander aufsteigen
 *   [data-scrub]           färbt Fließtext Wort für Wort beim Scrollen ein
 *   [data-parallax]        verschiebt ein Bild leicht gegen die Scrollrichtung (Wert = Stärke)
 *   [data-stack]           Projektkarten, die beim Scrollen übereinander gleiten
 *   [data-progress]        Linie, die sich mit dem Scrollfortschritt eines Abschnitts füllt
 *   [data-magnetic]        Schaltfläche folgt dem Mauszeiger ein kleines Stück
 *   [data-pin]             hoher Abschnitt mit klebendem Inhalt; setzt --p (0 bis 1)
 *   [data-hscroll]         Spur in einem [data-pin], die beim Scrollen seitlich fährt
 *   [data-drift]           Zeile wandert beim Scrollen seitlich (Wert = Weg in vw)
 *   [data-marquee]         Laufband, das mit der Scrollgeschwindigkeit schneller wird
 *   [data-cursor]          eigener Mauszeiger zeigt hier ein Wort (z. B. „Ansehen“)
 *   [data-spotlight]       Lichtfleck folgt dem Mauszeiger auf einer Fläche
 *   [data-tilt]            Fläche kippt leicht zum Mauszeiger
 *   [data-preview]         Liste, deren Zeilen ein Bild am Mauszeiger zeigen (data-img)
 *   [data-copy]            Schaltfläche kopiert data-copy in die Zwischenablage
 *   [data-clock]           zeigt die aktuelle Uhrzeit in Würzburg
 *   [data-scroll-progress] Lesefortschritt der Seite als --scroll
 *   [data-grow]            Fläche wächst beim Hereinscrollen auf volle Breite (--g, 0 bis 1)
 *   [data-leave]           Seitenkopf weicht beim Herausscrollen (--leave, 0 bis 1)
 *   [data-depth]           Fläche verschiebt sich leicht mit dem Mauszeiger (--dx, --dy)
 *   [data-count]           Zahl zählt beim Einblenden hoch
 *   .btn                   Beschriftung rollt beim Überfahren (Kopie wird hier angelegt)
 *
 * Weiches Scrollen übernimmt Lenis, ebenfalls nur ohne Bewegungswunsch.
 */
import Lenis from 'lenis';

const root = document.documentElement;
const media = window.matchMedia('(prefers-reduced-motion: reduce)');
const reduced = (): boolean => media.matches || root.dataset.a11yMotion === 'reduced';

/* --- Wörter zerlegen ------------------------------------------------------ */
function splitWords(el: HTMLElement, cls: string): HTMLElement[] {
  const words: HTMLElement[] = [];
  const walk = (node: Node): void => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(part));
          } else {
            const outer = document.createElement('span');
            outer.className = `${cls}-w`;
            const inner = document.createElement('span');
            inner.className = cls;
            inner.textContent = part;
            outer.append(inner);
            frag.append(outer);
            words.push(inner);
          }
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
        walk(child);
      }
    }
  };
  walk(el);
  return words;
}

/* --- Einblenden ----------------------------------------------------------- */
function setupReveal(): void {
  for (const group of document.querySelectorAll<HTMLElement>('[data-reveal-group]')) {
    Array.from(group.children).forEach((child, i) => {
      const el = child as HTMLElement;
      if (!el.hasAttribute('data-reveal'))
        el.setAttribute('data-reveal', group.dataset.revealGroup || 'up');
      el.style.setProperty('--reveal-delay', `${Math.min(i, 8) * 90}ms`);
    });
  }
  for (const el of document.querySelectorAll<HTMLElement>('[data-split]')) {
    splitWords(el, 'split').forEach((w, i) => w.style.setProperty('--split-delay', `${i * 55}ms`));
  }
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-split]');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => io.observe(el));
}

/* --- Scroll-gebundene Effekte -------------------------------------------- */
interface ScrubItem {
  el: HTMLElement;
  words: HTMLElement[];
}

/** Pinnen, Spuren, Zoom und Parallaxe nur am Rechner (siehe public/a11y-init.js). */
const scrollFx = (): boolean => root.classList.contains('has-scroll-fx');

function setupScroll(): void {
  const fx = scrollFx();
  const fxOnly = (sel: string): HTMLElement[] =>
    fx ? Array.from(document.querySelectorAll<HTMLElement>(sel)) : [];
  const scrubs: ScrubItem[] = Array.from(
    document.querySelectorAll<HTMLElement>('[data-scrub]'),
  ).map((el) => ({ el, words: splitWords(el, 'scrub') }));
  const parallax = fxOnly('[data-parallax]');
  const stacks = Array.from(document.querySelectorAll<HTMLElement>('[data-stack] > *'));
  const progress = Array.from(document.querySelectorAll<HTMLElement>('[data-progress]'));
  const pins = fxOnly('[data-pin]');
  const drifts = fxOnly('[data-drift]');
  const pageBars = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-progress]'));
  const grows = fxOnly('[data-grow]');
  const leaves = fxOnly('[data-leave]');

  // Erst alles messen, dann alles schreiben: abwechselndes Lesen und Schreiben
  // zwingt den Browser zu einem neuen Layout pro Element und lässt das
  // Scrollen auf Tablets ruckeln.
  const lastLit = new Map<HTMLElement, number>();
  const near = (r: DOMRect, vh: number, pad: number): boolean =>
    r.bottom > -pad && r.top < vh + pad;

  let ticking = false;
  const update = (): void => {
    ticking = false;
    const vh = window.innerHeight;
    const writes: Array<() => void> = [];

    for (const { el, words } of scrubs) {
      const r = el.getBoundingClientRect();
      if (!near(r, vh, 200)) continue;
      // 0 wenn der Absatz unten hereinkommt, 1 wenn er das obere Drittel erreicht.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.45)));
      const lit = Math.round(p * words.length);
      if (lastLit.get(el) === lit) continue;
      lastLit.set(el, lit);
      writes.push(() => words.forEach((w, i) => w.classList.toggle('is-lit', i < lit)));
    }

    for (const el of parallax) {
      const r = el.getBoundingClientRect();
      if (!near(r, vh, 100)) continue;
      const strength = Number(el.dataset.parallax) || 0.12;
      const offset = (r.top + r.height / 2 - vh / 2) * -strength;
      writes.push(() => el.style.setProperty('--parallax', `${offset.toFixed(1)}px`));
    }

    const stackRects = stacks.map((card) => card.getBoundingClientRect());
    stacks.forEach((card, i) => {
      const next = stacks[i + 1];
      const r = stackRects[i]!;
      if (!next || card.parentElement !== next.parentElement) return;
      if (!near(r, vh, vh)) return;
      const n = stackRects[i + 1]!;
      // Wie weit die nächste Karte die aktuelle schon überdeckt (0 bis 1).
      const covered = Math.min(1, Math.max(0, 1 - (n.top - r.top) / Math.max(r.height, 1)));
      writes.push(() => {
        card.style.setProperty('--stack-p', covered.toFixed(4));
        card.style.setProperty('--stack-scale', (1 - covered * 0.06).toFixed(4));
        card.style.setProperty('--stack-dim', (covered * 0.55).toFixed(3));
      });
    });

    for (const pin of pins) {
      const r = pin.getBoundingClientRect();
      if (!near(r, vh, 50)) continue;
      const span = Math.max(1, r.height - vh);
      const p = Math.min(1, Math.max(0, -r.top / span));
      const track = pin.querySelector<HTMLElement>('[data-hscroll]');
      // Breite der Liste selbst messen: Ihre Verschiebung ändert scrollWidth.
      const inner = track?.firstElementChild as HTMLElement | null | undefined;
      const distance = track ? Math.max(0, (inner?.offsetWidth ?? 0) - track.clientWidth) : 0;
      writes.push(() => {
        pin.style.setProperty('--p', p.toFixed(4));
        track?.style.setProperty('--shift', `${(-p * distance).toFixed(1)}px`);
      });
    }

    for (const el of drifts) {
      const r = el.getBoundingClientRect();
      if (!near(r, vh, 200)) continue;
      const p = (vh - r.top) / (vh + r.height) - 0.5;
      const amount = Number(el.dataset.drift) || 10;
      writes.push(() => el.style.setProperty('--drift', `${(p * amount).toFixed(2)}vw`));
    }

    for (const el of grows) {
      const r = el.getBoundingClientRect();
      if (!near(r, vh, 100)) continue;
      // 0 wenn die Oberkante unten hereinkommt, 1 wenn sie ein Viertel hoch steht.
      const g = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
      writes.push(() => el.style.setProperty('--g', g.toFixed(4)));
    }

    for (const el of leaves) {
      const r = el.getBoundingClientRect();
      if (!near(r, vh, 0)) continue;
      const leave = Math.min(1, Math.max(0, -r.top / Math.max(r.height, 1)));
      writes.push(() => el.style.setProperty('--leave', leave.toFixed(4)));
    }

    if (pageBars.length) {
      const max = document.documentElement.scrollHeight - vh;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      writes.push(() => pageBars.forEach((bar) => bar.style.setProperty('--scroll', p.toFixed(4))));
    }

    for (const el of progress) {
      const host = el.closest<HTMLElement>('[data-progress-host]') ?? el.parentElement;
      if (!host) continue;
      const r = host.getBoundingClientRect();
      if (!near(r, vh, 100)) continue;
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      writes.push(() => el.style.setProperty('--progress', p.toFixed(4)));
    }

    for (const write of writes) write();
  };
  const onScroll = (): void => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

/* --- Laufband mit Scrollgeschwindigkeit --------------------------------- */
function setupMarquees(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-marquee]')).map((el) => ({
    el,
    track: el.firstElementChild as HTMLElement,
    x: 0,
    half: 0,
    visible: false,
    dir: el.dataset.marquee === 'right' ? 1 : -1,
  }));
  if (!items.length) return;
  // Breite nur bei Größenänderung messen, nicht in jedem Bild.
  const measure = (): void => items.forEach((m) => (m.half = (m.track?.scrollWidth ?? 0) / 2));
  measure();
  window.addEventListener('resize', measure, { passive: true });
  document.fonts?.ready.then(measure);
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const m = items.find((i) => i.el === entry.target);
      if (m) m.visible = entry.isIntersecting;
    }
  });
  items.forEach((m) => io.observe(m.el));

  let lastY = window.scrollY;
  let boost = 0;
  const tick = (): void => {
    const y = window.scrollY;
    const v = y - lastY;
    lastY = y;
    // Scrollen gibt Schub, der sanft ausläuft; die Richtung folgt dem Scrollen.
    boost += (Math.min(40, Math.abs(v)) - boost) * 0.1;
    const sign = v < 0 ? -1 : 1;
    for (const m of items) {
      if (!m.track || !m.visible || !m.half) continue;
      m.x += (0.6 + boost * 0.35) * m.dir * (v === 0 ? 1 : sign);
      if (m.x <= -m.half) m.x += m.half;
      if (m.x > 0) m.x -= m.half;
      m.track.style.transform = `translate3d(${m.x.toFixed(1)}px,0,0)`;
    }
    if (!reduced()) requestAnimationFrame(tick);
    else items.forEach((m) => m.track && (m.track.style.transform = ''));
  };
  requestAnimationFrame(tick);
}

/* --- Eigener Mauszeiger -------------------------------------------------- */
function setupCursor(): void {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="cursor__label"></span>';
  document.body.append(cursor);
  const label = cursor.firstElementChild as HTMLElement;
  let x = -100;
  let y = -100;
  let cx = x;
  let cy = y;
  window.addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX;
      y = e.clientY;
      cursor.classList.add('is-on');
      const target = (e.target as Element).closest<HTMLElement>(
        '[data-cursor], a, button, summary, label',
      );
      const word = target?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '';
      cursor.classList.toggle('is-link', !!target && !word);
      cursor.classList.toggle('is-label', !!word);
      if (word && label.textContent !== word) label.textContent = word;
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
  // Die Schleife läuft nur, solange der Zeiger dem Mauszeiger noch hinterherläuft.
  let running = false;
  const loop = (): void => {
    if (reduced()) {
      cursor.remove();
      return;
    }
    cx += (x - cx) * 0.2;
    cy += (y - cy) * 0.2;
    cursor.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
    running = Math.abs(x - cx) + Math.abs(y - cy) > 0.3;
    if (running) requestAnimationFrame(loop);
  };
  window.addEventListener(
    'pointermove',
    () => {
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    },
    { passive: true },
  );
}

/* --- Lichtfleck und Kippen ----------------------------------------------- */
function setupPointerFx(): void {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  for (const el of document.querySelectorAll<HTMLElement>('[data-spotlight]')) {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${e.clientX - r.left}px`);
      el.style.setProperty('--sy', `${e.clientY - r.top}px`);
    });
  }
  for (const el of document.querySelectorAll<HTMLElement>('[data-tilt]')) {
    el.addEventListener('pointermove', (e) => {
      if (reduced()) return;
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }
  for (const list of document.querySelectorAll<HTMLElement>('[data-preview]')) {
    // Das Vorschaubild entsteht erst beim ersten Überfahren, damit kein
    // leeres <img> im Dokument steht.
    let box: HTMLDivElement | undefined;
    let img: HTMLImageElement | undefined;
    const ensure = (): void => {
      if (box) return;
      box = document.createElement('div');
      box.className = 'preview';
      box.setAttribute('aria-hidden', 'true');
      img = document.createElement('img');
      img.alt = '';
      img.decoding = 'async';
      box.append(img);
      document.body.append(box);
    };
    for (const row of list.querySelectorAll<HTMLElement>('[data-img]')) {
      row.addEventListener('pointerenter', () => {
        if (reduced()) return;
        ensure();
        img!.src = row.dataset.img ?? '';
        box!.classList.add('is-on');
      });
      row.addEventListener('pointerleave', () => box?.classList.remove('is-on'));
    }
    list.addEventListener('pointermove', (e) => {
      if (box) box.style.transform = `translate3d(${e.clientX + 24}px,${e.clientY - 90}px,0)`;
    });
  }
}

/* --- Kleine Helfer, die auch ohne Bewegung laufen ------------------------ */
function setupUtilities(): void {
  for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
    const original = btn.textContent;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy ?? '');
        btn.textContent = 'Kopiert';
      } catch {
        window.location.href = `mailto:${btn.dataset.copy}`;
        return;
      }
      window.setTimeout(() => (btn.textContent = original), 1800);
    });
  }
  const clocks = document.querySelectorAll<HTMLElement>('[data-clock]');
  if (clocks.length) {
    const fmt = new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Berlin',
    });
    const set = (): void => clocks.forEach((c) => (c.textContent = fmt.format(new Date())));
    set();
    window.setInterval(set, 15000);
  }
}

/* --- Beschriftung rollt -------------------------------------------------- */
function setupButtonRoll(): void {
  for (const btn of document.querySelectorAll<HTMLElement>(
    'a.btn, button.btn:not([data-submit])',
  )) {
    if (btn.querySelector('.btn__roll')) continue;
    const label = document.createElement('span');
    label.className = 'btn__label';
    label.append(...Array.from(btn.childNodes));
    const clone = label.cloneNode(true) as HTMLElement;
    clone.classList.add('btn__label--clone');
    clone.setAttribute('aria-hidden', 'true');
    const roll = document.createElement('span');
    roll.className = 'btn__roll';
    roll.append(label, clone);
    btn.append(roll);
  }
}

/* --- Zahlen zählen hoch -------------------------------------------------- */
function setupCounters(): void {
  const fmt = new Intl.NumberFormat('de-DE');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.count) || 0;
        const start = performance.now();
        const dur = 1400;
        const step = (now: number): void => {
          const t = Math.min(1, (now - start) / dur);
          // Schnell los, weich ins Ziel.
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = fmt.format(Math.round((target * eased) / 10) * 10);
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = fmt.format(target);
        };
        requestAnimationFrame(step);
      }
    },
    { threshold: 0.6 },
  );
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => io.observe(el));
}

/* --- Tiefe mit dem Mauszeiger -------------------------------------------- */
function setupDepth(): void {
  if (!scrollFx()) return;
  for (const el of document.querySelectorAll<HTMLElement>('[data-depth]')) {
    const host = el.closest<HTMLElement>('section') ?? el;
    const strength = Number(el.dataset.depth) || 20;
    let frame = 0;
    host.addEventListener('pointermove', (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = (e.clientX / window.innerWidth - 0.5) * -strength;
        const y = (e.clientY / window.innerHeight - 0.5) * -strength;
        el.style.setProperty('--dx', `${x.toFixed(1)}px`);
        el.style.setProperty('--dy', `${y.toFixed(1)}px`);
      });
    });
  }
}

/* --- Weiches Scrollen ----------------------------------------------------- */
let lenis: Lenis | undefined;
function setupSmoothScroll(): void {
  lenis = new Lenis({ lerp: 0.16, anchors: { offset: -80 }, autoRaf: true });
}

/* --- Magnetische Schaltflächen ------------------------------------------- */
function setupMagnetic(): void {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  for (const el of document.querySelectorAll<HTMLElement>('[data-magnetic]')) {
    el.addEventListener('pointermove', (e) => {
      if (reduced()) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      el.style.setProperty('--mx', `${x.toFixed(1)}px`);
      el.style.setProperty('--my', `${y.toFixed(1)}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  }
}

function init(): void {
  setupUtilities();
  if (reduced()) {
    root.classList.remove('has-motion', 'has-scroll-fx');
    return;
  }
  root.classList.add('has-motion');
  setupButtonRoll();
  setupReveal();
  // Ab hier übernimmt das Skript; die CSS-Notbremse in motion.css greift nicht mehr.
  root.classList.add('motion-ready');
  setupScroll();
  setupMagnetic();
  setupMarquees();
  setupCursor();
  setupPointerFx();
  setupCounters();
  setupDepth();
  // Auf Touchgeräten scrollt der Browser selbst am flüssigsten.
  if (scrollFx()) setupSmoothScroll();
}

init();

// Wird „Bewegung reduzieren“ später eingeschaltet, sofort alles zeigen.
new MutationObserver(() => {
  if (reduced()) {
    root.classList.remove('has-motion', 'has-scroll-fx');
    lenis?.destroy();
    lenis = undefined;
  }
}).observe(root, { attributes: true, attributeFilter: ['data-a11y-motion'] });
