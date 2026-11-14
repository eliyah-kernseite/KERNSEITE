import { test, expect } from '@playwright/test';

test.describe('Kontaktformular', () => {
  test('leeres Absenden zeigt Validierungsfehler und blockiert', async ({ page }) => {
    await page.goto('/kontakt/');
    await page.locator('[data-submit]').click();

    // Name wird als ungültig markiert und fokussiert
    const name = page.locator('#cf-name');
    await expect(name).toHaveAttribute('aria-invalid', 'true');

    // Statusmeldung erscheint (Live-Region)
    await expect(page.locator('[data-status]')).toContainText('Bitte prüfe');
  });

  test('ungültige E-Mail wird beanstandet', async ({ page }) => {
    await page.goto('/kontakt/');
    await page.locator('#cf-name').fill('Test Person');
    await page.locator('#cf-email').fill('keine-email');
    await page.locator('#cf-message').fill('Dies ist eine ausreichend lange Nachricht.');
    await page.locator('[data-submit]').click();
    await expect(page.locator('#cf-email')).toHaveAttribute('aria-invalid', 'true');
  });

  test('alle Felder sind sichtbar, nichts muss erst aufgeklappt werden', async ({ page }) => {
    await page.goto('/kontakt/');
    await expect(page.locator('.cform details')).toHaveCount(0);
    for (const id of ['#cf-phone', '#cf-company', '#cf-service', '#cf-scope', '#cf-timing'])
      await expect(page.locator(id)).toBeVisible();
  });

  test('fehlende Pflichtfelder stehen als Liste unter dem Button und führen zum Feld', async ({
    page,
  }) => {
    await page.goto('/kontakt/');
    await page.locator('#cf-name').fill('Test Person');
    await page.locator('#cf-phone').fill('0931 000000');
    await page.locator('[data-submit]').click();
    const missing = page.locator('[data-missing] button');
    await expect(missing).toHaveText(['E-Mail', 'Nachricht']);
    await missing.nth(1).click();
    await expect(page.locator('#cf-message')).toBeFocused();
    // Beim Ausfüllen verschwinden Markierung und Listeneintrag sofort.
    await page.locator('#cf-message').fill('Wir möchten eine neue Website.');
    await expect(page.locator('#cf-message')).not.toHaveAttribute('aria-invalid', 'true');
    await expect(missing).toHaveText(['E-Mail']);
  });

  test('Feldfehler vom Server werden am Feld angezeigt', async ({ page }) => {
    await page.route('**/api/contact.php', (route) =>
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: false,
          errors: { email: 'Bitte gib eine gültige E-Mail-Adresse an.' },
        }),
      }),
    );
    await page.goto('/kontakt/');
    await page.locator('#cf-name').fill('Prüfung');
    await page.locator('#cf-email').fill('test@example.org');
    await page.locator('#cf-message').fill('Dies ist eine lokale Formularprüfung.');
    await page.locator('[data-submit]').click();
    await expect(page.locator('#cf-email')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#cf-email-error')).toContainText('gültige E-Mail');
  });

  test('scheitert der Versand, gehen die Angaben per E-Mail raus', async ({ page }) => {
    await page.route('**/api/contact.php', (route) =>
      route.fulfill({ status: 500, contentType: 'application/json', body: '{"ok":false}' }),
    );
    await page.goto('/kontakt/');
    await page.locator('#cf-name').fill('Prüfung');
    await page.locator('#cf-email').fill('test@example.org');
    await page.locator('#cf-message').fill('Bitte um Rückruf wegen einer neuen Website.');
    await page.locator('[data-submit]').click();
    const mail = page.locator('[data-fallback-mail]');
    await expect(mail).toBeVisible();
    const href = decodeURIComponent((await mail.getAttribute('href')) ?? '');
    expect(href).toContain('Bitte um Rückruf wegen einer neuen Website.');
    expect(href).toContain('Name: Prüfung');
  });

  test('Honeypot-Feld liegt außerhalb des sichtbaren Bereichs', async ({ page }) => {
    await page.goto('/kontakt/');
    // Off-screen-Honeypot: nicht im Viewport und für AT als aria-hidden markiert.
    await expect(page.locator('#cf-website2')).not.toBeInViewport();
    await expect(page.locator('.cform__hp')).toHaveAttribute('aria-hidden', 'true');
  });
});

for (const scenario of [
  {
    name: 'HTML mit Status 200',
    contentType: 'text/html',
    body: '<html>Serverfehler</html>',
    ok: false,
  },
  { name: 'leeres JSON', contentType: 'application/json', body: '{}', ok: false },
  { name: 'bestätigter Versand', contentType: 'application/json', body: '{"ok":true}', ok: true },
]) {
  test(`Formular behandelt ${scenario.name} korrekt`, async ({ page }) => {
    await page.route('**/api/contact.php', (route) =>
      route.fulfill({ status: 200, contentType: scenario.contentType, body: scenario.body }),
    );
    await page.goto('/kontakt/');
    await page.locator('#cf-name').fill('Prüfung');
    await page.locator('#cf-email').fill('test@example.org');
    await page
      .locator('#cf-message')
      .fill('Dies ist eine lokale Formularprüfung ohne echten Versand.');
    await page.locator('[data-submit]').click();
    await expect(page.locator('[data-status]')).toHaveAttribute(
      'data-state',
      scenario.ok ? 'ok' : 'error',
    );
    if (!scenario.ok) await expect(page.locator('#cf-message')).not.toHaveValue('');
    await expect(page.locator('[data-submit]')).toBeEnabled();
  });
}
