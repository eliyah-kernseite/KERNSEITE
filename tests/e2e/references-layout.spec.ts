import { test, expect } from '@playwright/test';

test('Babyschlafberatung verlinkt auf die Live-Website', async ({ page }) => {
  await page.goto('/arbeiten/babyschlafberatung/');
  await expect(page.locator('.chero__actions .btn--primary')).toHaveAttribute(
    'href',
    'https://babyschlaf-coach.de',
  );
  const image = page.locator('#projektvorschau .shot__browser img');
  await expect(image).toHaveAttribute('src', /babyschlafberatung-desktop-1440\.webp$/);
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`Footerlinks bleiben vollständig bei ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.locator('footer').scrollIntoViewIfNeeded();
    const clipped = await page
      .locator('.ft__group a, .ft__meta a')
      .evaluateAll((links) =>
        links
          .filter(
            (link) =>
              link.scrollWidth > link.clientWidth + 1 &&
              getComputedStyle(link).overflow === 'hidden',
          )
          .map((link) => link.textContent),
      );
    expect(clipped).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
    if ([390, 1440].includes(width))
      await testInfo.attach(`footer-${width}`, {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
  });
}

test('Der Ablauf erklärt die Zusammenarbeit und führt zur Anfrage', async ({ page }) => {
  await page.goto('/prozess/');
  await expect(page.locator('.process-story__step')).toHaveCount(5);
  await expect(page.locator('.process-story')).toContainText('Von dir');
  await expect(page.locator('.process-story')).toContainText('Von KERNSEITE');
  await expect(page.locator('.cta .btn')).toHaveAttribute('href', '/kontakt/');
});
