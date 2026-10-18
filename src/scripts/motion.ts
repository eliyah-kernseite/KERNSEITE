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
 */

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

function setupScroll(): void {
  const scrubs: ScrubItem[] = Array.from(
    document.querySelectorAll<HTMLElement>('[data-scrub]'),
  ).map((el) => ({ el, words: splitWords(el, 'scrub') }));
  const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  const stacks = Array.from(document.querySelectorAll<HTMLElement>('[data-stack] > *'));
  const progress = Array.from(document.querySelectorAll<HTMLElement>('[data-progress]'));
  if (!scrubs.length && !parallax.length && !stacks.length && !progress.length) return;

  let ticking = false;
  const update = (): void => {
    ticking = false;
    const vh = window.innerHeight;

    for (const { el, words } of scrubs) {
      const r = el.getBoundingClientRect();
      // 0 wenn der Absatz unten hereinkommt, 1 wenn er das obere Drittel erreicht.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.45)));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    }

    for (const el of parallax) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      const strength = Number(el.dataset.parallax) || 0.12;
      const offset = (r.top + r.height / 2 - vh / 2) * -strength;
      el.style.setProperty('--parallax', `${offset.toFixed(1)}px`);
    }

    stacks.forEach((card, i) => {
      const next = stacks[i + 1];
      if (!next || card.parentElement !== next.parentElement) {
        card.style.setProperty('--stack-scale', '1');
        return;
      }
      const r = card.getBoundingClientRect();
      const n = next.getBoundingClientRect();
      // Wie weit die nächste Karte die aktuelle schon überdeckt (0 bis 1).
      const covered = Math.min(1, Math.max(0, 1 - (n.top - r.top) / Math.max(r.height, 1)));
      card.style.setProperty('--stack-scale', (1 - covered * 0.06).toFixed(4));
      card.style.setProperty('--stack-dim', (covered * 0.55).toFixed(3));
    });

    for (const el of progress) {
      const host = el.closest<HTMLElement>('[data-progress-host]') ?? el.parentElement;
      if (!host) continue;
      const r = host.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      el.style.setProperty('--progress', p.toFixed(4));
    }
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
  if (reduced()) {
    root.classList.remove('has-motion');
    return;
  }
  root.classList.add('has-motion');
  setupReveal();
  // Ab hier übernimmt das Skript; die CSS-Notbremse in motion.css greift nicht mehr.
  root.classList.add('motion-ready');
  setupScroll();
  setupMagnetic();
}

init();

// Wird „Bewegung reduzieren“ später eingeschaltet, sofort alles zeigen.
new MutationObserver(() => {
  if (reduced()) root.classList.remove('has-motion');
}).observe(root, { attributes: true, attributeFilter: ['data-a11y-motion'] });
