import { test, expect } from '@playwright/test';

for (const slug of ['babyschlafberatung', 'bestattungen-gorhau']) {
  test(`Projektentwurf ${slug} ist erreichbar und führt nicht auf eine Platzhalterdomain`, async ({
    page,
  }, testInfo) => {
    await page.goto('/arbeiten/');
    await page.locator(`.project[href="/arbeiten/${slug}/"]`).click();
    await expect(page).toHaveURL(new RegExp(`/arbeiten/${slug}/$`));
    await page.getByRole('link', { name: 'Entwurf ansehen', exact: true }).click();
    await expect(page.locator('#projektvorschau')).toBeInViewport();
    const image = page.locator('#projektvorschau img');
    await expect(image).toBeVisible();
    expect(
      await image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
    ).toBe(true);
    await expect(page.locator('a[href*=".example"]')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Ähnliche Website anfragen' })).toHaveAttribute(
      'href',
      '/kontakt/?leistung=websites',
    );
    await testInfo.attach(slug, {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
}

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
  await expect(page.locator('.process-story article')).toHaveCount(5);
  await expect(page.locator('.process-story')).toContainText('Von dir');
  await expect(page.locator('.process-story')).toContainText('Von KERNSEITE');
  await expect(page.locator('.cta .btn')).toHaveAttribute('href', '/kontakt/');
});
