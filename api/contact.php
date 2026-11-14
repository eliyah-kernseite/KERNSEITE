<?php

declare(strict_types=1);

/**
 * KERNSEITE – Kontakt-Endpunkt.
 *
 * Schutz (Defense-in-Depth, kein behaupteter Token-CSRF):
 * - POST-only
 * - Same-Origin-/Origin-Referer-Prüfung gegen ALLOWED_ORIGIN
 * - Honeypot-Feld
 * - Mindest-Ausfüllzeit
 * - Rate-Limit pro IP
 * - vollständige serverseitige Validierung
 * - sichere Fehlerausgaben, keine PII in Debug-Logs
 */

define('KERNSEITE_APP', true);
require __DIR__ . '/bootstrap.php';

use Kernseite\Contact\Env;
use Kernseite\Contact\Validator;
use Kernseite\Contact\RateLimiter;
use Kernseite\Contact\Mailer;

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

/**
 * @param array<string,string> $fieldErrors Feldname => Hinweis, nur bei Validierungsfehlern.
 * @return never
 */
function respond(bool $ok, string $message, int $code, bool $json, array $fieldErrors = []): void
{
    http_response_code($code);
    if ($json) {
        header('Content-Type: application/json; charset=utf-8');
        $payload = ['ok' => $ok, 'message' => $message];
        if ($fieldErrors !== []) {
            $payload['errors'] = $fieldErrors;
        }
        echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    } else {
        header('Content-Type: text/html; charset=utf-8');
        $title = $ok ? 'Danke' : 'Hinweis';
        $safe = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
        echo '<!doctype html><html lang="de"><meta charset="utf-8">'
            . '<meta name="viewport" content="width=device-width, initial-scale=1">'
            . '<title>' . $title . ' – KERNSEITE</title>'
            . '<body>'
            . '<h1>' . $title . '</h1><p>' . $safe . '</p>'
            . '<p><a href="/">Zurück zur Startseite</a></p></body></html>';
    }
    exit;
}

// 1. Nur POST
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond(false, 'Methode nicht erlaubt.', 405, $wantsJson);
}

// 2. Same-Origin-/Origin-Referer-Prüfung
// Erlaubt ist die in ALLOWED_ORIGIN eingetragene Adresse. Fehlt der Eintrag, gilt
// die eigene Domain des Servers – so funktioniert das Formular auch ohne .env.
// Die Variante mit bzw. ohne „www.“ wird jeweils mit akzeptiert.
$allowedOrigins = [];
$configuredOrigin = rtrim((string) Env::get('ALLOWED_ORIGIN', ''), '/');
if ($configuredOrigin !== '') {
    $allowedOrigins[] = $configuredOrigin;
} else {
    $ownHost = strtolower(preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')) ?? '');
    if ($ownHost !== '' && preg_match('/^[a-z0-9.-]+$/', $ownHost)) {
        $allowedOrigins[] = 'https://' . $ownHost;
    }
}
foreach ($allowedOrigins as $allowed) {
    $parts = parse_url($allowed);
    if (is_array($parts) && isset($parts['scheme'], $parts['host'])) {
        $host = $parts['host'];
        $twin = str_starts_with($host, 'www.') ? substr($host, 4) : 'www.' . $host;
        $allowedOrigins[] = $parts['scheme'] . '://' . $twin
            . (isset($parts['port']) ? ':' . $parts['port'] : '');
    }
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$requestOrigin = '';
if ($origin !== '') {
    $requestOrigin = rtrim($origin, '/');
} elseif ($referer !== '') {
    $parts = parse_url($referer);
    if (is_array($parts) && isset($parts['scheme'], $parts['host'])) {
        $requestOrigin = $parts['scheme'] . '://' . $parts['host']
            . (isset($parts['port']) ? ':' . $parts['port'] : '');
    }
}
// Weder Origin noch Referer vorhanden -> abweisen.
$originOk = $requestOrigin !== '' && in_array(strtolower($requestOrigin), array_map('strtolower', $allowedOrigins), true);
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 32768) {
    respond(false, 'Die Anfrage ist zu groß.', 413, $wantsJson);
}
if (!$originOk) {
    respond(false, 'Die Anfrage konnte nicht bestätigt werden (Herkunft).', 403, $wantsJson);
}

// 3. Honeypot: Bots, die das versteckte Feld ausfüllen, werden still akzeptiert.
if (trim((string) ($_POST['website2'] ?? '')) !== '') {
    respond(true, 'Danke! Deine Anfrage ist eingegangen.', 200, $wantsJson);
}

// 4. Mindest-Ausfüllzeit (Client-Zeitstempel als schwaches Anti-Spam-Signal)
$renderedAt = (int) ($_POST['rendered_at'] ?? 0);
if ($renderedAt > 0) {
    $elapsedMs = (int) round(microtime(true) * 1000) - $renderedAt;
    if ($elapsedMs >= 0 && $elapsedMs < 3000) {
        respond(false, 'Bitte nimm dir einen kurzen Moment mehr Zeit und sende erneut.', 429, $wantsJson);
    }
}

// 5. Rate-Limit pro IP
$rateLimiter = new RateLimiter(
    sys_get_temp_dir() . '/kernseite_ratelimit',
    (int) Env::get('RATE_LIMIT_PER_HOUR', '5'),
);
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
if (!$rateLimiter->allow($ip)) {
    respond(false, 'Zu viele Anfragen. Bitte versuche es etwas später erneut.', 429, $wantsJson);
}

// 6. Serverseitige Validierung
$result = Validator::validate($_POST);
if (!empty($result['errors'])) {
    respond(false, 'Bitte prüfe die markierten Felder.', 422, $wantsJson, $result['fieldErrors']);
}

// 7. Versand
try {
    (new Mailer())->sendContact($result['fields']);
} catch (\Throwable $e) {
    // Keine PII loggen – nur eine technische Meldung.
    error_log('[kernseite-contact] SMTP-Versand fehlgeschlagen.');
    respond(
        false,
        'Das Senden hat gerade nicht geklappt. Deine Angaben sind noch da: Du kannst sie mit einem Klick per E-Mail schicken.',
        500,
        $wantsJson,
    );
}

respond(true, 'Danke! Deine Anfrage ist eingegangen. Wir melden uns so bald wie möglich.', 200, $wantsJson);
