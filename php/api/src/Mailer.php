<?php

declare(strict_types=1);

namespace Kernseite\Contact;

if (!defined('KERNSEITE_APP')) {
    http_response_code(403);
    exit('Forbidden');
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

/**
 * Versendet die Kontaktanfrage. Bevorzugt per SMTP (PHPMailer) mit Zugangsdaten aus
 * der Serverumgebung (.env oberhalb des Webroots) – niemals aus dem Repository.
 * Fehlt der SMTP-Zugang, geht die Mail über die Mailfunktion des Hostings raus,
 * damit Anfragen auch ohne .env ankommen. Zuverlässiger ist SMTP, weil die Domain
 * laut SPF nur über Google Workspace versenden darf.
 */
final class Mailer
{
    /** Öffentliche Kontaktadresse, falls CONTACT_TO nicht gesetzt ist. */
    private const DEFAULT_TO = 'info@kernseite.com';

    /**
     * Versucht zuerst SMTP. Scheitert das, geht dieselbe Anfrage über die Mailfunktion
     * des Hostings raus, damit sie nicht verloren geht. Die Mail nennt am Ende, auf
     * welchem Weg sie kam und warum SMTP nicht ging – so lässt sich die .env prüfen,
     * ohne Server-Protokolle zu lesen.
     *
     * @param array<string,string> $fields
     * @throws PHPMailerException|\RuntimeException
     */
    public function sendContact(array $fields): void
    {
        $host = Env::get('SMTP_HOST');
        $user = Env::get('SMTP_USER');
        $pass = Env::get('SMTP_PASS');
        if ($pass !== null && $host !== null && preg_match('/(gmail|google)/i', $host)) {
            // Google zeigt App-Passwörter in Vierergruppen mit Leerzeichen an.
            $pass = preg_replace('/\s+/', '', $pass) ?? $pass;
        }

        if ($host && $user && $pass) {
            try {
                $this->send($fields, 'SMTP', function (PHPMailer $mail) use ($host, $user, $pass): void {
                    $mail->isSMTP();
                    $mail->Host = $host;
                    $mail->SMTPAuth = true;
                    $mail->Username = $user;
                    $mail->Password = $pass;
                    $mail->Port = (int) (Env::get('SMTP_PORT', '587'));
                    $mail->SMTPSecure = Env::get('SMTP_SECURE', 'tls') === 'ssl'
                        ? PHPMailer::ENCRYPTION_SMTPS
                        : PHPMailer::ENCRYPTION_STARTTLS;
                    $mail->SMTPDebug = SMTP::DEBUG_OFF;
                    $mail->Timeout = 8;
                });
                return;
            } catch (\Throwable $e) {
                $reason = self::reason($e->getMessage());
                error_log('[kernseite-contact] SMTP fehlgeschlagen (' . $reason . '), Versand über PHP-Mail.');
                $this->send($fields, 'Mailfunktion des Hostings (SMTP fehlgeschlagen: ' . $reason . ')', static function (PHPMailer $mail): void {
                    $mail->isMail();
                });
                return;
            }
        }

        $this->send($fields, 'Mailfunktion des Hostings (kein SMTP-Zugang in der .env)', static function (PHPMailer $mail): void {
            $mail->isMail();
        });
    }

    /** Ordnet PHPMailer-Fehler einer verständlichen Ursache zu, ohne Details preiszugeben. */
    private static function reason(string $message): string
    {
        if (stripos($message, 'authenticate') !== false) {
            return 'Anmeldung abgelehnt, App-Passwort und SMTP_USER prüfen';
        }
        if (stripos($message, 'connect') !== false) {
            return 'keine Verbindung zum Mailserver, SMTP_PORT=465 mit SMTP_SECURE=ssl versuchen';
        }
        if (stripos($message, 'from') !== false || stripos($message, 'sender') !== false) {
            return 'Absender abgelehnt, SMTP_FROM muss das Postfach aus SMTP_USER sein';
        }
        return 'unbekannter Fehler';
    }

    /**
     * @param array<string,string> $fields
     * @param callable(PHPMailer):void $transport
     * @throws PHPMailerException|\RuntimeException
     */
    private function send(array $fields, string $via, callable $transport): void
    {
        $to = Env::get('CONTACT_TO') ?: self::DEFAULT_TO;
        $from = Env::get('SMTP_FROM', Env::get('SMTP_USER')) ?: $to;

        $mail = new PHPMailer(true);
        $transport($mail);
        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->setFrom($from, Env::get('SMTP_FROM_NAME', 'KERNSEITE Website'));
        $mail->addAddress($to);

        // Antworten gehen an die anfragende Person (E-Mail bereits validiert).
        if ($fields['email'] !== '') {
            $mail->addReplyTo($fields['email'], $fields['name'] !== '' ? $fields['name'] : $fields['email']);
        }

        $mail->Subject = 'Neue Anfrage über kernseite.com – ' . $fields['name']
            . ($fields['company'] !== '' ? ' (' . $fields['company'] . ')' : '');

        $lines = [
            'Name:            ' . $fields['name'],
            'Unternehmen:     ' . ($fields['company'] ?: '—'),
            'E-Mail:          ' . $fields['email'],
            'Telefon:         ' . ($fields['phone'] ?: '—'),
            'Leistung:        ' . ($fields['service'] ?: '—'),
            'Bestehende Site: ' . ($fields['existing_site'] ?: '—'),
            'Budget:          ' . ($fields['budget'] ?: '—'),
            'Projektumfang:   ' . ($fields['scope'] ?: '—'),
            'Branche:         ' . ($fields['branch'] ?: '—'),
            'Start:           ' . ($fields['timing'] ?: '—'),
            '',
            'Nachricht:',
            $fields['message'],
            '',
            '--',
            'Versand über: ' . $via,
        ];
        $mail->Body = implode("\n", $lines);
        $mail->isHTML(false);

        $mail->send();
    }
}
