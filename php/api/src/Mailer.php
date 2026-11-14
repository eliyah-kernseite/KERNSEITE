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
     * @param array<string,string> $fields
     * @throws PHPMailerException|\RuntimeException
     */
    public function sendContact(array $fields): void
    {
        $host = Env::get('SMTP_HOST');
        $user = Env::get('SMTP_USER');
        $pass = Env::get('SMTP_PASS');
        $to = Env::get('CONTACT_TO') ?: self::DEFAULT_TO;
        $from = Env::get('SMTP_FROM', $user) ?: $to;
        $smtpReady = $host && $user && $pass;

        $mail = new PHPMailer(true);
        if ($smtpReady) {
            $mail->isSMTP();
            $mail->Host = $host;
            $mail->SMTPAuth = true;
            $mail->Username = $user;
            $mail->Password = $pass;
            $mail->Port = (int) (Env::get('SMTP_PORT', '587'));
            $secure = Env::get('SMTP_SECURE', 'tls');
            $mail->SMTPSecure = $secure === 'ssl'
                ? PHPMailer::ENCRYPTION_SMTPS
                : PHPMailer::ENCRYPTION_STARTTLS;
            $mail->SMTPDebug = SMTP::DEBUG_OFF;
            $mail->Timeout = 15;
        } else {
            $mail->isMail();
        }
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
        ];
        $mail->Body = implode("\n", $lines);
        $mail->isHTML(false);

        $mail->send();
    }
}
