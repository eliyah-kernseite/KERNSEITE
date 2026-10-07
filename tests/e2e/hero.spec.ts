import { test, expect } from '@playwright/test';

test('Startseite erklärt das Angebot und führt zu Projekt und Anfrage', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('.home-hero');
  await expect(hero.getByRole('heading', { level: 1 })).toContainText('Dein Können.');
  await expect(hero.getByRole('link', { name: 'Lass uns deine Website planen' })).toHaveAttribute(
    'href',
    '/kontakt/',
  );
  await expect(hero.getByRole('link', { name: 'Projekte entdecken' })).toHaveAttribute(
    'href',
    '/arbeiten/',
  );
  await expect(hero.locator('.stage-screen--main img')).toBeVisible();
  await expect(hero.locator('canvas, video')).toHaveCount(0);
});

test('Die Startseite lädt ausschließlich eigene Ressourcen', async ({ page }) => {
  const external: string[] = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://localhost:4321') && /^https?:/.test(request.url()))
      external.push(request.url());
  });
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  expect(external).toEqual([]);
});

test('Der zentrale Kontaktweg ist ohne Scrollen sichtbar', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.hero-intro .btn')).toBeInViewport();
});

for (const width of [320, 390, 768, 1440]) {
  test(`Wichtige Seiten ohne Überlauf bei ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      '/',
      '/leistungen/websites/',
      '/agentur/',
      '/kontakt/',
      '/branchen/handwerk/',
      '/arbeiten/kaya-doener-himmelstadt/',
      '/bildnachweise/',
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        ),
        path,
      ).toBeLessThanOrEqual(1);
      const broken = await page
        .locator('img')
        .evaluateAll((images) =>
          images
            .filter((img) => img.complete && !img.naturalWidth)
            .map((img) => img.getAttribute('src')),
        );
      expect(broken, path).toEqual([]);
      if (
        [390, 1440].includes(width) &&
        ['/', '/leistungen/websites/', '/agentur/', '/kontakt/'].includes(path)
      ) {
        for (const img of await page.locator('img:visible').all())
          await img.scrollIntoViewIfNeeded();
        await page.evaluate(() =>
          Promise.all(
            Array.from(document.images).map((img) => {
              img.loading = 'eager';
              return img.decode().catch(() => {});
            }),
          ),
        );
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
        await testInfo.attach(`Ansicht-${width}-${path.replaceAll('/', '-') || 'start'}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: 'image/png',
        });
      }
    }
  });
}
