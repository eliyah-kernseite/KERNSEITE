#!/usr/bin/env python3
"""Erzeugt die Referenz-Screenshots für die Website.

Eingang:  assets-source/screenshots/<slug>-desktop.jpg       (1440 x 900 bei 2x)
          assets-source/screenshots/<slug>-mobile.jpg        (390 x 844 bei 3x)
Ausgabe:  public/assets/references/<slug>-desktop-{640,960,1440,1920}.webp
          public/assets/references/<slug>-mobile-{390,780}.webp

Aufgenommen werden die Quellen mit Playwright von den Live-Seiten
(1440 x 900 und 390 x 844, Cookie-Hinweis vorher geschlossen).

Aufruf: `python3 scripts/build-references.py`
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'assets-source/screenshots'
OUT = ROOT / 'public/assets/references'
SIZES = {'desktop': [640, 960, 1440, 1920], 'mobile': [390, 780]}


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    for kind, widths in SIZES.items():
        for src in sorted(SRC.glob(f'*-{kind}.jpg')):
            slug = src.stem.removesuffix(f'-{kind}')
            im = Image.open(src).convert('RGB')
            for w in widths:
                h = round(im.height * w / im.width)
                im.resize((w, h), Image.LANCZOS).save(
                    OUT / f'{slug}-{kind}-{w}.webp', 'WEBP', quality=78, method=6
                )
            print(f'{slug} {kind}: {widths}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
